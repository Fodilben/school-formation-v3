<?php
include('database.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'];
    $comment = $_POST['comment'];
    
    if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $stmt = $conn->prepare("INSERT INTO comments (email, comment) VALUES (?, ?)");
        $stmt->bind_param("ss", $email, $comment);
        if ($stmt->execute()) {
            echo json_encode(["status" => "success", "message" => "Comment added successfully!"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Error adding comment: " . $stmt->error]);
        }
        $stmt->close();
    } else {
        echo json_encode(["status" => "error", "message" => "Invalid email format!"]);
    }
} else if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $result = $conn->query("SELECT * FROM comments");
    $comments = [];
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $comments[] = $row;
        }
        echo json_encode(["status" => "success", "comments" => $comments]);
    } else {
        echo json_encode(["status" => "success", "comments" => "No comments found!"]);
    }
}

$conn->close();
?>
