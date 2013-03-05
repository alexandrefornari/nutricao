<?php
    session_start();
    
    if(!isset($_SESSION["user_auth"]) && !isset($SESSION["user_id"])){
        session_destroy();
        header("Location: ../index.php");
    }
    
    $busca = $_GET['campo'];
    
    $id_user  =     $_SESSION['user_id'];
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
        case "escolas":
            $sql = "SELECT escola.id, escola.nome FROM escola
                    INNER JOIN usuario_escola ON
                       escola.id =  usuario_escola.id_escola
                    INNER JOIN usuario ON
                        usuario_escola.id_user = usuario.id
                                WHERE usuario.id = " .$id_user;
            break;
        case "turma":
            /*$sql = "SELECT DISTINCT aluno.id_turma FROM aluno
                    WHERE aluno.id_escola = " .$id_escola;*/
            $sql = "SELECT DISTINCT turma.id, turma.nome FROM turma
                    INNER JOIN aluno ON aluno.id_turma = turma.id
                            WHERE aluno.id_escola = " .$id_escola;
            break;
        case "alunosAll":
            $sql = "SELECT aluno.id, aluno.nome FROM aluno
                    INNER JOIN usuario_escola
                            ON aluno.id_escola = usuario_escola.id_escola
                    INNER JOIN usuario
                            ON usuario_escola.id_user = usuario.id
                                    WHERE usuario.id = " . $id_user;
            break;
         case "alunos":
            $sql = "SELECT aluno.id, aluno.nome FROM aluno
                    INNER JOIN usuario_escola
                            ON aluno.id_escola = usuario_escola.id_escola
                    INNER JOIN usuario
                            ON usuario_escola.id_user = usuario.id
                                    WHERE usuario.id = " . $id_user . " AND usuario_escola.id_escola = " . $id_escola;
            break;
        case "alunosTurma":
            $sql = "SELECT aluno.id, aluno.nome FROM aluno
                    INNER JOIN usuario_escola
                            ON aluno.id_escola = usuario_escola.id_escola
                    INNER JOIN usuario
                            ON usuario_escola.id_user = usuario.id
                                    WHERE usuario.id = " . $id_user . " AND usuario_escola.id_escola = " . $id_escola;
            break;
        case "dados":
            $sql = "SELECT aluno.nascimento, aluno.sexo FROM aluno
                    WHERE aluno.id = " . $id_aluno;
            break;
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