<?php
session_start();

$mediaJson = json_decode(file_get_contents("php://input"), true);

$media = $mediaJson['media'];

$mediaList = $_SESSION["mediaList"];
if (empty($mediaList)) {
   $mediaList = array($media => $media); 
} else {
    $mediaList[$media] = $media;
}

$_SESSION["mediaList"] = $mediaList;

print_r($mediaList);

?>