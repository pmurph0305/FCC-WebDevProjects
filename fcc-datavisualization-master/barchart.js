document.addEventListener('DOMContentLoaded',function() {
  d3.json('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json', (response) => {
    d3.select('#title')
      .text(response.source_name);

    let tooltip = d3.select('#tooltip-date')
      .append('p')
      .attr('class', 'tooltip-label')
      .attr('id','tooltip')
      
    let tooltipContainer = d3.select('.tooltip-container')
      .style('opacity', 0)
    let tooltipGDP = d3.select('#tooltip-gdp')
      .append('p')
      .attr('class', 'tooltip-label')

    generateChart();

    window.addEventListener('resize', function () {
      generateChart();
    })
   
    function generateChart() {
      let w = document.getElementById('chart').clientWidth;
      let h = document.getElementById('chart').clientHeight;
      let padding = w * 0.01 > 30 ? w*0.01: 45;
      let barWidth = w / response.data.length;
      if (h - 2*padding<= 0) {
        return;
      }
  
      // User Story #10: The data-date attribute and its corresponding bar element should align with the corresponding value on the x-axis.
      let xScale = d3.scaleLinear()
        .domain([0, response.data.length])
        .range([padding, w-padding])
          // User Story #11: The data-gdp attribute and its corresponding bar element should align with the corresponding value on the y-axis.
      let yScale = d3.scaleLinear()
        .domain([0, d3.max(response.data, (d) => d[1])])
        .range([h-padding, padding])
      
      d3.select('svg').remove();
      let svg = d3.select('.chart').append('svg').attr('width', w).attr('height', h).attr('class', 'svg-chart');
  
    // User Story #10. The data-date attribute and its corresponding bar element should align with the corresponding value on the x-axis.
    const timeScale = d3.scaleTime()
    .domain([new Date(response.data[0][0]), new Date(response.data[response.data.length-1][0])])
    .range([padding, w-padding ])
    // User Story #4: Both axes should contain multiple tick labels, each with the corresponding class="tick".
    // axisBottom and axisLeft create labels with the class tick.
    const xAxis = d3.axisBottom(timeScale);
    const yAxis = d3.axisLeft(yScale);

    svg.selectAll('rect')
      .data(response.data)
      .enter()
      // User Story #5: My chart should have a rect element for each data point with a corresponding class="bar" displaying the data.
      .append("rect")
      .attr('class', 'bar')
      .attr("x", (d, i) => xScale(i))
      .attr("y", (d) => yScale(d[1]))
      // User Story #9: Each bar element's height should accurately represent the data's corresponding GDP.
      .attr("height", (d, i) => h - yScale(d[1]) - padding)
      .attr("width", barWidth)
      // User Story #6: Each bar should have the properties data-date and data-gdp containing date and GDP values.
      // User Story #7: The bar elements' data-date properties should match the order of the provided data.
      .attr('data-date', (d) => d[0])
      // User Story #8: The bar elements' data-gdp properties should match the order of the provided data.
      .attr('data-gdp', (d) => d[1])
      //User Story #12: I can mouse over an area and see a tooltip with a corresponding id="tooltip" which displays more information about the area.
      .on('mouseover', function(d, i) {
   
        console.log('translate('+xScale(i)+','+yScale(d[1])+')');
        tooltip
          .style('opacity', 1)
          .text(d[0]);

        tooltipContainer.transition()
          .duration(0)
          .style('opacity', 1)
          .style("position","absolute")
          .style("top" ,(yScale(d[1])+(h/2))+'px')
          .style('left', (xScale(i)+2*padding)+'px')
        
        tooltipGDP.text(' $' + d[1] +' billion')

        function setAttributeSelf(d) {
          document.querySelector("#tooltip").setAttribute('data-date', d)
        }
        setAttributeSelf(d[0]);
        })
        .on('mouseout', function(d, i) {
          tooltip.style('opacity', 0)

          tooltipContainer.transition()
            .duration(0)
            .style('opacity', 0)
        })
      // User Story #2: My chart should have a g element x-axis with a corresponding id="x-axis".
      svg.append('g')
      .attr('transform', 'translate(0,'+(h - padding)+')')
      .attr('id', 'x-axis')
      .call(xAxis)
      //User Story #3: My chart should have a g element y-axis with a corresponding id="y-axis".

      svg.append('g')
      .attr('transform', 'translate('+padding+', 0)')
      .attr('id', 'y-axis')
      .call(yAxis)
    }
  })
});