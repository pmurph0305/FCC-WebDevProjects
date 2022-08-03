document.addEventListener('DOMContentLoaded',function() {
  d3.json('https://cdn.rawgit.com/freeCodeCamp/testable-projects-fcc/a80ce8f9/src/data/tree_map/kickstarter-funding-data.json', ks => {
    
    let tooltipContainer = d3.select('.tooltip-container')
    .style('opacity', 0)
    let tooltipName = d3.select('#tooltip-name')
    let tooltipValue = d3.select('#tooltip-value')

    // User Story #4: There should be at least 2 different fill colors used for the tiles.
    var colors = ["azure", "rgb(1, 158, 255)"]
    var colorfills = d3.scaleLinear()
      .domain([1579316,6333295])
      .range(colors);
    
    window.addEventListener('resize', function () {
      generateChart();
    })
    generateChart();
      
    function generateChart() {
      let w = document.getElementById('chart').clientWidth;
      let h = document.getElementById('chart').clientHeight;
      let padding = w * 0.01 > 30 ? w*0.01: 45;

      var hierarchy = d3.hierarchy(ks.children[3]);
      var treemapLayout = d3.treemap();
      treemapLayout.size([w,h]).paddingOuter(10);
      // User Story #6: The area of each tile should correspond to the data-value amount: tiles with a larger data-value should have a bigger area.
      hierarchy.sum(function(d) {
        return d.value;
      });
      treemapLayout(hierarchy);

      // create the chart
      d3.select('.svg-chart').remove();
      let svg = d3.select('.chart')
                  .append('svg')
                  .attr('width', w-padding)
                  .attr('height', h)
                  .attr('class', 'svg-chart')
                  .attr("transform", "translate(" + 10 + ",0)");

      svg.append("g")        
        .selectAll("rect")
        .data(hierarchy.descendants())
        .enter()
        // User Story #3: My tree map should have rect elements with a corresponding class="tile" that represent the data.
        .append("rect")
        .attr("class", "tile")
        .attr("x", function (d) { return d.x0; })
        .attr("y", function(d) { return d.y0 })
        .attr("width", function(d) { 
          return d.x1 - d.x0 })
        .attr("height", function(d) { return d.y1 - d.y0 })
        .attr('fill', function(d) {
          return d.value > 6333295 ? "rgba(0, 0, 0, 0)" : colorfills(d.value);
        })
        // User Story #5: Each tile should have the properties data-name,
        // data-category, and data-value containing their corresponding name, category, and value.
        .attr('data-name', d => d.data.name)
        .attr('data-value', d => d.value)
        .attr('data-category', d => d.data.category ? d.data.category : "Video Games")
        // User Story #10: I can mouse over an area and see a tooltip with a corresponding id="tooltip" which displays more information about the area.
        .on("mouseover", function(d) {
          d3.select(this)
          .attr('class', 'fill-hovered')

          tooltipContainer.transition()
          .duration(0)
          .style('opacity', 1)
          .style('position', 'absolute')
          .style("left", (d3.event.pageX) + "px") 
          .style("top", (d3.event.pageY) + "px")
          // User Story #11: My tooltip should have a data-value property that corresponds to the data-value of the active area.
          .attr('data-value', d.value);

          tooltipName.text(d.data.name);

          tooltipValue.text(
            function() {
              let val = d.value.toString();
              return '$'+val[0]+","+val.slice(1,4)+","+val.slice(4,7);
            }
          );
        })
        .on('mouseout', function() {
          d3.select(this)
            .attr('class', null);

          tooltipContainer.transition()
            .duration(0)
            .style('opacity', 0)
            .style('position', 'absolute')
        })

      var labels = svg.selectAll('g')
        .data(hierarchy.descendants())
        .enter()
        .append('g')
        .attr('transform', d => 'translate('+[d.x0+2,d.y0+14]+')')

      
      labels.append('text')
        .text(d=> d.data.name.slice(0,10))
    }
  })
});