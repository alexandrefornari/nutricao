<?php
    session_start();
    
    if(!isset($_SESSION["user_auth"]) && !isset($_SESSION["user_id"]) && !isset($_SESSION["grupo"])){
        session_destroy();
        header("Location: ../index.php");
    }
    
    $busca = $_GET['campo'];
    
    $id_user  =     $_SESSION['user_id'];
    $id_grupo =     $_SESSION['grupo'];
    
    $id_escola =    $_GET['id_escola'];
    $id_turma =     $_GET['id_turma'];
    $id_aluno =     $_GET['id_aluno'];
    
    $sql  = "";
    
    switch($busca){
        case "historico":
            $data =     $_GET['data'];
            $peso =     $_GET['peso'];
            $altura =   $_GET['altura'];
            $imc =      $_GET['imc'];
            $pcs =      $_GET['pcs'];
            $pct =      $_GET['pct'];
            $soma =     $_GET['soma'];
            
            $sql = "INSERT INTO medida (data, peso, altura, imc, pcs, pct, soma, id_aluno)
                    VALUES (" . $data . ", " . $peso  . ", "  . $altura  . ", " . $imc  . ", " . $pcs  . ", " . $pct  . ", " . $soma . ", " . $id_aluno . ")";
            break;
        case "escola":
            $nomeEscola =   $_GET['nomeEscola'];
            
            if(isset($_GET['endEscola'])){
                $endEscola =   $_GET['endEscola'];
                $sql = "INSERT INTO escola (nome, endereco, id_grupo)
                        VALUES (". $nomeEscola . ", " . $endEscola . ", " . $id_grupo . ")";
            }else{
                $sql = "INSERT INTO escola (nome, id_grupo)
                        VALUES (". $nomeEscola . ", " . $id_grupo . ")";
            }
            break;
        case "aluno":
            $nomeAluno =   $_GET['nomeAluno'];
            $nascimento =   $_GET['nasc'];
            $sexo =   $_GET['sexo'];
            
            if(isset($_GET['inEscola']) && isset($_GET['inTurma'])){
                $inEscoloa = $_GET['inEscola'];
                $inTurma = $_GET['inTurma'];
                $sql = "INSERT INTO aluno (nome, nascimento, sexo, id_escola, id_turma, id_grupo)
                        VALUES (". $nomeAluno . ", " . $nascimento . ", " . $sexo . ", " . $inEscoloa . ", " . $inTurma . ", " . $id_grupo . ")";
            }else if(isset($_GET['inEscola'])){
                $inEscoloa = $_GET['inEscola'];
                $sql = "INSERT INTO aluno (nome, nascimento, sexo, id_escola, id_grupo)
                        VALUES (". $nomeAluno . ", " . $nascimento . ", " . $sexo . ", " . $inEscoloa . ", " . $id_grupo . ")";
            }else if(isset($_GET['inTurma'])){
                $inTurma = $_GET['inTurma'];
                $sql = "INSERT INTO aluno (nome, nascimento, sexo, id_turma, id_grupo)
                        VALUES (". $nomeAluno . ", " . $nascimento . ", " . $sexo . ", " . $inTurma . ", " . $id_grupo . ")";
            }else{
                $sql = "INSERT INTO aluno (nome, nascimento, sexo, id_grupo)
                        VALUES (". $nomeAluno . ", " . $nascimento . ", " . $sexo . ", " . $id_grupo . ")";
            }
            break;
    }
    
    $user = "root";
    $pass = "";
    $host = "localhost";
    $base = "controle";
    $conexao = mysql_connect($host, $user, $pass);
    mysql_select_db($base);
    
    //$result = mysql_query($sql);
    
    if (!mysql_query($sql))
    {
        echo "fail";
    }else{
        echo "ok";
    }
    
    mysql_close($conexao);
    
    /*
    $return = "";
    switch($busca){
        case "escolas":
        case "alunosAll":
        case "turma":
        case "alunos":
        case "alunosTurma":
            $return .= '<option value="-1">Selecione...</option>';
            while($data = mysql_fetch_array($result)){
                $return .= '<option value="' . $data["id"] . '">' .$data["nome"] . '</option>';
            }
            break;
        case "dados":
            while($data = mysql_fetch_array($result)){
                $return .= "" . $data["nascimento"] . '%' . $data["sexo"];
            }
            break;
        case "historico":
            while($data = mysql_fetch_array($result)){
                $return .= '<tr align="center">\n'
                     . '<td width="102px">' . $data["data"] . '</td>'
                     . '<td width="85px">' . $data["peso"] . '</td>'
                     . '<td width="85px">' . $data["altura"] . '</td>'
                     . '<td width="85px">' . $data["imc"] . '</td>'
                     . '<td width="85px">' . $data["pcs"] . '</td>'
                     . '<td width="85px">' . $data["pct"] . '</td>'
                     . '<td width="85px">' . $data["soma"] . '</td>\n'
                 . '</tr>)';
            }
            break;
        
        
    }
    */
    
    //echo $result;
?>