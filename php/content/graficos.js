$(document).ready(
    function(){
        $("#nascimento2").datepicker();
        $("#data").datepicker();
        $("#nGraficos").change(ajustaGraficos);
        
        var data = [20,13.43,2.83,4.24,7.42,13.43,38.65];
        var labels = ['Miscellaneous','Cooking','Office equipment','Refridgeration','Cooling','Ventilation','Lighting'];
        var tooltips = ['20','13.43','2.83','4.24','7.42','13.43','38.65'];
        var colors = ['#EC0033','#A0D300','#FFCD00','#00B869','#999999','#FF7300','#004CB0'];
        
        bar1 = criaGraficoBarra('g1', data, labels, ['#00E100']);
        pie1 = criaGraficoPie('pie1', data, labels, tooltips, colors, 60);
        
        for (var i=0; i<data.length; ++i) {
            pie1.Get('chart.labels')[i] = pie1.Get('chart.labels')[i];
        }
        
        //---------------------------------------------------------------
        
        var data2 = [20,13.43,2.83,4.24,7.42,13.43,38.65];
        var labels2 = ['Miscellaneous','Cooking','Office equipment','Refridgeration','Cooling','Ventilation','Lighting']
        var tooltips2 = ['Miscellaneous','Cooking','Office equipment','Refridgeration','Cooling','Ventilation','Lighting']
        
        bar2 = criaGraficoBarra('g2', data2, labels2, ['#00E100']);
        pie2 = criaGraficoPie('pie2', data2, labels2, tooltips2, colors, 60);
        
        for (var i=0; i<data.length; ++i) {
            pie2.Get('chart.labels')[i] = pie2.Get('chart.labels')[i];
        }
        //---------------------------------------------------------------
        
        bar3 = new RGraph.Bar('g3', [4,5,3,8,4,9,6,5,3,7]);
        bar3.Set('labels', ['0-10', '11-20', '21-30', '31-40', '41-50', '51-60', '61-70', '71-80', '81-90', '91-100']);
        bar3.Set('colors', ['#00E100']);
        bar3.Set('ylabels', false);
       
       //---------------------------------------------------------------
        
        bar4 = new RGraph.Bar('g4', [4,5,3,8,4,9,6,5,3,7]);
        bar4.Set('labels', ['0-10', '11-20', '21-30', '31-40', '41-50', '51-60', '61-70', '71-80', '81-90', '91-100']);
        bar4.Set('colors', ['#00E100']);
        bar4.Set('ylabels', false);
        
        
        RGraph.Effects.Bar.Wave(bar1);
        RGraph.Effects.Pie.RoundRobin(pie1);
        RGraph.Effects.Bar.Wave(bar2);
        RGraph.Effects.Pie.RoundRobin(pie2);
        RGraph.Effects.Bar.Wave(bar3);
        RGraph.Effects.Bar.Wave(bar4);
        
        /*
        line = new RGraph.Line('cvs', [4,5,3,8,4,9,6,5,3,7]);
        line.Set('spline', true);
        line.Set('shadow', true);
        line.Set('tickmarks', 'endsquare');
        line.Set('tooltips', ['Mal', 'Barry', 'Gary', 'Neil', 'Kim', 'Pete', 'Lou', 'Fred', 'Jobe', 'Larry']);
        line.Set('hmargin', (line.canvas.width - line.Get('chart.gutter.left') - line.Get('chart.gutter.right')) / (bar.data.length * 2));
        RGraph.Effects.Line.jQuery.Trace(line);
        */
    }
);

function criaGraficoPie(tag, dados, labels, tooltips, colors, raio){
    var pie = new RGraph.Pie(tag, dados);
    pie.Set('chart.labels', labels);
    pie.Set('chart.tooltips', tooltips);
    pie.Set('chart.colors', colors);
    pie.Set('chart.tooltips.event', 'onmousemove');
    pie.Set('chart.strokestyle', 'white');
    pie.Set('chart.linewidth', 3);
    pie.Set('chart.shadow', true);
    pie.Set('chart.shadow.offsetx', 2);
    pie.Set('chart.shadow.offsety', 2);
    pie.Set('chart.shadow.blur', 3);
    pie.Set('chart.exploded', 7);
    pie.Set('chart.radius', raio);
    
    return pie;
}

function criaGraficoBarra(tag, dados, labels, colors){
    var bar = new RGraph.Bar(tag, dados);
    bar.Set('labels', labels);
    bar.Set('colors', colors);
    bar.Set('ylabels', false);
    
    return bar;
}


function CreateGradient (obj, color)
{
    return RGraph.RadialGradient(obj, 200, 150, 95, 200, 150, 125, color, 'black')
}

var bar1;
var pie1
var bar2;
var bar3;
var bar4;

function ajustaGraficos(event){
    switch ($("#nGraficos").val()){
        case "1":
            preparaCaso1();
            $("#grafico1").show();
            $("#grafico2").hide();
            $("#grafico3").hide();
            $("#grafico4").hide();
            break;
        case "2":
            preparaCaso2();
            $("#grafico1").show();
            $("#grafico2").show();
            $("#grafico3").hide();
            $("#grafico4").hide();
            break;
        case "4":
            preparaCaso4();
            $("#grafico1").show();
            $("#grafico2").show();
            $("#grafico3").show();
            $("#grafico4").show();
            break;
    }
}

function preparaCaso1(){
    
    /*var g1 = document.getElementById('g1');
    g1.width = 600;
    RGraph.Effects.Bar.Grow(bar1);
    RGraph.Effects.Pie.RoundRobin(pie1);*/
}

function preparaCaso2(){
    
    /*var g1 = document.getElementById('g1');
    g1.width = 600;
    RGraph.Effects.Bar.Grow(bar1);
    RGraph.Effects.Pie.RoundRobin(pie1);*/
    
    var g2 = document.getElementById('g2');
    g2.width = 600;
    RGraph.Effects.Bar.Wave(bar2);
    RGraph.Effects.Pie.RoundRobin(pie2);
}

function preparaCaso4(){
    
    
    var g1 = document.getElementById('g1');
    g1.width = 400;
    RGraph.Effects.Bar.Wave(bar1);
    
    var g2 = document.getElementById('g2');
    g2.width = 400;
    RGraph.Effects.Bar.Wave(bar2);
    
    var g3 = document.getElementById('g3');
    g3.width = 400;
    RGraph.Effects.Bar.Wave(bar3);
    
    var g4 = document.getElementById('g4');
    g4.width = 400;
    RGraph.Effects.Bar.Wave(bar4);
}


