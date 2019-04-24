var margin = {
  top: 100,
  right: 100,
  bottom: 100,
  left: 100,
};
var wS = 1000;
    hS = 750;

d3.csv("data/Data-Master.csv").then(function(master) {

  //console.log(progress);
  //console.log(profile);

var titleone = _.filter(master, function(d) {
  if (d.Title_1_Eligible == "TRUE" && d.Average_Performance != "#DIV/0!") {
    return d;
  }
});
var titleoneES = _.filter(titleone, function(d) {
  if (d.Primary_Category == "ES") {
    return d;
  }
});
var titleoneHS = _.filter(titleone, function(d) {
  if (d.Primary_Category == "HS") {
    return d;
  }
});
console.log(titleone);
console.log(titleoneES);
console.log(titleoneHS);

var svgS = d3.select("#scatter").append("svg");
svgS.attr("width", wS)
   .attr("height", hS);

var xScaleS = d3.scaleLinear()
               .domain([0,100])
               .range([margin.right, wS - margin.left]);
var yScaleS = d3.scaleLinear()
               .domain([40,100])
               .range([hS - margin.top - margin.bottom, 0]);

var xAxisS = d3.axisBottom()
              .scale(xScaleS);
var yAxisS = d3.axisLeft()
              .scale(yScaleS);
svgS.append("g")
   .attr("class", "x-axis")
   .attr("transform", "translate(0," + (hS - margin.bottom) + ")")
   .call(xAxisS);
svgS.append("g")
   .attr("class", "y-axis")
   .attr("transform", "translate(100 ,"+margin.top+")")
   .call(yAxisS);

var pointsES = svgS.selectAll("circle")
   .data(titleoneES)
   .enter()
   .append("circle")
   .attr("class", "pointsES")
   .attr("cx", function(d) { return xScaleS(+d.Average_Performance); })
   .attr("cy", function(d) { return yScaleS(+d.Percent_Low_Income) + margin.top; })
   .attr("r", "3")
   .attr("fill", "black");

d3.select(".buttonES")
  .on("click", function() {
    console.log("Button Clicked");
    d3.selectAll(".pointsHS").remove();
    svgS.selectAll(".schoolType")
       .text("Elementary Schools");
    svgS.selectAll("circle")
       .data(titleoneES)
       .enter()
       .append("circle")
       // .transition()
       // .duration(1500)
       .attr("class", "pointsES")
       .attr("cx", function(d) { return xScaleS(+d.Average_Performance); })
       .attr("cy", function(d) { return yScaleS(+d.Percent_Low_Income) + margin.top; })
       .attr("r", 3);
       // d3.selectAll(".pointsES").remove();
  })

d3.select(".buttonHS")
  .on("click", function() {
    console.log("Button Clicked");
d3.selectAll(".pointsES").remove();
    svgS.selectAll(".schoolType")
       .text("High Schools");
    svgS.selectAll("circle")
       .data(titleoneHS)
       .enter()
       .append("circle")
       // .transition()
       // .duration(1500)
       .attr("class", "pointsHS")
       .attr("cx", function(d) { return xScaleS(+d.Average_Performance); })
       .attr("cy", function(d) { return yScaleS(+d.Percent_Low_Income) + margin.top; })
       .attr("r", 3);
       // d3.selectAll(".pointsES").remove();
  })

  svgS.append("text")
     .attr("text-anchor", "middle")
     .attr("transform", "translate(500,725)")
     .text("Average Performance Percentile");
  svgS.append("text")
     .attr("transform", "translate(25,500)rotate(-90)")
     .text("% Low Income Students");
  svgS.append("text")
     .attr("class", "schoolType")
     .attr("x", wS/2)
     .attr("y", margin.top/2)
     .attr("text-anchor", "middle")
     .text("Elementary Schools");





})
