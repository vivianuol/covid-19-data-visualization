import React, { useState } from 'react';
import Link from 'next/link';

import {
  Card,
  CardHeader,
  CardContent,
  Divider, 
  Typography
} from '@material-ui/core';



export default function SimpleSelect( ) {

  const [stateCurrent, setStateCurrent] = useState('United States');

  const statesArr = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY', 'PR', 'GU', 'VI', 'United States'];


  return (
    <Card>
      <CardHeader title={'Current: ' + stateCurrent } />
      <Divider />
      <CardContent>
          <Typography variant="h5" component="h2">
           Jump to:
          </Typography>
          <div style={{ display: 'flex', flexWrap: 'wrap', fontFamily: '"Open Sans", verdana, arial, sans-serif' }}>
          {
            statesArr.map((state, i) =>
              <span key={i} style={{ margin: '10px', display: 'flexbox' }}>
                {
                  state == stateCurrent ?
                    <div>{state}</div> :
                    <Link href={`/dashboard?state=${state}`}>
                      <a onClick={() => {
                        let selection;
                        (state == 'United States') ? selection = 'United States' : selection = state;
                        setStateCurrent(selection);
                       
                      }}>

                        {state}
                      </a>
                    </Link>
                }
              </span>
            )}
          </div>
      </CardContent>
    </Card>
  );
}