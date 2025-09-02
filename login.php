<?php

// Conexão com o MySQL
$host = "localhost";
$user = "root";
$pass = "";
$db = "AR";

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error){
    die("Falha na conexão: " . $conn->connect_error);
}

$email = $_POST['email'];
$password = $_POST['password'];

// Consulta usuário
$sql = "SELECT * FROM usuarios WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();
    
    // Verifica senha com hash
    if (password_verify($password, $user['password'])) {
        echo json_encode(["status" => "success", "message" => "Login realizado"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Senha incorreta"]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Usuário não encontrado"]);
}

$conn->close();

?>