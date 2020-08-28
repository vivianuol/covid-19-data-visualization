import React, { useEffect, useState  } from 'react';
import { 
    PieChart, 
    Pie, 
    Cell,
    Legend, 
    Tooltip 
} from 'recharts';
import {
    Card,
    CardHeader,
    CardContent,
    Divider,
} from '@material-ui/core';


// const rndColor = () => {
//     var hex = '0123456789ABCDEF'.split(''),
//         color = '#', i;
//     for (let i = 0; i < 6; i++) {
//         color = color + hex[Math.floor(Math.random() * 16)];
//     }
//     return color;
// }

const COLORS = ["#e1848e", "#c5ecbd","#f29fa9","#7ac7bf","#f5dc1d","#eac6c6","#f4d1d7","#ffd9fa", "#e0d6ff","#d6f1ff","#a6cd96","#b9b9b9"];
// for (let i = 0; i < 56; i++) {
//     COLORS.push(rndColor());
// }


const CustomTooltip = ({ active, payload, label }) => {

    //console.log("payload " + JSON.stringify(payload));
    console.log("label " + label);

    if (active) {
        return (
            <div className="custom-tooltip">
                <p className="label">{payload[0].name + ": "}</p>
                <p className="value">{payload[0].value}</p>
                <p className="ratio">{payload[0].payload.ratio}</p>
            </div>
        );
    }

    return null;
};

//entry 默认是data props得到的data
const renderLabel = (entry) => {
    return entry.name;
}

const MostTestPositiveStates = ({ rawData }) => {

    //console.log("rawData   " + rawData);

        const totalPositive =rawData && rawData.reduce((a, b) => a + b.positive, 0);

        const formattedData = rawData && rawData.map(datum => ({
            name: datum.state,
            value: datum.positive,
            ratio: ((datum.positive / totalPositive) * 100).toFixed(0) + "%"
        })
        )

        const sortedData = formattedData && formattedData.sort((ac, cur) => { return cur.value - ac.value });


        //console.log("sortedData: " + JSON.stringify(sortedData));

        let mainSectors = sortedData && sortedData.slice(0, 11);
        let restSectors = sortedData && sortedData.slice(11, sortedData.length - 11);

        //console.log("mainSectors: " + JSON.stringify(mainSectors));
        //console.log("restSectors: " + JSON.stringify(restSectors));

        const restPositive = restSectors && restSectors.reduce((ac, cur) => ac + cur.value, 0)
        //console.log("restPositive: " + restPositive);

        mainSectors && mainSectors.splice(mainSectors.length, 0, {
            name: "OTHERS",
            value: restPositive,
            ratio: (restPositive / totalPositive * 100).toFixed(0) + "%"
        })
        console.log("mainSectors after: " + JSON.stringify(mainSectors));

return (
    <>
        {mainSectors &&
            <Card>
                <CardHeader
                    title="Top 10 States with most Test Positive Cases"
                />
                <Divider />
                <CardContent>
                    <PieChart width={800} height={400}>
                        <Pie
                            data={mainSectors}
                            dataKey="value"
                            cx="30%"
                            cy="50%"
                            outerRadius={120}
                            fill="#8884d8"
                            label={renderLabel}
                        >
                            {
                                mainSectors.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                            }
                        </Pie>
                        <Legend verticalAlign="bottom" width={400} />
                        <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                </CardContent>
            </Card>
        }
    </>
);
}

export default MostTestPositiveStates;