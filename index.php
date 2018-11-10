<?php 

$mysqli = new mysqli("127.0.0.1", "root", "root", "phpdev");
if ($mysqli->connect_errno) {
    echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
}
echo $mysqli->host_info . "<br>";

$res = $mysqli->query("SELECT ID FROM test");
while ($row = $res->fetch_assoc()) {
    echo " ID = " . $row['ID'] . "<br>";
}

?>