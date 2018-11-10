<?php 

$ID = $_GET['id'];
$name = $_GET['name'];
$email = $_GET['email'];
$phone = $_GET['phone'];

$mysqli = new mysqli("127.0.0.1", "root", "root", "phpdev");
if ($mysqli->connect_errno) {
    echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
}
// echo $mysqli->host_info . "<br>";

$sql = "UPDATE Contacts SET name='" . $name . "', email='" . $email . "', phone='" . $phone . "' WHERE ID = " . $ID;

if ($mysqli->query($sql) === TRUE) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "error" => $conn->error]);
}

?>