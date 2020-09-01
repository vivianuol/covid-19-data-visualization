import React from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Legend,
    Tooltip
} from 'recharts';
import {
    Card,
    CardHeader,
    CardContent,
    Divider,
} from '@material-ui/core';

const Composition = ({ rawData }) => {

    console.log({"infected rawData": rawData});

    const formattedData = rawData && rawData.map(rawDatum => {
        
        const hospitalized = rawDatum.hospitalized ? rawDatum.hospitalized : 0;
        const recovered = rawDatum.recovered ? rawDatum.recovered : 0;
        const deathConfirmed = rawDatum.deathConfirmed ? rawDatum.deathConfirmed : 0;
        const restTestPositive = rawDatum.positive - hospitalized - recovered - deathConfirmed;

        return ({
            name: rawDatum.state,
            RestTestPositive: restTestPositive,
            Hospitalized: hospitalized,
            Recovered: recovered,
            DeathConfirmed: deathConfirmed
        })
    })

    console.log({ "Infected formattedData": formattedData });

    return (
        <>
            {formattedData ?
                <Card>
                    <CardHeader
                        title="Composition of current infected groups by states"
                    />
                    <Divider />
                    <CardContent>
                        <AreaChart width={800} height={400} data={formattedData}
                            margin={{ top: 20, right: 10, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Legend verticalAlign="top" height={26}/>
                            <Tooltip />
                            <Area type='monotone' dataKey='RestTestPositive' stackId="1" stroke='#8884d8' fill='#8884d8' />
                            <Area type='monotone' dataKey='Hospitalized' stackId="1" stroke='#ffc658' fill='#ffc658' />
                            <Area type='monotone' dataKey='Recovered' stackId="1" stroke='#82ca9d' fill='#82ca9d' />
                            <Area type='monotone' dataKey='DeathConfirmed' stackId="1" stroke='#e1848e' fill='#e1848e' />
                        </AreaChart>
                    </CardContent>
                </Card >
                : null}
        </>
    )
};

export default Composition;


