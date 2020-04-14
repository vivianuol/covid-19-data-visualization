import React, {useEffect, useRef} from 'react';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Cell } from 'recharts';
import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Divider,
    Button
  } from '@material-ui/core';

import * as d3 from 'd3';
import {scaleRadial} from 'd3-scale';

// set the dimensions and margins of the graph
var margin = {top: -5, right: 0, bottom: 0, left: 0};
var canvas = {
    width: 460,
    height: 460
};
var width = 460 - margin.left - margin.right;
var height = 460 - margin.top - margin.bottom;
var innerRadius = 90;
var outerRadius = Math.min(width, height) / 2;


const TodayDeath = ( props ) => {
    const { className, data, ...rest } = props;

    const circRef = useRef(null);
    
    const rndColor = () => {
        var hex = '0123456789ABCDEF'.split(''),
            color = '#', i;
        for (i = 0; i < 6 ; i++) {
            color = color + hex[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    useEffect(() => {

        if(data) {

        d3.select(circRef.current).selectAll('svg').remove();

        // append the svg object
        var svg = d3.select(circRef.current)
        .append("svg")
        .attr("viewBox", "0 0 " + canvas.width + " " + canvas.height)
        .append("g")
        .style('font-family', '"Open Sans", verdana, arial, sans-serif')
        .attr("transform", "translate(" + (width / 2 + margin.left) + "," + (height / 2 + margin.top) + ")");

        // Scales
        var x = d3.scaleBand()
        .range([0, 2 * Math.PI])    // X axis goes from 0 to 2pi = all around the circle. If I stop at 1Pi, it will be around a half circle
        .align(0)                  // This does nothing
        .domain(data.map(function(d) { return d.state; })); // The domain of the X axis is the list of states.
        var y = scaleRadial()
        .range([innerRadius, outerRadius])   // Domain will be define later.
        .domain([0, 15000]); // Domain of Y is from 0 to the max seen in the data

          // Add the bars
        svg.append("g")
        .selectAll("path")
        .data(data)
        .enter()
        .append("path")
            .attr("fill", function(d){ return rndColor()})
            .attr("d", d3.arc()     // imagine your doing a part of a donut plot
                .innerRadius(innerRadius)
                .outerRadius(function(d) { return y(d['death']); })
                .startAngle(function(d) { return x(d.state); })
                .endAngle(function(d) { return x(d.state) + x.bandwidth(); })
                .padAngle(0.01)
                .padRadius(innerRadius))
            
              // Add the labels
            svg.append("g")
            .selectAll("g")
            .data(data)
            .enter()
            .append("g")
                .attr("text-anchor", function(d) { return (x(d.state) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "end" : "start"; })
                .attr("transform", function(d) { return "rotate(" + ((x(d.state) + x.bandwidth() / 2) * 180 / Math.PI - 90) + ")"+"translate(" + (y(d['death'])+10) + ",0)"; })
            .append("text")
                .text(function(d){return(d.state)})
                .attr("transform", function(d) { return (x(d.state) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "rotate(180)" : "rotate(0)"; })
                .style("font-size", "9px")
                .attr("alignment-baseline", "middle")

        }

    }, [data])
    
    return (
        <Card
          {...rest}
        >
        <CardHeader
            title="today's death comparison by states"
        />
        <Divider />
        <CardContent>
          <div
              ref={circRef}
          >
          </div>
        </CardContent>
      </Card>
    )
 
}

export default TodayDeath;
