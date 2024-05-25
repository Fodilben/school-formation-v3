<?php
require('database.php');

$requestMethod = $_SERVER['REQUEST_METHOD'];

function validateAndInsertComment($conn, $email, $comment) {
    if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $query = $conn->prepare("INSERT INTO comments (email, comment) VALUES (?, ?)");
        $query->bind_param("ss", $email, $comment);
        if ($query->execute()) {
            respondWithJson(["status" => "success", "message" => "Comment added successfully!"]);
        } else {
            respondWithJson(["status" => "error", "message" => "Error adding comment: " . $query->error]);
        }
        $query->close();
    } else {
        respondWithJson(["status" => "error", "message" => "Invalid email format!"]);
    }
}

function fetchComments($conn) {
    $response = [];
    $commentsQuery = $conn->query("SELECT * FROM comments");
    if ($commentsQuery->num_rows > 0) {
        while ($comment = $commentsQuery->fetch_assoc()) {
            $response[] = $comment;
        }
        respondWithJson(["status" => "success", "comments" => $response]);
    } else {
        respondWithJson(["status" => "success", "comments" => "No comments found!"]);
    }
}

function respondWithJson($data) {
    header('Content-Type: application/json');
    echo json_encode($data);
}

if ($requestMethod === 'POST') {
    $emailInput = $_POST['email'];
    $commentInput = $_POST['comment'];
    validateAndInsertComment($conn, $emailInput, $commentInput);
} elseif ($requestMethod === 'GET') {
    fetchComments($conn);
}

$conn->close();
?>
