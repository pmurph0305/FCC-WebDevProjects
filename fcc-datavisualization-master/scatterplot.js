document.addEventListener('DOMContentLoaded',function() {
  d3.json('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json', response => {

    // Tests want the time y-axis in a date object.
    response.forEach(item => {
      item.Time = new Date(0,0,0,0, item.Time.slice(0,2), item.Time.slice(3,5));
    })
    console.log('postform', response);


    d3.select('#title')
    .text("Doping in Professional Bicycle Racing");


    let tooltip = d3.select('#tooltip')

      
    let tooltipContainer = d3.select('.tooltip-container')
      .style('opacity', 0)

    
    let tooltipYear = d3.select('#tooltip-year')
    let tooltipName = d3.select('#tooltip-name')
    let tooltipDoping = d3.select('#tooltip-doping')

    generateChart();

    window.addEventListener('resize', function () {
      generateChart();
    })

    function generateChart() {
      let w = document.getElementById('chart').clientWidth;
      let h = document.getElementById('chart').clientHeight;
      let padding = w * 0.01 > 30 ? w*0.01: 45;
      if (h - 2*padding<= 0) {
        return;
      }

      // create the chart
      d3.select('.svg-chart').remove();
      let svg = d3.select('.chart')
                    .append('svg')
                    .attr('width', w)
                    .attr('height', h)
                    .attr('class', 'svg-chart');


      // User Story #2: I can see an x-axis that has a corresponding id="x-axis".
      const xScale = d3.scaleLinear()
      .domain(d3.extent(response, (d) => d.Year))
      .range([padding, w-padding])
      // User Story #7: The data-xvalue and its corresponding dot should align with the corresponding point/value on the x-axis. (tick format)
      // User Story #10: I can see multiple tick labels on the x-axis that show the year. (Ticks automatic)
      // User Story #11: I can see that the range of the x-axis labels are within the range of the actual x-axis data. (xScale)
      const xAxis = d3.axisBottom(xScale).tickFormat(d3.format(".0f"));
      svg.append('g')
      .attr('transform', 'translate(0,'+(h - padding)+')')
      .attr('id', 'x-axis')
      .call(xAxis)
      

      const yScale = d3.scaleLinear()
        .domain(d3.extent(response, (d) => d.Time))
        .range([h-padding, padding])

      // User Story #3: I can see a y-axis that has a corresponding id="y-axis".
      // User Story #6: The data-xvalue and data-yvalue of each dot should be within the range of the actual data and in the correct data format. For data-xvalue, integers (full years) or Date objects are acceptable for test evaluation. For data-yvalue (minutes), use Date objects.
      // User Story #8: The data-yvalue and its corresponding dot should align with the corresponding point/value on the y-axis. (tick format)
      // User Story #9: I can see multiple tick labels on the y-axis with %M:%S time format. (time format)
      // User Story #12: I can see that the range of the y-axis labels are within the range of the actual y-axis data. (yScale)
      const yAxis = d3.axisLeft(yScale).tickFormat(d3.timeFormat("%M:%S"));
      svg.append('g')
      .attr('transform', 'translate('+padding+', 0)')
      .attr('id', 'y-axis')
      .call(yAxis)
      
      svg.selectAll('circle')
        .data(response)
        .enter()
        .append('circle')
        .attr('cx', (d) => xScale(d.Year))
        .attr('cy', (d)=> yScale(d.Time))
        .attr('r', '7')
        .attr('fill', (d) => {
          if (d.Doping !== "") {
            return "red"
          } else {
            return "green"
          }
        })
        // User Story #4: I can see dots, that each have a class of dot, which represent the data being plotted.
        .attr('class', 'dot')
        // User Story #5: Each dot should have the properties data-xvalue and data-yvalue containing their corresponding x and y values.
        // User Story #7: The data-xvalue and its corresponding dot should align with the corresponding point/value on the x-axis.
        .attr('data-xvalue', (d) => d.Year)
        .attr('data-yvalue', (d) => d.Time)
        .on('mouseover', function(d,i) {

          tooltipContainer.transition()
            .duration(0)
            .style('opacity', 1)
            .style('position', 'absolute')
            .style('top', (yScale(d.Time)+(h/2))+'px')
            .style('left', (xScale(d.Year)+70)+'px')

            tooltipName
              .text(d.Name)
            tooltipDoping
              .text(d.Doping ? d.Doping : "No doping scandal")
            tooltipYear
              .text(d.Year)

            tooltip
              .attr('data-year', d.Year)
        })
        .on('mouseout', function(d,i) {

            tooltipContainer.transition()
            .duration(0)
            .style('opacity', 0)
            .style('top', '-1000px')
            .style('left', '-1000px')
        });
        
    }

  })
  
});