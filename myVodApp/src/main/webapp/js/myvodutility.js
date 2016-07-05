function showHistory() 
{   
    /* Populate the history contents */
    loadVideoHistory();
    
    $("#myVOD").hide();
    $("#mainDiv").show();
    $("#historyPanel").show();
    $("#errorMsgBlock").hide();
    $("#videoPanel").hide();
}

function showHome() 
{
    $("#myVOD").hide();
    $("#mainDiv").show();
    $("#historyPanel").hide();
    $("#errorMsgBlock").hide();
    $("#videoPanel").show();
} 

function saveVideoHistory(movie) 
{   
    $.ajax({
        type:'post',
        url:'server/save_to_history.php',
        data:JSON.stringify({"media": movie}),
        error: function(xhr, desc, err) {
            displayErr("Details: " + desc + "\nError:" + err);
        }       
    });
}

function loadVideoHistory() 
{
    $.ajax({
        type:'get',
        url:'server/get_from_history.php',
        dataType: 'json',
        success: function(data) {
            var historyListDOM = $("#historyPanel").children("ol");
            var count = 0;
            
            historyListDOM.empty();
           
            count = data.totalCount;
            for (var i = 0; i < count; i++) {
                historyListDOM.prepend("<li>" + data.videos[i] + "</li>");
            }
        },
        error: function(xhr, desc, err) {
            displayErr("Details: " + desc + "\nError:" + err);
        }       
    });
}

function playVideoHandler(event) 
{
    /* Hide the home page contents */
    $("#mainDiv").hide(); 
    
    var myJWplayer = jwplayer("myVOD").setup({ 
        file: event.data.media, 
        width: 960,
        height: 540,                        
        });
    
    /* Reigster the handler to show home page at the end of playback */    
    myJWplayer.onComplete(showHome);
    
    /* Play the file immediately */
    myJWplayer.play();
    
    /* Save the title name of the video to history */
    saveVideoHistory(event.data.mediaName); 
 
    /* Show the video panel */
    $("#myVOD").show();            
}

function displayErr(errMsg) 
{
    $('#errorMsgBlock').html('ERROR: ' + errMsg);
    showHome();
    $("#errorMsgBlock").show();
}

function buildMovieCarousel(jsonObj) 
{
    var MovieListObj = jsonObj;
    var html = '';
        
    var count = MovieListObj.totalCount;
    
    $(".multi-item-carousel").empty();
    
    html += '<div class="carousel-inner" role="listbox">';

    for (var i = 0; i < count; i++) {
        html += '<div class="item';
        
        if (i == 0) {
            html += ' active">';
        } else {
            html += '">';
        }
        html += '<div class="col-xs-3">';
        html += '<input type="hidden" value="' +  MovieListObj.entries[i].contents[0].url + '"></input>';
        html += '<a href ="#" class="img-responsive"><img src="' + MovieListObj.entries[i].images[0].url + '" alt="' + MovieListObj.entries[i].title + '"></a>';
        html += '<div class="carousel-caption">';
        html += '<p>' + MovieListObj.entries[i].title + '</p>';
        html += '</div>';
        html += '</div>'; 
        html += '</div>';        
    }
    
     html += '</div>'; 

    //Left and right controls
    html += '<a class="left carousel-control" href="#myCarousel" role="button" data-slide="prev">';
    html += '<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>';
    html += '</a>';
    html += '<a class="right carousel-control" href="#myCarousel" role="button" data-slide="next">';
    html += '<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>';
    html += '</a>';    
    
    $(".multi-item-carousel").append(html);
    
    $('.multi-item-carousel').carousel({
      interval: false
    });

    // for every slide in carousel, copy the next slide's item in the slide.
    // Do the same for the next, next item.   
    $('.multi-item-carousel .item').each(function(){                               
      var next = $(this).next();
      if (!next.length) {
        next = $(this).siblings(':first');
      }
      next.children(':first-child').clone().appendTo($(this));
 
      if (next.next().length > 0) {
        next.next().children(':first-child').clone().appendTo($(this));
      } else {
        $(this).siblings(':first').children(':first-child').clone().appendTo($(this));
      }
    }); 

    /* Registers the listeners for each video playback */
    $('.multi-item-carousel .item').each(function() {
        $(this).children().each(function() {
            var mediaDomObj = $(this).children(':first-child'); 
            var playbackFile = mediaDomObj.attr('value');

            var movieName = $(this).children('.carousel-caption').children().text();

            /* Add the mouse click listner */
            $(this).click({media: playbackFile, mediaName: movieName}, playVideoHandler);

            /* Add the keypress listner */
            $(this).keypress({media: playbackFile, mediaName: movieName}, playVideoHandler);               
        });
    });
    
    /* To allow carousel navigation using keyboard */
    $(document).bind('keyup', function(e) {
        if (e.which == 39) { //right arrow
            $('.multi-item-carousel').carousel('next');
        } else if (e.which == 37) { //left arrow
            $('.multi-item-carousel').carousel('prev');
        } else if (e.which == 13) { // enter
            /* Play the selected video when enter key is pressed */
            var active =  $('.carousel-inner').children('.item.active');
            if (active) {
                var domObj = active.children(':first-child');
                if (domObj) {
                    domObj.trigger('click');
                }
            }
        }
    });
}

function buildMovieList() 
{
    $.ajax({
        type:'get',
        url:'https://demo2697834.mockable.io/movies',
        dataType: 'json',
        success: function(data) {
           buildMovieCarousel(data);
        },
        error: function(xhr, desc, err) {
            displayErr("Could not retrieve movie list!!");
        }       
    });       
}