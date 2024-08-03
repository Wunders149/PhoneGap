<?php
header('Content-Type: application/json');

// Connexion à la base de données
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "data";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Récupération de l'action demandée
$action = $_POST['action'] ?? '';

switch ($action) {
    case 'create':
        $name = $_POST['name'];
        $email = $_POST['email'];
        $stmt = $conn->prepare("INSERT INTO users (name, email) VALUES (?, ?)");
        $stmt->bind_param("ss", $name, $email);
        $stmt->execute();
        echo json_encode(['status' => 'success', 'id' => $stmt->insert_id]);
        $stmt->close();
        break;

    case 'read':
        $result = $conn->query("SELECT * FROM users");
        $users = $result->fetch_all(MYSQLI_ASSOC);
        echo json_encode($users);
        break;

    case 'update':
        $id = $_POST['id'];
        $name = $_POST['name'];
        $email = $_POST['email'];
        $stmt = $conn->prepare("UPDATE users SET name = ?, email = ? WHERE id = ?");
        $stmt->bind_param("ssi", $name, $email, $id);
        $stmt->execute();
        echo json_encode(['status' => 'success']);
        $stmt->close();
        break;

    case 'delete':
        $id = $_POST['id'];
        $stmt = $conn->prepare("DELETE FROM users WHERE id = ?");
        $stmt->bind_param("i", $id);
        $stmt->execute();
        echo json_encode(['status' => 'success']);
        $stmt->close();
        break;

    default:
        echo json_encode(['status' => 'error', 'message' => 'Invalid action']);
        break;
}

$conn->close();
?>