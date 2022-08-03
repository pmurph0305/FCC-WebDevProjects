document.addEventListener('DOMContentLoaded',function() {
  d3.json('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json', response => {
    console.log(response);
    let tooltip = d3.select('#tooltip');
    let tooltipContainer = d3.select('.tooltip-container')
      .style('opacity', 0)
    
    let tooltipYear = d3.select('#tooltip-month-year')
    let tooltipTemp = d3.select('#tooltip-temp')

    generateChart();

    window.addEventListener('resize', function () {
      generateChart();
    })

    function generateChart() {
      let w = document.getElementById('chart').clientWidth;
      let h = document.getElementById('chart').clientHeight;
      
      let padding = w * 0.01 > 30 ? w*0.01: 45;
      let barWidth = (w-2*padding) / (2015-1753);
      let barHeight = (h-(1.75*padding)) / 12;
      if (h - 2*padding<= 0) {
        return;
      }

      // create the chart
      d3.select('.svg-chart').remove();
      let svg = d3.select('.chart')
                    .append('svg')
                    .attr('width', w+10)
                    .attr('height', h)
                    .attr('class', 'svg-chart')
                    .append('g')


      const xScale = d3.scaleLinear()
      .domain(d3.extent(response.monthlyVariance, (d) => d.year))
      .range([padding, w-padding])

      // User Story #10: My heat map should have cells that align with the corresponding year on the x-axis.
      // User Story #12: My heat map should have multiple tick labels on the x-axis with the years between 1754 and 2015.
      const xAxis = d3.axisBottom(xScale).tickFormat(d3.format(".0f"))
      svg.append('g')
      .attr('transform', 'translate(0,'+(h - padding)+')')
      // User Story #3: My heat map should have an x-axis with a corresponding id="x-axis".
      .attr('id', 'x-axis')
      .call(xAxis)
      
    
      const yScale = d3.scaleLinear()
        .domain(d3.extent(response.monthlyVariance, (d) => d.month-1))
        .range([h-padding, padding])

      // User Story #11: My heat map should have multiple tick labels on the y-axis with the full month name
      let yTickValues = ['January', 'February','March','April','May','June','July','August','September','October','November','December'];
      // User Story #9: My heat map should have cells that align with the corresponding month on the y-axis.
      const yAxis = d3.axisLeft(yScale).tickFormat(function(d,i){return yTickValues[i]})
      svg.append('g')
      .attr('transform', 'translate('+padding+', 0)')
      // User Story #4: My heat map should have a y-axis with a corresponding id="y-axis".
      .attr('id', 'y-axis')
      .call(yAxis);

      svg.selectAll('rect')
        .data(response.monthlyVariance)
        .enter()
        .append('rect')
        // User Story #5: My heat map should have rect elements with a class="cell" that represent the data.
        .attr('class', 'cell')
        .attr("x", (d) => xScale(d.year))
        .attr("y", (d) => { 
          //console.log(yScale(d.month));
          return yScale(d.month)
        })
        .attr("height", barHeight+2+'px')
        .attr("width", barWidth+'px')
        // User Story #6: There should be at least 4 different fill colors used for the cells.
        .attr('fill', (d) => {
          if (d.variance < -1.5) {
            return "blue"
          } else if (d.variance < 0){
            return "lightblue"
          } else if (d.variance < 1.5){
            return "white"
          } else if (d.variance < 3){
            return "yellow"
          } else {
            return "red"
          }
        })
        // User Story #7: Each cell will have the properties "data-month", "data-year", "data-temp" 
        // containing their corresponding month, year, and temperature values.
        // User Story #8: The "data-month", "data-year" of each cell should be within the range of the data.
        .attr('data-month', (d) => d.month-1)
        .attr('data-year', (d) => d.year)
        .attr('data-temp', (d) => d.variance)
        .on('mouseover', function(d,i) {

          d3.select(this)
            .attr('class', 'fill-hovered')
          //User Story #16: I can mouse over an area and see a tooltip with a corresponding id="tooltip" which displays more information about the area.
          tooltipContainer.transition()
            .duration(0)
            .style('opacity', 1)
            .style('position', 'absolute')
            .style('top', (yScale(d.month)+(h/2)-2*barHeight)+'px')
            .style('left', (xScale(d.year))+'px')

            // User Story #16: My tooltip should have a data-year property that corresponds to the data-year of the active area.
            tooltipYear
              .text(yTickValues[d.month-1] + ' ' + d.year)

            tooltipTemp
              .text((8.5+d.variance).toFixed(1));
            tooltip
              .attr('data-year', d.year)
        })
        .on('mouseout', function(d,i) {
          d3.select(this)
            .attr('class', null);

          tooltipContainer.transition()
            .duration(0)
            .style('opacity', 0)
            .style('top', '-1000px')
            .style('left', '-1000px')
        });
        
    }

  })
  
});