import React from 'react';
import StepperView from './Views/Stepper'
import { ThemeProvider } from '@material-ui/styles';
import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';
import { SnackbarProvider } from 'notistack';

import theme from './theme'
import './App.css';

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });


function App() {
  return (
    <div className="App" >
      <StylesProvider jss={jss}>
        <ThemeProvider theme={theme}>
          <SnackbarProvider maxSnack={3}>
            <StepperView />
          </SnackbarProvider>
        </ThemeProvider>
      </StylesProvider>
    </div>
  );
}

export default App;
