var h = 100;
var w = 400;
var metrics = [];

function buildLine(ds) {
    var lineFun = d3.svg.line()
      .x(function(d) { return ((d.month - 20160001) / 3.25); })
      .y(function(d) { return h-d.sales; })
      .interpolate("linear");

    var svg = d3.select("body").append("svg").attr({ width: w, height: h});

    var viz = svg.append("path").attr({
      d: lineFun(ds),
      "stroke": "purple",
      "stroke-width": 2,
      "fill": "none"
    });
}

d3.json("https://api.github.com/repos/ain-/d3js-data-visualization-fundamentals/contents/MonthlySales.json", function(error, data) {
  if (error) {
    console.log(error);
  } else {
    console.log(data);
    ds = data;
  }
  var decodedData = JSON.parse(window.atob(data.content));
  console.log(decodedData);

  buildLine(decodedData);

});
