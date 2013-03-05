<?php
    session_start();
    
    if(isset($_SESSION["user_auth"]) && !isset($SESSION["user_id"])){
        header("Location: php/inicial.php");
    }else{
        session_destroy();
    }
?>

<!DOCTYPE html>

<html>
<head>
    <title>Login</title>
	<link href="style.css" rel="stylesheet" type="text/css">
</head>

<body>

<p align="center">Login:</p>

<div class="formulario">
    <form method="post" action="./php/login.php">
        <div id="left">
        	Usuário:
            <br/>
      		Senha:
        </div>
      	<div id="right">
            <input type="text" id="user_login" name="user_login"/>
            <br/>
            <input type="password" id="senha" name="senha"/>
   	  </div>
        <br/>
        <p align="center">&nbsp;        </p>
        <p align="center">
          <input type="submit" value="Entrar">
        </p>
    </form>
</div>
</body>
</html>
