<?php
header('Content-Type: application/json');

$host = 'localhost';
$user = 'root';
$db = 'AR';
$pass = '';

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error){
    die("Falha na conexão: " . $conn->connect_error);
} else{
    $sql = "SELECT * FROM produtos";
    $result = $conn->query($sql);
    $produtos = [];
    if ($result->num_rows > 0){
        while($row = $result->fetch_assoc()){
            $produtos[] = $row;
        }
    }
}

echo json_encode($produtos);

?>