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
    
    $data =     $_GET['data'];
    $peso =     $_GET['peso'];
    $altura =   $_GET['altura'];
    $imc =      $_GET['imc'];
    $pcs =      $_GET['pcs'];
    $pct =      $_GET['pct'];
    $soma =     $_GET['soma'];
    
    $sql  = "";
    
    switch($busca){
        case "historico":
            $sql = "INSERT INTO medida (data, peso, altura, imc, pcs, pct, soma, id_aluno)
                    VALUES (" . $data . ", " . $peso  . ", "  . $altura  . ", " . $imc  . ", " . $pcs  . ", " . $pct  . ", " . $soma . ", " . $id_aluno . ")";
            break;
        
    }
    
    $user = "root";
    $pass = "";
    $host = "localhost";
    $base = "controle";
    $conexao = mysql_connect($host, $user, $pass);
    mysql_select_db($base);
    
    $result = mysql_query($sql);
    
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