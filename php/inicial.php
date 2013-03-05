<?php
    //Caso não exista o id ou rep na variável global SESSION redireciona para o index.php
    session_start();
    
    if(!isset($_SESSION["user_auth"]) && !isset($SESSION["user_id"])){
        session_destroy();
        header("Location: ../index.php");
    }
?>

<!DOCTYPE html>

<html>
<head>
    <title>Controle nutricional</title>
    
    <link href="./css/style.css" rel="stylesheet" type="text/css">
    <script src="./jquery-ui-1.10.1.custom/js/jquery-1.9.1.js"></script>
    <script src="./js/main.js"></script>
    
    <script src="./jquery-ui-1.10.1.custom/js/jquery-1.9.1.js"></script>
    <script src="./jquery-ui-1.10.1.custom/js/jquery-ui-1.10.1.custom.js"></script>
    <link href="./jquery-ui-1.10.1.custom/css/humanity/jquery-ui-1.10.1.custom.css" rel="stylesheet" type="text/css">
    
    <script src="./RGraph/libraries/RGraph.common.core.js" ></script>
    <script src="./RGraph/libraries/RGraph.common.dynamic.js" ></script>
    <script src="./RGraph/libraries/RGraph.common.tooltips.js" ></script>
    <script src="./RGraph/libraries/RGraph.common.effects.js" ></script>
    <script src="./RGraph/libraries/RGraph.bar.js" ></script>
    <script src="./RGraph/libraries/RGraph.line.js" ></script>
    <script src="./RGraph/libraries/RGraph.pie.js" ></script>
    
</head>

<body>

    <div class="cabecalho">
        <h1>Controle nutricional</h1>
        <div id="user"></div>
        <div id="logout"><a href="logout.php">Sair</a></div>
    </div>
    
    <div class="menu">
        <div id="abas">
            <ul>
                <li><a href="content/inserir.html" id="inserir">Inserir</a></li>
                <li><a href="content/graficos.html" id="graficos">Gráficos</a></li>
                <li><a href="content/gerenciar.html" id="gerenciar">Gerenciar</a></li>
            </ul>
        </div>
    </div>
    
    <!--<div class="conteudo">
        
    </div>-->
    
    <div class="rodape">
        Todos os direitos reservados.
    </div>
</body>
</html>
