import React  from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Button
} from '@material-ui/core';
import {
  ComposedChart,
  Line,
    Bar, 
    Label,
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    Legend
    } from 'recharts';


const PositiveTotalCases = ({data}) => {

  const filteredData = data.filter( d => d.positive > 10);


  return (
          <Card>
            <CardHeader 
              title="Total Tested Vs Test Positive"
            />
            <Divider />
            <CardContent>
              { data ? 
              <ComposedChart width={860} height={400} data={filteredData}
              margin={{top: 30, right: 20, left: 50, bottom: 20}}>
                <CartesianGrid vertical={false} strokeDasharray="4 4"/>
                <XAxis dataKey="date">
                  <Label value="Date" offset={-30} position="insideBottom" />
                </XAxis>
                <YAxis yAxisId="left" orientation="left" fill="#8884d8">
                  <Label value='cases' position='insideTopLeft' />
                </YAxis>
                <YAxis yAxisId="right" orientation="right" fill="#ff7300">
                  <Label value='%' offset={20}position='insideTopRight' />
                </YAxis>
                <Tooltip />
                <Legend verticalAlign='top' />
                <Bar yAxisId="left" dataKey="positive" fill="#8884d8" />
                <Bar yAxisId="left" dataKey="totalTestResults" fill="#82ca9d" />
                <Line name="positive rate" yAxisId="right" dataKey={(d, i)=> { if (d.positive === 0 || d.totalTestResults === 0) {
                  return 0
                  } else { 
                  return Math.round(d.positive / d.totalTestResults * 10000) / 100 }}
                 } stroke='#ff7300' />
                </ComposedChart>
              : 
              <p>loading...</p>
              }
            </CardContent>
            <Divider />
              <CardActions>
                <Button
                  color="primary"
                  size="small"
                  variant="text"
                >
                  Overview 
                </Button>
              </CardActions>
          </Card>

  );
};

export default PositiveTotalCases;