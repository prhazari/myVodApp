<?php
session_start();

$mediaList = $_SESSION["mediaList"];
$arr = array();

foreach ($mediaList as $key => $value) {
    array_push($arr, $value);
}
$response = array(
    'totalCount' => sizeof($arr),
    'videos' => $arr);

header('Content-Type: application/json');
echo json_encode($response);

?>