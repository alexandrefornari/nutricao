<?php
    //Arquivo com as senhas
    include 'pass.php';
    
    //Conexуo ao mySql.
    $conexao = mysql_connect($db_adress, $db_user, $db_pass) or die('Erro conectando ao banco de dados');
    
    //Seleчуo do banco de dados.
    $base_selected = mysql_select_db($db_name, $conexao) or die('Erro na seleчуo da tabela');
    
    //Operaчуo no banco de dados.
    function queryOnBD($query){
        global $conexao;
        $busca = mysql_query($query, $conexao) or die('Busca mal sucedida.');
        
        return $busca;
    }
    
    //Remoчуo do banco de dados.
    function closeConection(){
        global $conexao;
        mysql_close($conexao);
    }
    
?>