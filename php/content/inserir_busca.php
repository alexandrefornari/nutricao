<?php
    session_start();
    
    if(!isset($_SESSION["user_auth"]) && !isset($_SESSION["user_id"]) && !isset($_SESSION["grupo"])){
        session_destroy();
        header("Location: ../index.php");
    }
    
    $user_id  = $_SESSION['user_id'];
    $group_id  = $_SESSION['grupo'];
    $busca = $_GET['campo'];
    $aux = $_GET['aux'];
    
    $id_escola = $_GET['id_escola'];
    $id_turma = $_GET['id_turma'];
    $id_aluno = $_GET['id_aluno'];
    $sql  = "";
    
    switch($busca){
        case "escola":
            switch($aux){
                case "none":
                    $sql = "SELECT escola.id, escola.nome FROM escola
                            WHERE escola.id_grupo = " .$group_id;
                    break;
                case "turma":
                    $sql = "SELECT DISTINCT escola.id, escola.nome FROM escola
                            INNER JOIN aluno ON aluno.id_escola = escola.id
                            WHERE aluno.id_turma = " . $id_turma . " AND aluno.id_grupo = " .$group_id;
                    break;
                case "aluno":
                    $sql = "SELECT escola.id, escola.nome FROM escola
                            INNER JOIN aluno ON aluno.id_escola = escola.id
                            WHERE aluno.id = " .$id_aluno . " AND aluno.id_grupo = " .$group_id;
                    break;
            }
            break;
        case "turma":
            switch($aux){
                case "none":
                    $sql = "SELECT DISTINCT turma.id, turma.nome FROM turma
                            INNER JOIN aluno ON aluno.id_turma = turma.id
                            WHERE aluno.id_grupo = " .$group_id;
                    break;
                case "escola":
                    $sql = "SELECT DISTINCT turma.id, turma.nome FROM turma
                            INNER JOIN aluno ON aluno.id_turma = turma.id
                            WHERE aluno.id_escola = " . $id_escola . " AND aluno.id_grupo = " .$group_id;
                    break;
                case "aluno":
                    $sql = "SELECT turma.id, turma.nome FROM turma
                            INNER JOIN aluno ON aluno.id_turma = turma.id
                            WHERE aluno.id = " .$id_aluno . " AND aluno.id_grupo = " .$group_id;
                    break;
                case "all":
                    $sql = "SELECT turma.id, turma.nome FROM turma";
                    break;
            }
            break;
        case "aluno":
            switch($aux){
                case "none":
                    $sql = "SELECT aluno.id, aluno.nome FROM aluno
                            WHERE aluno.id_grupo = " .$group_id;
                    break;
                case "escola":
                    $sql = "SELECT aluno.id, aluno.nome FROM aluno
                            WHERE aluno.id_escola = " . $id_escola . " AND aluno.id_grupo = " .$group_id;
                    break;
                case "turma":
                    $sql = "SELECT aluno.id, aluno.nome FROM aluno
                            WHERE aluno.id_turma = " . $id_turma . " AND aluno.id_grupo = " .$group_id;
                    break;
                case "escolaTurma":
                    $sql = "SELECT aluno.id, aluno.nome FROM aluno
                            WHERE aluno.id_turma = " . $id_turma . " AND aluno.id_escola = " . $id_escola . " AND aluno.id_grupo = " .$group_id;
                    break;
            }
            
            break;
        case "dados":
            $sql = "SELECT aluno.nascimento, aluno.sexo, aluno.id_escola, aluno.id_turma FROM aluno
                    WHERE aluno.id = " . $id_aluno;
            break;
        case "historico":
            $sql = "SELECT * FROM medida
                        WHERE medida.id_aluno = " . $id_aluno . " ORDER BY medida.data DESC";
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
    
    $return = "";
    switch($busca){
        case "escola":
        case "aluno":
        case "turma":
            $return .= '<option value="-1">Selecione...</option>';
            while($data = mysql_fetch_array($result)){
                $return .= '<option value="' . $data["id"] . '">' .$data["nome"] . '</option>';
            }
            break;
        case "dados":
            while($data = mysql_fetch_array($result)){
                $return .= "" . $data["nascimento"] . '%' . $data["sexo"] . '%' . $data["id_escola"] . '%' . $data["id_turma"];
            }
            break;
        case "historico":
            while($data = mysql_fetch_array($result)){
                $strData = (string)$data["data"];
                $array = explode("-", $strData);
                $dataBR = $array[2] . "/" . $array[1] . "/" . $array[0];
                
                $return .= '<tr align="center">\n'
                     . '<td width="102px">' . $dataBR . '</td>'
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
    
    echo $return;
?>