// chart & chart data handlers

// ohlc
genOhlcChart = function() {
  //var chart = nv.models.ohlcBarChart();
  var chart = nv.models.candlestickBarChart();
  chart = chart.x(function(d) { return d3.time.format("%Y-%m-%d").parse(d['date']) })
	       .y(function(d) { return d['close'] });
  chart.xAxis
       .tickFormat(function(d) {
	  return d3.time.format("%Y.%m.%d")(new Date(d));
	});
  chart.yAxis
       .axisLabel("Price")
       .tickFormat(function(d,i) {
	  return '$' + d3.format(',.1f')(d);
       });
  nv.addGraph(function(){return chart;});
  return chart;
};
onOhlcData = function(data) {
  var cdata = [{values:data.data}];
  d3.select("#chart_d1 svg")
    .datum(cdata)
    .transition()
    .duration(0)
    .call(ohlcChart);
    nv.utils.windowResize(ohlcChart.update);
};

// line-bar chart
genLineBarChart = function() {
  var chart = nv.models.linePlusBarChart();
  chart = chart.x(function(d,i) {
		  var dt = d3.time.format('%Y-%m-%d').parse(d[0]);
		  return (new Date(dt)); })
	       .y(function(d,i) {
		  return d[1] });
   chart.xAxis.tickFormat(function(d) {
     return d3.time.format('%Y.%m.%d')(new Date(d))
   });
   chart.x2Axis.tickFormat(function(d) {
     return d3.time.format('%Y.%m.%d')(new Date(d))
   });
   chart.y1Axis
	.tickFormat(d3.format(',f'));
   chart.y2Axis
	.tickFormat(function(d) { return '$' + d3.format(',f')(d) });
   chart.bars.forceY([0]).padData(false);
  nv.addGraph(function(){return chart;});
  return chart;
};
onLineBarData = function(data) {
  var cdata = data.data;
  d3.select('#chart_h2 svg')
    .datum(cdata)
    .transition()
    .duration(0)
    .call(lineBarChart);
  nv.utils.windowResize(lineBarChart.update);
};

// disc bar chart
genDiscBarChart = function() {
  var chart = nv.models.discreteBarChart();
  chart = chart.x(function(d) { return d[0] })    //Specify the data accessors.
	       .y(function(d) { return d[1] })
	       .staggerLabels(true)    //Too many bars and not enough room? Try staggering labels.
	       .showValues(true);      //...instead, show the bar value right on top of each bar.
  nv.addGraph(function(){return chart;});
  return chart;
};
onDiscBarData = function(data) {
  var cdata = [ data.data ];
  d3.select('#chart_d3 svg')
    .datum(cdata)
    .transition()
    .duration(0)
    .call(discBarChart);
  nv.utils.windowResize(discBarChart.update);
};

// area chart
genStackAreaChart = function() {
  var chart = nv.models.stackedAreaChart()
      .margin({right: 100})
      .x(function(d) { return  d3.time.format("%Y-%m-%d").parse(d[0]) })   //We can modify the data accessor functions...
      .y(function(d) { return d[1] })   //...in case your data is formatted differently.
      .useInteractiveGuideline(false)    //Tooltips which show all data points. Very nice!
      .rightAlignYAxis(true)      //Let's move the y-axis to the right side.
      .showControls(true)         //Allow user to choose 'Stacked', 'Stream', 'Expanded' mode.
      .clipEdge(true);
  //Format x-axis labels with custom function.
  chart.xAxis.tickFormat(function(d) { 
       return d3.time.format('%Y.%m.%d')(new Date(d))
  });
  chart.yAxis
       .tickFormat(d3.format(',f'));
  nv.addGraph(function(){return chart;});
  return chart;      
};
onStackAreaData = function(data) {
  var cdata = data.data;
  d3.select('#chart_d4 svg')
    .datum(cdata)
    .transition()
    .duration(0)
    .call(stackAreaChart);
  nv.utils.windowResize(stackAreaChart.update);
};

// bubble chart
genBubbleChart = function() {
  var chart = nv.models.scatterChart()
      .showDistX(true)    //showDist, when true, will display those little distribution lines on the axis.
      .showDistY(true)
      .useVoronoi(true)
      .color(d3.scale.category20().range());
  //Axis settings
  chart.xAxis.tickFormat(d3.format('.02f'));
  chart.yAxis.tickFormat(d3.format('.02f'));
  nv.addGraph(function(){return chart;});
  return chart;
};
onBubbleData = function(data) {
  var cdata = data.data;
  d3.select('#chart_h1 svg')
    .datum(cdata)
    .transition()
    .duration(0)
    .call(bubbleChart);
  nv.utils.windowResize(bubbleChart.update);
};

// pie chart
genPieChart = function() {
  var chart = nv.models.pieChart()
                .x(function(d) { return d.sym })
                .y(function(d) { return d.notnl })
                .showLabels(true)     //Display pie labels
                .labelThreshold(.05)  //Configure the minimum slice size for labels to show up
                .labelType("percent") //Configure what type of data to show in the label. Can be "key", "value" or "percent"
                .donut(true)          //Turn on Donut mode. Makes pie chart look tasty!
                .donutRatio(0.30);    //Configure how big you want the donut hole size to be.
  nv.addGraph(function(){return chart;});
  return chart;
};
onPieData = function(data) {
  var cdata = data.data;
  d3.select("#chart_l1 svg")
    .datum(cdata)
    .transition()
    .duration(0)
    .call(pieChart);
  nv.utils.windowResize(pieChart.update);
};

// donut chart
genDonutChart = function() {
  var chart = nv.models.pieChart()
                .x(function(d) { return d.sym })
                .y(function(d) { return d.notnl })
                .showLabels(true)     //Display pie labels
                .labelThreshold(.05)  //Configure the minimum slice size for labels to show up
                .labelType("percent") //Configure what type of data to show in the label. Can be "key", "value" or "percent"
                .donut(false)         //Turn on Donut mode. Makes pie chart look tasty!
                .donutRatio(0.30);    //Configure how big you want the donut hole size to be.
  nv.addGraph(function(){return chart;});
  return chart;
};
onDonutData = function(data) {
  var cdata = data.data;
  d3.select("#chart_l2 svg")
    .datum(cdata)
    .transition()
    .duration(0)
    .call(donutChart);
  nv.utils.windowResize(donutChart.update);
};

// horiz bar chart
genHorizBarChart = function() {
  var chart = nv.models.multiBarHorizontalChart()
      .x(function(d) { return d.cond })
      .y(function(d) { return d.size })
      .showValues(false)
      .showControls(true);
  chart.yAxis
      .tickFormat(d3.format(',f'));
  nv.addGraph(function(){return chart;});
  return chart;
};
onHorizBarData = function(data) {
  var cdata = data.data;
  d3.select("#chart_d2 svg")
    .datum(cdata)
    .transition()
    .duration(0)
    .call(horizBarChart);
  nv.utils.windowResize(horizBarChart.update);
};

// line view chart
genLineViewChart = function() {
  var chart = nv.models.lineWithFocusChart();
  chart.xAxis
    .tickFormat(d3.format(',f'));
  chart.yAxis
    .tickFormat(d3.format(',.2f'));
  nv.addGraph(function(){return chart;});
  return chart;
};
onLineViewData = function(data) {
  var cdata = data.data;
  //cdata = testStreamData(); 
  d3.select("#chart_l3 svg")
    .datum(cdata)
    .transition()
    .duration(0)
    .call(lineViewChart);
  nv.utils.windowResize(lineViewChart.update);
};

// box plot chart
genBoxPlotChart = function() {
  var chart = nv.models.boxPlotChart()
      .x(function(d) { return d.sym })
      .staggerLabels(true)
      .maxBoxWidth(75) // prevent boxes from being incredibly wide
      .outliers(function(d){ 
          return d.outl 
       })
      .outlierValue(function(d) { 
          return d.size
       })
      .outlierLabel(function(d) { 
          return d.size + ' @ ' + d.date
       })
      .q1(function(d) { return d.q1 })
      .q2(function(d) { return d.q2 })
      .q3(function(d) { return d.q3 })
      .wl(function(d) { return d.iqrmin })
      .wh(function(d) { return d.iqrmax });

  nv.addGraph(function(){return chart;});
  return chart;
};
onBoxPlotData = function(data) {
  var cdata = data.data;
  cdata = calcBoxPlotParams(cdata);    
  //cdata = testBoxPlotData(); 
  d3.select("#chart_h3 svg")
    .datum(cdata)
    .transition()
    .duration(0)
    .call(boxPlotChart);
  nv.utils.windowResize(boxPlotChart.update);
};
calcBoxPlotParams = function(data) {
  cdata = data;
  for (i = 0; i < cdata.length; i++) { 
     var q123 = jStat.quartiles(cdata[i].size);
     (cdata[i]).q1= q123[0];
     (cdata[i]).q2= q123[1];
     (cdata[i]).q3= q123[2];
     (cdata[i]).iqrmin= q123[0]-(0.5*(q123[2]-q123[0]));
     (cdata[i]).iqrmax= q123[2]+(0.5*(q123[2]-q123[0]));
     (cdata[i]).outl= [];
     for (j=0; j < cdata[i].size.length; ++j) {
       if (cdata[i].size[j] < cdata[i].iqrmin || cdata[i].size[j] > cdata[i].iqrmax) {
         cdata[i].outl.push({size:cdata[i].size[j],date:cdata[i].date[j]});
       }
     }
     cdata[i].outl.push({size:22.3,date:"TODAY",color:'#F00'});
  }
  return (cdata);
};

// histogram chart
genHistogramChart = function() {
  var chart = nv.models.linePlusBarChart()
	//We can set x data accessor to use index. Reason? So the bars all appear evenly spaced.
	.x(function(d,i) { return d[0] })
	.y(function(d,i) { return d[1] })
	.focusEnable(false);
  chart.xAxis.tickFormat(function(d) {
    return d
  });
  chart.y1Axis
      .tickFormat(d3.format(',f'));
  chart.y2Axis
      .tickFormat(function(d) { return d3.format('%')(d) });
  chart.bars.forceY([0]);
  nv.addGraph(function(){return chart;});
  return chart;
};
onHistogramData = function(data) {
  var cdata = data.data;

  //define margins for chart, histogram bin size, and the x scale for the bins
  var numBins = 50;
  var histData = [];
  var jstat = this.jStat(cdata);
  var x = d3.scale.linear().domain([0, Math.max(...cdata)]).range([0, numBins]);
  var binDat = d3.layout.histogram().bins(x.ticks(numBins))(cdata);
  var cdfObj = {'key': 'CDF', 'color': '#333', 'values': []};
  var cntObj = {'key': 'Count', 'bar': true, 'color': '#ccf', 'values': []};
  for(var i = 0; i < binDat.length; i++) {
    cntObj.values.push([binDat[i].x,binDat[i].y]);
    cdfObj.values.push([binDat[i].x,jstat.normal(jstat.mean(), jstat.stdev()).cdf(binDat[i].x)]);
  }
  histData.push(cntObj);
  histData.push(cdfObj);

  d3.select("#chart_h4 svg")
    .datum(histData)
    .transition()
    .duration(0)
    .call(histogramChart);
  nv.utils.windowResize(histogramChart.update);
};

// parallel plot
genParallelCoordChart = function() {
  var chart = nv.models.parallelCoordinates()
        .dimensionNames(["pnl", "ADV", "SR", "spread"])
        .dimensionFormats([",f", "%", "%", ",.1f"])
        .lineTension(0.85);
  nv.addGraph(function(){return chart;});
  return chart;
};
onParallelCoordData = function(data) {
  var cdata = data.data;
  d3.select('#chart_l4 svg')
    .datum(cdata)
    .transition()
    .duration(0)
    .call(parallelCoordChart);
  nv.utils.windowResize(parallelCoordChart.update);
};

// trades table
genTradesDataTable = function(data) {
  var table = $('#chart_l5').DataTable({
    "bProcessing": true,
    "bAutoWidth": true,
    scrollY: true,
    "aaData": data,
    "aoColumns": [
	{ "mData": "date", "title": "Date" }, // <-- which values to use inside object
	{ "mData": "sym", "title": "Symbol" },
	{ "mData": "open", "title": "Open" },
	{ "mData": "high", "title": "High" },
	{ "mData": "low", "title": "Low" },
	{ "mData": "close", "title": "Close" },
	{ "mData": "size", "title": "Size" }
    ]  });
  return table;
};
onTradesTableData = function(data) {
  tradesDataTable.destroy();
  tradesDataTable = genTradesDataTable(data.data);
}

testExplodingBoxPlot = function() {
  //generate random data
  var box1 = d3.range(100).map(d3.random.normal(Math.random()*100,5))
	      .map(function(d,i){return {v:d,g:'box1',t:'pt 1'+i}})

  var box2 = d3.range(100).map(d3.random.normal(Math.random()*100,30))
	      .map(function(d,i){return {v:d,g:'box2',t:'pt 2'+i}})

  var box3 = d3.range(100).map(function(){return Math.random()*100})
	      .map(function(d,i){return {v:d,g:'box3',t:'pt 3'+i}})
  // with outliers
  var box4 = d3.range(80).map(d3.random.normal(50,5))
	    .concat(d3.range(20).map(d3.random.normal(50,25)))
	    .map(function(d,i){return {v:d,g:'box4',t:'pt 4'+i}})

  var data = box1.concat(box2).concat(box3).concat(box4)

  // chart(data,aes)
  // aesthetic :
  // y : point's value on y axis
  // group : how to group data on x axis
  // color : color of the point / boxplot
  // label : displayed text in toolbox
  var chart = d3.exploding_boxplot(data,{y:'v',group:'g',color:'g',label:'t'})

  //call chart on a div
  $('#testdivdiv svg').empty();
  chart("#testdivdiv svg")  
}

// create required instances of charts
var ohlcChart = genOhlcChart();
var lineBarChart = genLineBarChart();
var discBarChart = genDiscBarChart();
var stackAreaChart = genStackAreaChart();
var bubbleChart = genBubbleChart();
var pieChart = genPieChart();
var donutChart = genDonutChart();
var horizBarChart = genHorizBarChart();
var lineViewChart = genLineViewChart();
var boxPlotChart = genBoxPlotChart();
var histogramChart = genHistogramChart();
var parallelCoordChart = genParallelCoordChart();
var tradesDataTable = genTradesDataTable([]);


var tdata = [ 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,59,78 ];
boxplot_params = function(data) {
    var dataq = jStat.quartiles(data);
    var iqr = 1.5*(dataq[2]-dataq[0]);
    var datab = data.filter(function(v) { return v >= dataq[0]-iqr && v <= dataq[3]+iqr; });
    var datao = data.filter(function(v) { return v < dataq[0]-iqr && v > dataq[3]+iqr; });
    var dmin = Math.min.apply(null, datab);
    var dmax = Math.max.apply(null, datab);	
    return;
}
boxplot_params(tdata)
