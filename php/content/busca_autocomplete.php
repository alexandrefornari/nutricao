<?php
    include './content/mySql/mySql.php';
    
    $user_id = 1;//$_SESSION["user_id"];
    $escola = $_GET['escola'];
    $turma = $_GET['turma'];
    $aluno = $_GET['aluno'];
    $temHistorico = false;
    
    /*
    if(empty($escola)){
        //Retorna todas as escolas
        $sql = "SELECT escola.nome FROM escola INNER JOIN usuario_escola ON usuario_escola.id_user = ".$user_id;
    }else if(empty($turma)){
        //Retorna as turmas da escola selecionada
        $sql = "SELECT * FROM turmas WHERE escola = " . $escola;
    }else if(empty($aluno)){
        //Retorna os alunos da turma e da escola selecionados.
        $sql = "SELECT * FROM alunos WHERE escola = " . $escola . " AND turma = " . $turma;
    }else{
        //Retorna o historico e os dados do aluno.
        $sql = "SELECT * FROM historico WHERE escola = " . $escola . " AND turma = " . $turma . " AND aluno = " . $aluno;
        $temHistorico = true;
    }
    */
    
    //Seleciona escolas do usuario
    $sql = "SELECT escola.nome, escola.id FROM escola
                INNER JOIN usuario_escola ON
                   escola.id =  usuario_escola.id_escola
                INNER JOIN usuario ON
                    usuario_escola.id_user = usuario.id
                            WHERE usuario.id = " .$user_id;
    $result = queryOnBD($sql);
    
    //Seleciona turmas da escola do usuario
    $sql = "SELECT turma.id, turma.nome FROM turma
	INNER JOIN escola_turma 
	  ON turma.id = escola_turma.id_turma	
	INNER JOIN escola 
	  ON escola.id = escola_turma.id_escola
	INNER JOIN usuario_escola 
	  ON escola.id =  usuario_escola.id_escola
	INNER JOIN usuario 
	  ON usuario_escola.id_user = usuario.id
		WHERE usuario.id = " . $user_id . " AND escola.id = " . $escola_id;
    
    //Seleciona alunos da turma da escola do usuario
    $sql = "SELECT aluno.id, aluno.nome FROM aluno
	INNER JOIN turma_aluno
	  ON aluno.id = turma_aluno.id_aluno
	INNER JOIN turma
	  ON turma_aluno.id_turma = turma.id
	INNER JOIN escola_turma 
	  ON turma.id = escola_turma.id_turma	
	INNER JOIN escola 
	  ON escola.id = escola_turma.id_escola
	INNER JOIN usuario_escola 
	  ON escola.id =  usuario_escola.id_escola
	INNER JOIN usuario 
	  ON usuario_escola.id_user = usuario.id
		WHERE usuario.id = " . $user_id . " AND escola.id = " . $escola_id . " AND turma.id = " . $turma_id;
    
    
    closeConection();
    
    $return = "";
    if($temHistorico){
        if(!empty($result)){
            while($data = mysql_fetch_array($result)){
                $return .= '<tr align="center">\n';
                $return .= '<td width="102px">' . $data['data'] . '</td>';
                $return .= '<td width="85px">' . $data['peso'] . '</td>'
                $return .= '<td width="85px">' . $data['altura'] . '</td>'
                $return .= '<td width="85px">' . $data['IMC'] . '</td>'
                $return .= '<td width="85px">' . $data['PCS'] . '</td>'
                $return .= '<td width="85px">' . $data['PCT'] . '</td>'
                $return .= '<td width="85px">' . $data['soma'] . '</td>'
                $return .= '\n</tr>)';
            }
        }
        else{
            $return .= "Sem dados";
        }
    }else{
        if(!empty($result)){
            while($data = mysql_fetch_array($result)){
                $return. = '<option value="' . $data["id"] . '">' .$data["nome"] . '</option>'
                //$return .= $data['nome'] . ", ";
            }
        }
        else{
            $return .= "Sem dados";
        }
    }
    
    echo $return;
?>