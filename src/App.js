
import React from 'react';
import Dashboard from './Dashboard/index'
import { ThemeProvider } from '@material-ui/styles';
import theme from './theme';

const App = () => {
      return (
        <ThemeProvider theme={theme}>
            <Dashboard/>
        </ThemeProvider>
      );
    }

export default App;