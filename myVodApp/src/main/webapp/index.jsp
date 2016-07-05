<!DOCTYPE html>
<html lang="en">
    <head>
        <title>Prasenjit's VOD </title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js"></script>
        <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
        <script type="text/javascript" src="js/jwplayer/jwplayer.js"></script>
        <script>jwplayer.key="BSXer4/XkqAhwivBBGO4yBcyaLNp9s/lgsGMtg==";</script>  
        <script type="text/javascript" src="js/myvodutility.js"></script>
        <script language="javascript" type="text/javascript">
             jQuery(document).ready(function() {
                // Instantiate the Bootstrap carousel
                buildMovieList();
                
                /* Render the home page */
                showHome();
            }); 
        </script>
        <style>
            .carousel-inner .active.left { left: -33%; }
            .carousel-inner .next        { left:  33%; }
            .carousel-inner .prev        { left: -33%; }
            img {
                width: 100%;
                magin: auto;
            }
            .multi-item-carousel{
              .carousel-inner{
                > .item{
                  transition: 500ms ease-in-out left;
                }
                .active{
                  &.left{
                    left:-33%;
                  }
                  &.right{
                    left:33%;
                  }
                }
                .next{
                  left: 33%;
                }
                .prev{
                  left: -33%;
                }
              }
              .carouse-control{  
                cursor:pointer;
              }
              
              .carouse-control.left{
                  magrin-left:0;
                  background-image: none;
                }
              }     

              .carouse-control.right{
                  magrin-right:0;
                  background-image: none;
                }
              } 
              
              .carousel-caption {
                 position: relative;
                 left: auto;
                 right: auto;
                }              
            }

            // non-related styling:
            body{
              background: #333;
              color: #ddd;
            }
            h1{
              color: Black;
              font-size: 2.25em;
              text-align: left;
              margin-top: 1em;
              margin-bottom: 2em;
              text-shadow: 0px 2px 0px rgba(0, 0, 0, 1);
            }  
            .errStyle {
                color:red;
                display:none;
            }
        </style>
    </head>

    <body>
    <div id="myVOD" style="display: none">Loading the player ...</div>
    <div class="container" id="mainDiv">
      <div class="row" style="background: #808080">
        <table class="col-md-12">              
            <tr>
                <td class="col-lg-6"><a href="javascript:showHome()"><h1>Home</h1></a></td>
                <td class="col-lg-6"><a href="javascript:showHistory()"><h1 style="text-align: right">History</h1></a></td>
            </tr>                   
        </table>
      </div>
      <div id="errorMsgBlock" class="errStyle"></div>
      <div id="historyPanel" style="display:none">
        <p><h2>Movies Recently Watched</h2></p>
        <ol>
        </ol>
      </div>
      <div class="row" id="videoPanel">
        <div class="col-md-12">  
          <div id="myCarousel" class="carousel slide multi-item-carousel" data-ride="carousel" data-interval=false>
          </div>
        </div>
      </div>
    </div>

    </body>
</html>