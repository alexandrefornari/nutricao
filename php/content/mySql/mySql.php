<?php
    //Arquivo com as senhas
    include 'pass.php';
    
    //Conex�o ao mySql.
    $conexao = mysql_connect($db_adress, $db_user, $db_pass) or die('Erro conectando ao banco de dados');
    
    //Sele��o do banco de dados.
    $base_selected = mysql_select_db($db_name, $conexao) or die('Erro na sele��o da tabela');
    
    //Opera��o no banco de dados.
    function queryOnBD($query){
        global $conexao;
        $busca = mysql_query($query, $conexao) or die('Busca mal sucedida.');
        
        return $busca;
    }
    
    //Remo��o do banco de dados.
    function closeConection(){
        global $conexao;
        mysql_close($conexao);
    }
    
?>