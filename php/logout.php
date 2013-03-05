<?php
    session_start();
    
    if(isset($_SESSION["user_auth"])){
        session_destroy();
    }
    
    header("Location: ../index.php");
?>