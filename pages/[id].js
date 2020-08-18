import React, { useRef, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
    Grid,
    Typography,
    Card,
} from '@material-ui/core';
import theme from '../src/theme';
// import Graphic from '../public/images/Webp.net-resizeimage-67.png';

import * as d3 from 'd3';
import { json } from 'd3-fetch';

import Router from 'next/router';
import { useRouter } from 'next/router';

import {
    TestPositive,
    Hospitalized,
    DeathRate,
    Total,
    AbsoluteCases,
    IncreasedCases,
    SimpleSelect,
    TodayIncreased,
    TodayDeath,
    RecordList
} from '../src/components';

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
        color: theme.palette.white
    }
}));



const Page = ({params}) => {

    const statesArr = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY', 'PR', 'GU', 'VI', 'ALL'];


    

    const router = useRouter();
    
    console.log('query.id:' + router.query.id)
    var queryID;
    if ( params ) { queryID = params}
    if (router.query.id ) {
        queryID = (router.query.id).toUpperCase();
        
    }


    let stateUS;
    if (statesArr.includes(queryID)) {
        stateUS = queryID
    } else if (queryID === 'ALL') {
        stateUS = 'ALL'
    }

    const classes = useStyles();
    const myHeader1Ref = useRef(null);

    const [stateUSData, setStateUSData] = useState(null);
    const [circularData, setCircularData] = useState(null);
    const [rechartData, setRechartData] = useState(null);


    const switchURL = async () => {
        if (stateUS === queryID && stateUS !== 'ALL') {
            
            return await json(`https://api.covidtracking.com/v1/states/${state}/daily.json`)
        } else if (stateUS === 'ALL'){
            
            return await json("https://api.covidtracking.com/v1/us/daily.json")
        }
    }

    

    useEffect(() => {
    
       if (stateUS) {

        d3.select(myHeader1Ref.current).selectAll('p').remove();

        switchURL().then(data => {
            
            setStateUSData(data);

            var p = [...data];
            setRechartData(p.reverse());

            console.log('-----data-----  ' + JSON.stringify(p));
            console.log('++++++data++++++  ' + JSON.stringify(data));

            d3.select(myHeader1Ref.current)
                .text('COVID-19 Data Visualization Board')
                .style('font-size', '32px')
                .style('font-weight', 'bold')
                .style('font-family', '"Open Sans", verdana, arial, sans-serif')
                .append('p')
                .text(`updated at: ${data[0].dateChecked}`)
                .style('font-size', '12px')
                .style('padding', '8px')
                .append('p')
                .text('source: covidtracking.com')
                
        })


        json('https://api.covidtracking.com/v1/us/current.json').then(data => {
            
            setCircularData(data);
        })
       } else {
           Router.replace("/[id]", "/all", { shallow: true });
       }

    }, [stateUS])



    return (
        <div>
            <Grid container spacing={2}>

                <Grid item xs={12}>
                    <Typography 
                        color="textPrimary"
                        ref={myHeader1Ref}
                    >
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    <Card>
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
                    <TestPositive data={stateUSData} />
                </Grid>
                <Grid
                    item
                    lg={3}
                    sm={6}
                    xl={3}
                    xs={12}
                >
                    <Hospitalized data={stateUSData} />
                </Grid>
                <Grid
                    item
                    lg={3}
                    sm={6}
                    xl={3}
                    xs={12}
                >
                    <DeathRate data={stateUSData} />
                </Grid>
                <Grid
                    item
                    lg={3}
                    sm={6}
                    xl={3}
                    xs={12}
                >
                    <Total data={stateUSData} />
                </Grid>
            </Grid>

            <Grid className={classes.section} container spacing={2}>

                {stateUS === 'ALL' ?
                    <Grid item
                        lg={3}
                        sm={6}
                        xs={12}
                    >
                        <TodayIncreased data={circularData} />
                    </Grid> : <p></p>
                }
                {stateUS === 'ALL' ?
                    <Grid item
                        lg={6}
                        sm={6}
                        xs={12}
                    >
                        <RecordList data={circularData} />
                    </Grid> : <p></p>
                }
                {stateUS === 'ALL' ?
                    <Grid item
                        lg={3}
                        sm={6}
                        xs={12}>
                        <TodayDeath data={circularData} />
                    </Grid> : <p></p>
                }
                { rechartData ?
                <Grid
                    item
                    lg={6}
                    xs={12}
                >
                    <AbsoluteCases data={rechartData} />
                </Grid> : <p>loading</p>
                }

                { rechartData ?
                <Grid
                    item
                    lg={6}
                    xs={12}
                >
                    <IncreasedCases data={rechartData} />
                </Grid> : <p>loading</p>
                }
                
            </Grid>
        </div>
    );
};

export default Page;