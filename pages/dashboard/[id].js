import React, { useRef, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  Typography,
  Card,
  CardHeader,
  Divider,
  Button } from '@material-ui/core';
import theme from '../../src/theme';
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
} from '../../src/Dashboard/components';

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

    const statesArr = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY', 'PR', 'GU', 'VI', 'all'];

  const router = useRouter();
    console.log("router.query.id");
    console.log(router.query.id);

    let stateUS ='all';
    if ( statesArr.includes(router.query.id)) {
        stateUS = router.query.id
    } else {
        stateUS = 'all';
    }
    
    console.log("stateUS");
    console.log(stateUS);


  const classes = useStyles();
  const myHeader1Ref = useRef(null);

  const [stateUSData, setStateUSData] = useState(null);
  //const [stateUS, setStateUS] = useState('');

  const switchURL = async () => {
    if (stateUS === router.query.id && stateUS !=='all') {
      return await json
      (`https://covidtracking.com/api/states/daily?state=${router.query.id}`)
    } else {
      return await json("https://covidtracking.com/api/us/daily")
    }
  }


  useEffect(()=> {

    d3.select(myHeader1Ref.current).selectAll('p').remove();

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
