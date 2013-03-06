$(document).ready(init);

Date.prototype.fullDate = function() {
  var yyyy = this.getFullYear().toString();
  var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
  var dd  = this.getDate().toString();
  return yyyy + "-" + (dd[1]?dd:"0"+dd[0]) + "-" + (mm[1]?mm:"0"+mm[0]);
};

function init(){
    //$( "#radio" ).buttonset();
    $( "#nascimento" ).datepicker({ dateFormat: 'dd/mm/yy' });
    $( "#data_medida" ).datepicker({ dateFormat: 'dd/mm/yy' });
    var dataAtualC = new Date();
    var yyyy = dataAtualC.getFullYear().toString();
    var mm = (dataAtualC.getMonth()+1).toString(); // getMonth() is zero-based
    var dd  = dataAtualC.getDate().toString();
    var dAtual = (dd[1]?dd:"0"+dd[0]) + "/" + (mm[1]?mm:"0"+mm[0]) + "/" + yyyy;
    $( "#data_medida" ).val(dAtual);
    
    busca("escolas", retorno_escola);
    busca("alunosAll", retorno_aluno);
    
    $("#escola").change(seleciona_turmas);
    $("#nome").change(seleciona_dados);
    
    /*var escolas = [];
    $( "#escola" ).autocomplete({
        source: escolas,
        select: changeEscola
    });*/
    
    $("#peso").change(function(){
        if(verificaNumero("#peso")){
            calculaIMC();
        }else{
            $("#peso").val("");
        }
    });
    $("#altura").change(function(){
        if(verificaNumero("#altura")){
            calculaIMC();
        }else{
            $("#altura").val("");
        }
    });
    
    $("#pcs").change(function(){
        if(verificaNumero("#peso")){
            calculaSoma();
        }else{
            $("#pcs").val("");
        }
    });
    $("#pct").change(function(){
        if(verificaNumero("#altura")){
            calculaSoma();
        }else{
            $("#pct").val("");
        }
    });
    
    $("button").button().click(insereTabela);
}

function formataDataBRtoEN(dataBr){
    var data = dataBr.split("/");
    var ret = data[2] + "-" + data[1] + "-" + data[0];
    return ret;
}

function formataDataENtoBR(dataEn){
    var data = dataEn.split("-");
    var ret = data[2] + "/" + data[1] + "/" + data[0];
    return ret;
}

function insereTabela(event){
  event.preventDefault();
  
  var erro = "";
  
  var data = formataDataBRtoEN($( "#data_medida" ).val());
  alert(data);
  
  var peso = $("#peso").val();
  if(peso == "") erro += "Você precisa digitar o peso.\n";
  var altura = $("#altura").val();
  if(altura == "") erro += "Você precisa digitar a altura.\n";
  var imc = $("#imc").val();
  var pcs = $("#pcs").val();
  if(pcs == "") erro += "Você precisa digitar o PCS.\n";
  var pct = $("#pct").val();
  if(pct == "") erro += "Você precisa digitar o PCT.\n";
  var soma = $("#soma").val();
  
  var id_escola = $("#escola :selected").val();
  if(id_escola <= 0) {
    erro += "Você precisa selecionar uma escola.\n";
  }else{
    var id_turma = $("#turma :selected").val();
    if(id_turma <= 0) {
      erro += "Você precisa selecionar uma turma.\n";
    }else{
      var id_aluno = $("#nome :selected").val();
      if(id_aluno <= 0) erro += "Você precisa selecionar um aluno.\n";
    }
  }
  
  if(erro == ""){
      //Enviar requisicao php
      var query = "historico";
      query += "&data='" + data + "'&peso=" + peso + "&altura=" + altura + "&imc=" + imc;
      query += "&pcs=" + pcs + "&pct=" + pct + "&soma=" + soma;
      
      query += "&id_aluno=" + id_aluno + "&id_escola=" + id_escola + "&id_turma=" + id_turma;
      
      insere(query, retorno_insere_historico);
      
      //Insere no html (condicao se insercao ok)
      //$("#tabela").prepend('<tr align="center">\n<td width="102px">'+data+'</td> <td width="85px">'+peso+'</td> <td width="85px">'+altura+'</td> <td width="85px">'+imc+'</td> <td width="85px">'+pcs+'</td> <td width="85px">'+pct+'</td> <td width="85px">'+soma+'</td>\n</tr>)');
      //limpaValoresMedidas();
  }else{
      alert(erro);
  }
}

function retorno_insere_historico(){
  //alert("resposta: " + this.responseText);
  limpaValoresMedidas();
  seleciona_dados();
}

function verificaNumero(tag){
    var num = Number($(tag).val().replace(",", "."));
    return !isNaN(num);
}

function calculaIMC(){
    var peso = Number($("#peso").val().replace(",", "."));
    var altura = Number($("#altura").val().replace(",", "."));
    if(peso == 0) peso = NaN;
    if(altura == 0) altura = NaN;
    
    if(!isNaN(peso) && !isNaN(altura)){
        var imc = peso / (altura * altura);
        $("#imc").val(imc.toFixed(2));
    }
}

function calculaSoma(){
    var pcs = Number($("#pcs").val().replace(",", "."));
    var pct = Number($("#pct").val().replace(",", "."));
    
    var soma = pcs + pct;
    $("#soma").val(soma);
}

function changeEscola(event, ui){
    //alert(event.target.id);
    var value = ui.item.value;
    
    //Buscar BD Turmas
}

function validate(evt) {
  var theEvent = evt || window.event;
  var key = theEvent.keyCode || theEvent.which;
  key = String.fromCharCode( key );
  var regex = /[0-9]|\./;
  if( !regex.test(key) ) {
    theEvent.returnValue = false;
    if(theEvent.preventDefault) theEvent.preventDefault();
  }
}

function limpaValoresMedidas(){
    $("#peso").val("");
    $("#altura").val("");
    $("#imc").val("");
    $("#pcs").val("");
    $("#pct").val("");
    $("#soma").val("");
}

function generateXMLHttp() {
    if (typeof XMLHttpRequest != "undefined"){
        return new XMLHttpRequest();
    }
    else{	
        if (window.ActiveXObject){
            var versions = ["MSXML2.XMLHttp.5.0", 
                            "MSXML2.XMLHttp.4.0", 
                            "MSXML2.XMLHttp.3.0",
                            "MSXML2.XMLHttp", 
                            "Microsoft.XMLHttp"];
        }
    }
    for (var i=0; i < versions.length; i++){
            try{
                    return new ActiveXObject(versions[i]);
            }catch(e){}
    }
    alert('Seu navegador não pode trabalhar com Ajax!');
}

function seleciona_turmas(){
    var id_escola = $("#escola :selected").val();
    
    busca("turma&id_escola=" + id_escola, retorno_turma);
    busca("alunos&id_escola=" + id_escola, retorno_aluno);
    
    $("#turma").change(seleciona_alunos);
}

function seleciona_alunos(){
    var id_escola = $("#escola :selected").val();
    var id_turma = $("#turma :selected").val();
    
    busca("alunosTurma&id_escola=" + id_escola + "&id_turma=" + id_turma, retorno_aluno);
    
    //$("#nome").change(seleciona_dados);
}

function seleciona_dados(){
    var id_escola = $("#escola :selected").val();
    var id_turma = $("#turma :selected").val();
    var id_aluno = $("#nome :selected").val();
    
    busca("dados&id_aluno=" + id_aluno + "&id_escola=" + id_escola + "&id_turma=" + id_turma, retorno_dados);
    busca("historico&id_aluno=" + id_aluno + "&id_escola=" + id_escola + "&id_turma=" + id_turma, retorno_historico);
    //busca("dados&id_aluno=" + id_aluno, retorno_dados);
    //busca("historico&id_aluno=" + id_aluno, retorno_historico);
}

function retorno_historico(){
    if (this.readyState == 4){
        if (this.status == 200){
            $("#tabela").html(this.responseText);
        } else {
            //Erro
            result.innerHTML = "Um erro ocorreu: " + this.statusText;
        }
    }
}

function retorno_dados(){
    if (this.readyState == 4){
        if (this.status == 200){
            var resposta = this.responseText;
            if(resposta != ""){
                var r = resposta.split("%");
                
                $("#nascimento").val(formataDataENtoBR(r[0]));
                $("#nascimento").prop('disabled', 'disabled');
                //var sexo = document.getElementById(r[1]);
                var tag = '#' + r[1];
                $(tag).prop('checked', true);//.button("refresh");
                $('#masculino').attr('disabled', 'disabled');
                $('#feminino').attr('disabled', 'disabled');
                //sexo.focus();
                //sexo.select();
                var esc = Number(resposta[2]);
                var esc_sel = $("#escola :selected").val();
                if(esc_sel != esc){
                    //Seleciona a escola do aluno
                    //$("#escola option[value=" + esc +"]").attr("selected","selected") ;
                    //$("#escola").val(esc);
                }
                
                var turm = String(resposta[3]);
                if($("#turma :selected").val() != turm){
                    //Seleciona a turma do aluno
                    $("#turma").val(turm);
                }
                
            }else{
                $("#nascimento").val("");
                $("#nascimento").removeAttr("disabled");
                $('#masculino').removeAttr("disabled");
                $('#feminino').removeAttr("disabled");
            }
        } else {
            //Erro
            result.innerHTML = "Um erro ocorreu: " + this.statusText;
        }
    }
}

function insere(query, funcao){
  var XMLHttp = generateXMLHttp();
    XMLHttp.open("get", "./content/inserir_insere.php?campo=" + query, true);
    XMLHttp.onreadystatechange = funcao;
    XMLHttp.send(null);
}

function busca(query, funcao) {
    var XMLHttp = generateXMLHttp();
    XMLHttp.open("get", "./content/inserir_busca.php?campo=" + query, true);
    XMLHttp.onreadystatechange = funcao;
    XMLHttp.send(null);
}

function retorno_escola(){
    //if (XMLHttp.readyState == 4){
    if (this.readyState == 4){
        //Informacoes recebidas
        //if (XMLHttp.status == 200){
        if (this.status == 200){
            //Arquivo encontrado
            //result.innerHTML = XMLHttp.responseText;
            //var escolas = this.responseText;
            $( "#escola" ).html(this.responseText);
            
            /*
            $( "#escola" ).autocomplete({
                source: escolas,
                select: changeEscola
            });
            */
        } else {
            //Erro
            result.innerHTML = "Um erro ocorreu: " + this.statusText;
        }
    }
}

function retorno_turma(){
    if (this.readyState == 4){
        if (this.status == 200){
            //var escolas = this.responseText;
            $( "#turma" ).html(this.responseText);
            
            /*
            $( "#escola" ).autocomplete({
                source: escolas,
                select: changeEscola
            });
            */
        } else {
            //Erro
            result.innerHTML = "Um erro ocorreu: " + this.statusText;
        }
    }
}

function retorno_aluno(){
    if (this.readyState == 4){
        if (this.status == 200){
            //var escolas = this.responseText;
            $( "#nome" ).html(this.responseText);
            
            /*
            $( "#escola" ).autocomplete({
                source: escolas,
                select: changeEscola
            });
            */
        } else {
            //Erro
            result.innerHTML = "Um erro ocorreu: " + this.statusText;
        }
    }
}

