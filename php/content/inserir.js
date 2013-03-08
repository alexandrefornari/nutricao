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
    
    busca_escola("none");
	busca_turma("none");
    busca_aluno("none");
    
    $("#escola").change(mudanca_escola);
    $("#turma").change(mudanca_turma);
    $("#nome").change(mudanca_aluno);
    
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
  limpaValoresMedidas();
}

function limpaValoresMedidas(){
    $("#peso").val("");
    $("#altura").val("");
    $("#imc").val("");
    $("#pcs").val("");
    $("#pct").val("");
    $("#soma").val("");
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

/*
function changeEscola(event, ui){
    //alert(event.target.id);
    var value = ui.item.value;
    
    //Buscar BD Turmas
}
*/

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

var id_escola = -1;
var id_turma = -1;
var id_aluno = -1;

//Escola selecionada:
//Quando muda a escola procura-se novamente as turmas e as escolas
//Caso a turma que estava selecionada fizer parte da nova escola selecionada isso será tratado no retorno.
function mudanca_escola(){
  id_escola = $("#escola :selected").val();
  if(id_escola == -1){
    busca_turma("none");
    busca_aluno("none");
  }else{
    busca_turma("escola");
    busca_aluno("escola");
  }
}

//Turma selecionada:
function mudanca_turma(){
    id_turma = $("#turma :selected").val();
    
    if(id_turma == -1){
        if(id_escola == -1) busca_aluno("none");
        else busca_aluno("escola");
    }else{
        if(id_escola == -1) busca_aluno("turma");
        else busca_aluno("escolaTurma");
    }
}

//Aluno selecionado:
function mudanca_aluno(){
    id_aluno = $("#nome :selected").val();
    //busca_escola("aluno");
    //busca_turma("aluno");
    busca("dados&aux=none", retorno_dados);
    busca("historico&aux=none", retorno_historico);
}


//----------------------------------------------------------------------------------------------------------------------------------


//Busca as escolas dependendo do parâmetro
function busca_escola(param){
    var search = "escola&aux=" + param;
    busca(search, retorno_escola);
}

//Busca as escolas dependendo do parâmetro
function busca_turma(param){
    var search = "turma&aux=" + param;
    busca(search, retorno_turma);
}

//Busca as escolas dependendo do parâmetro
function busca_aluno(param){
    var search = "aluno&aux=" + param;
    busca(search, retorno_aluno);
}


//-----------------------------------------------------------------------------------------------------------------------


function retorno_escola(){
    if (this.readyState == 4){
        if (this.status == 200){
            //Arquivo encontrado
            //result.innerHTML = XMLHttp.responseText;
            //var escolas = this.responseText;
            $("#escola").html(this.responseText);
            
            if(!select_value_in_tag("#turma", id_turma)){
                id_turma = $("#turma :selected").val()
            }
            
            if(!select_value_in_tag("#alunos", id_aluno)){
                id_aluno = $("#aluno :selected").val()
            }
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
            
            if(!select_value_in_tag("#escola", id_escola)){
                id_escola = $("#escola :selected").val()
            }
            
            if(!select_value_in_tag("#alunos", id_aluno)){
                id_aluno = $("#aluno :selected").val()
            }
            
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

function retorno_dados(){
    if (this.readyState == 4){
        if (this.status == 200){
            var resposta = this.responseText;
            if(resposta != ""){
                var r = resposta.split("%");
                
                $("#nascimento").val(formataDataENtoBR(r[0]));
                $("#nascimento").prop('disabled', 'disabled');
                
                $('#' + r[1]).prop('checked', true);//.button("refresh");
                $('#masculino').attr('disabled', 'disabled');
                $('#feminino').attr('disabled', 'disabled');
                
                id_escola = r[2];
                if($("#escola :selected").val() != id_escola){
                    //Seleciona a turma do aluno
                    $("#escola").val(id_escola);
                }
                
                id_turma = r[3];
                busca("turma&aux=escola", function(){
                  if (this.readyState == 4){
                    if (this.status == 200){
                        $("#turma").html(this.responseText);
                        $("#turma").val(id_turma);
                    }
                  }
                });
                
                busca("aluno&aux=escolaTurma", function(){
                  if (this.readyState == 4){
                    if (this.status == 200){
                        $("#nome").html(this.responseText);
                        $("#nome").val(id_aluno);
                    }
                  }
                });
                
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

function select_value_in_tag(tag, value){
  var achou = false;
    $(tag + " option").each(function(){
        if($(this).val() == value){
	    //alert(tag + ": achou um valor");
            $(this).attr("selected","selected");
            achou = true;
            return true;
        }
        return false;
    });
    
    return achou;
}

function insere(query, funcao){
    var XMLHttp = generateXMLHttp();
    XMLHttp.open("get", "./content/inserir_insere.php?campo=" + query, true);
    XMLHttp.onreadystatechange = funcao;
    XMLHttp.send(null);
}

function busca(query, funcao) {
    var finalQuery = "&id_escola=" +  id_escola + "&id_turma=" +  id_turma + "&id_aluno=" + id_aluno;
    var XMLHttp = generateXMLHttp();
    XMLHttp.open("get", "./content/inserir_busca.php?campo=" + query + finalQuery, true);
    XMLHttp.onreadystatechange = funcao;
    XMLHttp.send(null);
}

