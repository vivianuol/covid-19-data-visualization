import React, { useState } from 'react';

import {
  Card,
  CardHeader,
  CardContent,
  Divider
} from '@material-ui/core';



export default function SimpleSelect({selectState}) {

    const [stateCurrent, setStateCurrent] = useState('');

    const statesArr = ['AL','AK','AZ','AR','CA','CO','CT','DE','DC','FL','GA','GU','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PW','PA','PR','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY','United States'];


    return (
        <Card>
          <CardHeader title={'Jump to: '+ stateCurrent }  />
            <Divider />
            <CardContent>
              <p style={{display:'flex', flexWrap: 'wrap'}}>
              { 
                statesArr.map( (state, i) =>
                <span key={i} style={{margin: '10px', display: 'flexbox'}}>
                { 
                  state == stateCurrent? 
                  <div>{state}</div> : <a href="#" onClick={()=> 
                    {
                  let selection;
                  (state == 'United States')? selection= '': selection= state;
                  setStateCurrent(selection);
                  return selectState(selection) 
                }
              }>{state}
              </a>}
              </span>
                )}
                </p>
            </CardContent>
        </Card>
      );
    }