import React from 'react';
import {
    Grid,
    Container,
    Typography,
} from '@material-ui/core';


const TheHeader = ({ data }) => {

    const currentDate = data && data[0].dateChecked.slice(0, 10);

    return (

        <Typography
            style={{ color: "white" }}
        >
            {data &&
                <>
                    <h2>COVID-19 Data Visualization Board</h2>
                    <p><tr>UPDATE AT: {currentDate} </tr></p>
                    <p><tr>SOURCE: covidtracking.com </tr></p>
                </>
            }
        </Typography>)
}

export default TheHeader;