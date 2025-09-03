<?php
header('Content-Type: application/json; charset=utf-8');

// leitura flexível dos dados (JSON raw ou $_POST)
$raw = file_get_contents('php://input');
$data = null;
if ($raw) {
    $data = json_decode($raw, true);
}
if (!is_array($data)) {
    $data = $_POST;
}

$host = 'localhost';
$user = 'root';
$pass = '';
$db   = 'AR';

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(['status'=>'error','message'=>'Erro na conexão com o banco: '.$conn->connect_error]);
    exit;
}

$action = isset($data['action']) ? trim($data['action']) : '';

if ($action === 'login') {
    $email = $data['email'] ?? '';
    $password = $data['password'] ?? '';

    if (!$email || !$password) {
        echo json_encode(['status'=>'error','message'=>'Email e senha são obrigatórios']);
        exit;
    }

    $sql = "SELECT id, password, fullname FROM usuarios WHERE email = ?";
    $stmt = $conn->prepare($sql);
    if (!$stmt) {
        echo json_encode(['status'=>'error','message'=>'Erro no prepare: '.$conn->error]);
        exit;
    }
    $stmt->bind_param('s', $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($row = $result->fetch_assoc()) {
        if (password_verify($password, $row['password'])) {
            echo json_encode(['status'=>'success','message'=>'Login realizado','user'=>['id'=>$row['id'],'fullname'=>$row['fullname']]]);
        } else {
            echo json_encode(['status'=>'error','message'=>'Senha incorreta']);
        }
    } else {
        echo json_encode(['status'=>'error','message'=>'Usuário não encontrado']);
    }
    $stmt->close();
    $conn->close();
    exit;
}

if ($action === 'register') {
    $email = $data['email'] ?? '';
    $password = $data['password'] ?? '';
    $fullname = $data['fullname'] ?? '';

    if (!$email || !$password || !$fullname) {
        echo json_encode(['status'=>'error','message'=>'Nome, email e senha são obrigatórios']);
        exit;
    }

    // verifica existência do email
    $check = $conn->prepare("SELECT id FROM usuarios WHERE email = ?");
    if (!$check) {
        echo json_encode(['status'=>'error','message'=>'Erro no prepare: '.$conn->error]);
        exit;
    }
    $check->bind_param('s', $email);
    $check->execute();
    $resCheck = $check->get_result();
    if ($resCheck->fetch_assoc()) {
        echo json_encode(['status'=>'error','message'=>'Email já cadastrado']);
        $check->close();
        $conn->close();
        exit;
    }
    $check->close();

    $hash = password_hash($password, PASSWORD_DEFAULT);
    $sql = "INSERT INTO usuarios (email, password, fullname) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($sql);
    if (!$stmt) {
        echo json_encode(['status'=>'error','message'=>'Erro no prepare: '.$conn->error]);
        exit;
    }
    $stmt->bind_param('sss', $email, $hash, $fullname);

    if ($stmt->execute()) {
        echo json_encode(['status'=>'success','message'=>'Usuário registrado com sucesso']);
    } else {
        echo json_encode(['status'=>'error','message'=>'Erro ao registrar usuário: '.$stmt->error]);
    }
    $stmt->close();
    $conn->close();
    exit;
}

echo json_encode(['status'=>'error','message'=>'Ação inválida: '.$action]);
exit;
?>
