document.addEventListener('DOMContentLoaded',function() {

  d3.json('https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/for_user_education.json', edu => {
    d3.json(' https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/counties.json', geo => {
      let tooltipContainer = d3.select('.tooltip-container')
      .style('opacity', 0)
      let tooltipCounty = d3.select('#tooltip-county')
      let tooltipBach = d3.select('#tooltip-bach')

      // User Story #4: There should be at least 4 different fill colors used for the counties.
      var colors = ["azure", "lightblue", "blue", "darkblue", "black"]
      var colorfills = d3.scaleQuantile()
        .domain([10,50])
        .range(colors);

      generateChart();
      
      function generateChart() {
        let w = document.getElementById('chart').clientWidth;
        let h = document.getElementById('chart').clientHeight;

        // create the chart
        d3.select('.svg-chart').remove();
        let svg = d3.select('.chart')
                    .append('svg')
                    .attr('width', w)
                    .attr('height', h)
                    .attr('class', 'svg-chart')
                    .append('g')
                    .attr("transform", "translate(" + 10 + ",0)");

        //a geo path.
        var path = d3.geoPath();

        // paths
        svg.append("g")
          .selectAll("path")
          .data(topojson.feature(geo, geo.objects.counties).features)
          // User Story #6: My choropleth should have a county for each provided data point.
          .enter()
          .append("path")
          // User Story #3: My choropleth should have counties with a corresponding class="county" that represent the data.
          .attr("class", "county")
          .attr('d', path)
          // User Story #4: There should be at least 4 different fill colors used for the counties.
          .attr("fill", d => {
            let item = edu.filter(item => {return item.fips == d.id})
            if (item) {
              return colorfills(item[0].bachelorsOrHigher)
            } else {
              return "red";
            }
          })
          // User Story #5: My counties should each have data-fips and data-education properties containing their corresponding fips and education values.
          // User Story #7: The counties should have data-fips and data-education values that match the sample data.
          .attr('data-fips', d => d.id)
          .attr('data-education', d => {
            let item = edu.filter(item => {return item.fips == d.id})
            if (item) {
              return item[0].bachelorsOrHigher;
            }
          })
          // User Story #10: I can mouse over an area and see a tooltip with a corresponding id="tooltip" which displays more information about the area.
          .on("mouseover", function(d) {
            d3.select(this)
            .attr('class', 'fill-hovered')

            tooltipContainer.transition()
            .duration(0)
            .style('opacity', 1)
            .style('position', 'absolute')
            .style("left", (30 + d3.event.pageX) + "px") 
            .style("top", (-40 + d3.event.pageY) + "px");

            // User Story #11: My tooltip should have a data-education property that corresponds to the data-education of the active area.
            // Set the bach and county text in the same go.
            tooltipContainer
              .attr('data-education', function() {
                let bach = edu.filter(item => {return item.fips == d.id})
                if (bach[0]) {
                  tooltipCounty.text(bach[0].area_name + ", " + bach[0].state)
                  tooltipBach.text(bach[0].bachelorsOrHigher + "%")
                  return bach[0].bachelorsOrHigher;
                }
                return 0;
              })
          })
          .on('mouseout', function(d) {
            d3.select(this)
              .attr('class', null);

            tooltipContainer.transition()
              .duration(0)
              .style('opacity', 0)
              .style('position', 'absolute')
          })
      }
    })
  })
});