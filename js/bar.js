var margin = {
  top: 100,
  right: 100,
  bottom: 100,
  left: 100,
};
var wBar = 1000 - margin.left - margin.right;
    hBar = 750 - margin.top - margin.bottom;

d3.csv("data/Data-Eth.csv").then(function(data) {

var svgBar = d3.select("#bar").append("svg");
svgBar.attr("width", wBar + margin.left + margin.right)
   .attr("height", hBar + margin.top + margin.bottom);

var xScaleBar = d3.scaleBand()
               .domain(data.map(function(d) {
                 return d.Student_Ethnicity;
               }))
               .range([margin.right, wBar - margin.left])
               .paddingInner(0.05);
var yScaleBar = d3.scaleLinear()
               .domain([0, d3.max(data, function(d) { return +d.Student_Count; })])
               .range([hBar, 0]);

var xAxisBar = d3.axisBottom()
              .scale(xScaleBar);
var yAxisBar = d3.axisLeft()
              .scale(yScaleBar);
svgBar.append("g")
   .attr("class", "x-axis")
   .attr("transform", "translate(0," + (hBar + margin.bottom) + ")")
   .call(xAxisBar);
svgBar.append("g")
   .attr("class", "y-axis")
   .attr("transform", "translate(100 ,"+margin.top+")")
   .call(yAxisBar);

svgBar.selectAll("rect")
   .data(data)
   .enter()
   .append("rect")
   .attr("class", "bars")
   .attr("fill", "blue")
   .attr("x", function(d) { return xScaleBar(d.Student_Ethnicity); })
   .attr("y", function(d) { return yScaleBar(+d.Student_Count) + margin.bottom; })
   .attr("height", function(d) { return hBar - yScaleBar(+d.Student_Count); })
   .attr("width", xScaleBar.bandwidth());

// d3.select(".buttonES")
//   .on("click", function() {
//     console.log("Button Clicked");
//     svg.selectAll(".schoolType")
//        .text("Elementary Schools");
//     svg.selectAll(".points")
//        .data(titleoneES)
//        .transition()
//        .duration(1500)
//        .attr("cx", function(d) { return xScale(+d.Average_Performance); })
//        .attr("cy", function(d) { return yScale(+d.Percent_Low_Income) + margin.top; });
//   })
//
// d3.select(".buttonHS")
//   .on("click", function() {
//     console.log("Button Clicked");
//     svg.selectAll(".schoolType")
//        .text("High Schools");
//     svg.selectAll(".points")
//        .data(titleoneHS)
//        .transition()
//        .duration(1500)
//        .attr("cx", function(d) { return xScale(+d.Average_Performance); })
//        .attr("cy", function(d) { return yScale(+d.Percent_Low_Income) + margin.top; });
//   })
  svgBar.append("text")
     .attr("text-anchor", "middle")
     .attr("transform", "translate("+wBar/2+","+((hBar+margin.bottom)+ margin.bottom/2)+")")
     .text("Student Ethnicity");
  svgBar.append("text")
     .attr("transform", "translate(25,500)rotate(-90)")
     .text("Number of Students");
  // svg.append("text")
  //    .attr("class", "schoolType")
  //    .attr("x", w/2)
  //    .attr("y", margin.top/2)
  //    .attr("text-anchor", "middle")
  //    .text("Elementary Schools");





})
