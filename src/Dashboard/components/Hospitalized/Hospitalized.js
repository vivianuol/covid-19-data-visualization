import React, { useEffect, useRef } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';
import HotelOutlinedIcon from '@material-ui/icons/HotelOutlined';
import * as d3 from 'd3';
import { json } from 'd3-fetch';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  content: {
    alignItems: 'center',
    display: 'flex'
  },
  title: {
    fontWeight: 700
  },
  avatar: {
    backgroundColor: theme.palette.success.main,
    height: 56,
    width: 56
  },
  icon: {
    height: 32,
    width: 32
  },
  difference: {
    marginTop: theme.spacing(2),
    display: 'flex',
    alignItems: 'center'
  },
  differenceIcon: {
    color: theme.palette.success.dark
  },
  differenceValue: {
    color: theme.palette.success.dark,
    marginRight: theme.spacing(1)
  }
}));

const Hospitalized = props => {
  const { className, data, ...rest } = props;

  const classes = useStyles();
  const hospRef = useRef(null);
  const rateRef = useRef(null);

  useEffect(() => {
    console.log("++++data in hospitalized: " + JSON.stringify(data))
    if (data !== null) {
      d3.select(rateRef.current).selectAll('p').text('');


      var hospToday = data[0].hospitalized == null ? 0 : data[0].hospitalized;
      var posToday = data[0].positive == null ? 1 : data[0].positive;

      var hosRate = Math.round((hospToday / posToday) * 100) + "%";

      d3.select(hospRef.current)
          .text(hospToday)

      d3.select(rateRef.current)
          .text(hosRate + "(hospitality rate)")
    }
  },[data])

  return (
      <Card
          {...rest}
          className={clsx(classes.root, className)}
      >
        <CardContent>
          <Grid
              container
              justify="space-between"
          >
            <Grid item>
              <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                  variant="body1"
              >
                Hospitalized
              </Typography>
              <Typography
                  variant="h3"
                  ref= {hospRef}>
              </Typography>
            </Grid>
            <Grid item>
              <Avatar className={classes.avatar}>
                <HotelOutlinedIcon className={classes.icon} />
              </Avatar>
            </Grid>
          </Grid>
          <div className={classes.difference}>
            <Typography
                className={classes.differenceValue}
                variant="h4"
                ref={rateRef}
            >
            </Typography>
            <Typography
                className={classes.caption}
                variant="caption"
            >
              Since yesterday
            </Typography>
          </div>
        </CardContent>
      </Card>
  );
};

Hospitalized.propTypes = {
  className: PropTypes.string
};

export default Hospitalized;
