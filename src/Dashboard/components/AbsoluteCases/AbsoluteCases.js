import React, { useEffect, useRef } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Button
} from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import theme from '../../../theme';

import * as d3 from 'd3';
import { json } from 'd3-fetch';

const useStyles = makeStyles(() => ({
  root: {},
  chartContainer: {
    height: 400,
    position: 'relative'
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

var margin = {
  top: 30,
  right: 30,
  bottom: 50,
  left: 60
}

var canvas = {
  width: 640,
  height: 360
}

var width = 640 - margin.left - margin.right;
var height = 360 - margin.top - margin.bottom;


export default (props) => {

  const { className, data, ...rest } = props;
  console.log("props");
  console.log(props);

  const classes = useStyles();
  const absRef = useRef(null);


  useEffect(() => {
    if (data !== null) {
      d3.select(absRef.current).selectAll('svg').remove();

      console.log("$%^&**&^%$#")
      console.log(data)
      console.log("absRef.current")
      console.log(absRef.current)

      const svg = d3.select(absRef.current)
        .append("svg")
        .style('background', '#f4f4f4')
        .attr("viewBox", "0 0 " + canvas.width + " " + canvas.height)
        .append("g")
        .style('font-family', '"Open Sans", verdana, arial, sans-serif')
        .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");



      // the array is listed from last day to first day, we should reverse the order.
      const filtered = data.map(d => {
        return {
          date: d.date,
          positive: d.positive,
          total: d.total,
          positiveRate: (d.positive == 0 || d.total == 0) ? 0 : Math.round(d.positive / d.total * 10000) / 100,
          hospitalizedRate: Math.round(d.hospitalized / d.positive * 100)
        }
      });
      filtered.reverse();
      console.log("**************")
      console.log(filtered)

      //list of groups = value of the first colum called group
      var groups = d3.map(data, function (d) {
        return d.date
      }).keys()

      var formattedDate = groups.map(date => date.slice(5, 6) + "-" + date.slice(6, 8));
      formattedDate.reverse();

      //list of subgroups
      var allKeys = Object.keys(data[1])
      var subGroups = allKeys.filter(key => key == "positive" || key == "total").reverse()


      //Add X axis
      var xAxisScale = d3.scaleBand()
        .domain(groups.reverse())
        .range([0, width])
        .padding([0.2]);

      var x_axis = d3.axisBottom()
        .tickSize(-3)
        .tickFormat((d, i) => formattedDate[i])
        .scale(xAxisScale)

      svg.append('g')
        .attr('transform', `translate(0, ${height} )`)
        .call(x_axis)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("transform", "rotate(-65)");


      //scale for subgroup positioning
      var xSubgroupScale = d3.scaleBand()
        .domain(subGroups)
        .range([xAxisScale.bandwidth(), 0])
        .padding([0.05])


      //Add Y axis
      var maxHeight = Math.max.apply(Math, data.map(o => o.total));

      var yAxisScale = d3.scaleLinear()
        .domain([maxHeight, 0])
        .range([0, height]);
      var y_axis = d3.axisLeft()
        .tickSize(-3)
        .scale(yAxisScale);
      svg.append('g')
        .call(y_axis)
        .style('font-size', '0.5em')

      //text label for x axis
      svg.append("text")
        .attr("transform",
          "translate(" + (width / 2) + " ," +
          (height + margin.top) + ")")
        .attr("dy", "0.6em")
        .style('font-size', '0.7em')
        .style("text-anchor", "end")
        .text("Date");

      // text label for the y axis
      svg.append("text")
        // .attr("transform", "rotate(-90)")
        .attr("x", 0 - margin.left)
        .attr("y", 0)
        .attr("dx", "5.5em")
        .attr("dy", "-0.5em")
        .style("text-anchor", "end")
        .style("font-size", "0.7em")
        .text("Cases");

      // color palette = one color per subgroup
      var color = d3.scaleOrdinal()
        .domain(subGroups)
        .range(['#ada9c3', '#ff965b', '#f26b5b'])

      //图标 图例 图表名称等
      // Add one dot in the legend for each name.
      var catogery = ['positive', 'total', 'positive rate']
      var size = 10
      svg.selectAll("mydots")
        .data(catogery)
        .enter()
        .append("rect")
        .attr("x", 100)
        .attr("y", function (d, i) {
          return 50 + i * (size + 5)
        }) // 100 is where the first dot appears. 25 is the distance between dots
        .attr("width", size)
        .attr("height", size)
        .style('font-size', '0.6em')
        .style("fill", function (d) {
          return color(d)
        })

      // Add legend name for each dot.
      svg.selectAll("mylabels")
        .data(catogery)
        .enter()
        .append("text")
        .attr("x", 100 + size * 1.2)
        .attr("y", function (d, i) {
          return 50 + i * (size + 5) + (size / 2)
        }) // 100 is where the first dot appears. 25 is the distance between dots
        .style('font-size', '0.6em')
        .style("fill", function (d) {
          return color(d)
        })
        .text(function (d) {
          return d
        })
        .attr("text-anchor", "left")
        .style("alignment-baseline", "middle")

      //Show the bars
      svg.append('g')
        .selectAll('g')
        .data(data.reverse())
        .enter().append('g')
        .attr("transform", function (d) {
          return "translate(" + xAxisScale(d.date) + ",0)";
        })
        .selectAll('rect')
        .data(function (d) {

          return subGroups.map(function (key) {

            let cleanData;
            if (d[key] == '') {
              d[key] = 0;
            }
            cleanData = {
              key: key,
              value: parseInt(d[key])
            }

            // console.log("d-key")
            // console.log(parseInt(d[key]));

            return cleanData;
          });
        })
        .enter().append('rect')
        .attr("x", function (d) {
          return xSubgroupScale(d.key);
        })
        .attr("y", function (d) {
          return yAxisScale(d.value);
        })
        .attr('width', xSubgroupScale.bandwidth())
        .attr('height', d => (height - yAxisScale(d.value)))
        .style('fill', (d, i) => color(i))
        

      //------------------- Add connected scatter graph --------------
      //Add r axis for ratios
      var rAxisScale = d3.scaleLinear()
        .domain([100, 0])
        .range([0, height]);
      var r_axis = d3.axisRight()
        .tickSize(3)
        .scale(rAxisScale);
      svg.append('g')
        .call(r_axis)
        .style('font-size', '0.6em')
        .attr('transform', `translate(${width}, 0 )`);

      // text label for the r axis
      svg.append("text")
        .attr('transform', `translate(${width}, 0 )`)
        .attr("x", '-1em')
        .attr("y", 0)
        .attr("dx", "2.5em")
        .attr("dy", "-0.5em")
        .style("text-anchor", "end")
        .style("font-size", "0.6em")
        .text("%");

      //show the connected scatters
      // Add the line
      svg.append("path")
        .datum(filtered)
        .attr("fill", "none")
        .attr("stroke", "#f26b5b")
        .attr("stroke-width", 0.7)
        .attr("d", d3.line()
          .x(function (d) {
            return xAxisScale(d.date)
          })
          .y(function (d) {
            return rAxisScale(d.positiveRate)
          })
        )
      // Add the points
      svg
        .append("g")
        .selectAll("dot")
        .data(filtered)
        .enter()
        .append("circle")
        .attr("cx", function (d) {
          return xAxisScale(d.date)
        })
        .attr("cy", function (d) {
          return rAxisScale(d.positiveRate)
        })
        .attr("r", 2)
        .attr("fill", "#f26b5b")

      //add grid lines for y axis
      var yGridLine = d3.axisLeft()
        .scale(yAxisScale)
        .tickSize(-width, 0, 0)
        .tickFormat("");

      svg.append("g")
        .call(yGridLine)
        .classed("gridLine", true)
        .attr("transform", "translate(0,0)")
        .style('color', 'lightgrey')
        .style('opacity', '0.7')
        .style('stroke-width', '0.5')

    }

  }, [props.data])

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        action={
          <Button
            size="small"
            variant="text"
          >
            Last 7 days <ArrowDropDownIcon />
          </Button>
        }
        title="Total Tested Vs Test Positive"
      />
      <Divider />
      <CardContent>
        <div
          ref={absRef}
        >
        </div>
      </CardContent>
      <Divider />
      <CardActions className={classes.actions}>
        <Button
          color="primary"
          size="small"
          variant="text"
        >
          Overview <ArrowRightIcon />
        </Button>
      </CardActions>
    </Card>
  );
};
