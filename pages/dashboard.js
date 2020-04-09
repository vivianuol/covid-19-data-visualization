import React, { useRef, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  Typography,
  Card,
  CardHeader,
  Divider,
  Button } from '@material-ui/core';
import theme from '../src/theme';
// import Graphic from '../public/images/Webp.net-resizeimage-67.png';

import * as d3 from 'd3';
import { json } from 'd3-fetch';

import { useRouter } from 'next/router';

import {
  TestPositive,
  Hospitalized,
  DeathRate,
  Total,
  AbsoluteCases,
  IncreasedCases,
  SimpleSelect
} from '../src/Dashboard/components';

const useStyles = makeStyles(() => ({
  root: {
    padding: theme.spacing(4),
    background: theme.palette.background.default
  },
  section: {
    margin: theme.spacing(2),
  }, 
  paper: {
    backgroundColor: theme.palette.background.default,
  }
}));

export default () => {

  const router = useRouter();
    console.log("router.query.state");
    console.log(router.query.state);

    let stateUS ='';
    if ( router.query.state !== undefined && router.query.state !== 'United States') {
        stateUS = router.query.state
    } else {
        stateUS = '';
    }
    
    console.log("stateUS");
    console.log(stateUS);


  const classes = useStyles();
  // const router = useRouter();
  // if (!stateUS) stateUS = router.query.stateUS;
  const myHeader1Ref = useRef(null);

  const [stateUSData, setStateUSData] = useState(null);
  //const [stateUS, setStateUS] = useState('');

  const switchURL = async () => {
    if (router.query.state === undefined || router.query.state ==='United States') {
      return await json("https://covidtracking.com/api/us/daily")
    } else {
      return await json(`https://covidtracking.com/api/states/daily?state=${router.query.state}`)
    }
  }


  useEffect(()=> {

    d3.select(myHeader1Ref.current).selectAll('p').remove();
    // d3.select(myHeader1Ref.current)
    //   .append('div')
    //   .attr('class', 'title')
    //   .text('Case Summary')
    //   .style('color', '#784a62')
    //   .style('padding','5px')


    switchURL().then(data => {
        console.log("data");
        console.log(data);

      setStateUSData(data)
      console.log(data[0].dateChecked)

      d3.select(myHeader1Ref.current)
            .text('COVID-19 Data Visualization Board')
            .style('font-weight','bold')
            .style('font-family', '"Open Sans", verdana, arial, sans-serif')
          .append('p')
          .text(`updated at: ${data[0].dateChecked}`)
          .style('font-size','12px')
          .style('padding','8px')
          
    })

  },[stateUS])


  return (
      <div className={classes.root}>
        <Grid className={classes.section} container spacing={2}>

          <Grid item xs={12}>
            <Typography className={classes.paper}
                  color="textPrimary"
                  variant="h3"
                  ref={myHeader1Ref}
            >
            </Typography>
          </Grid>

        <Grid item xs={12}>
          <Card className={classes.paper}>
          <SimpleSelect />
          </Card>
        </Grid>

          <Grid
              item
              lg={3}
              sm={6}
              xl={3}
              xs={12}
          >
            <TestPositive data={stateUSData}/>
          </Grid>
          <Grid
              item
              lg={3}
              sm={6}
              xl={3}
              xs={12}
          >
            <Hospitalized data={stateUSData}/>
          </Grid>
          <Grid
              item
              lg={3}
              sm={6}
              xl={3}
              xs={12}
          >
            <DeathRate data={stateUSData}/>
          </Grid>
          <Grid
              item
              lg={3}
              sm={6}
              xl={3}
              xs={12}
          >
            <Total data={stateUSData}/>
          </Grid>
        </Grid>

        <Grid className={classes.section} container spacing={2}>

          <Grid
              item
              lg={6}
              xs={12}
          >
            <AbsoluteCases data={stateUSData}/>
          </Grid>
          <Grid
              item
              lg={6}
              xs={12}
          >
            <IncreasedCases data={stateUSData}/>
          </Grid>
        </Grid>
      </div>
  );
};
