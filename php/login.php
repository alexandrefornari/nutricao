<?php
    $user_login = mysql_escape_string($_POST['user_login']);
    $user_pass = mysql_escape_string($_POST['senha']);
    
    $online = true;
    if($online){
        include 'mySql/mySql.php'; //conexao ao banco de dados
        
        $busca_senha = "SELECT * FROM usuario WHERE login = '$user_login' AND senha = '$user_pass'";
        $query_result = queryOnBD($busca_senha);
        closeConection();
    }else{
        $query_result = ($user_login == "teste") && ($user_pass == "teste");
    }
    
    if($query_result != null){
        if($online){
            //Inicia sessão
            session_start();
            $_SESSION['user_auth'] = $query_result['login'];
            $_SESSION['user_id'] = $query_result['id'];
            $_SESSION['grupo'] = $query_result['id_grupo'];
            header("Location: inicial.php");
        }else if($query_result){
            //Inicia sessão
            session_start();
            $_SESSION['user_auth'] = "teste";
            $_SESSION['user_id'] = "1";
            $_SESSION['grupo'] = "1";
            header("Location: inicial.php");
        }else{
            header("Location: ../index.php");
        }
    }else{
        header("Location: ../index.php");
    }
?>