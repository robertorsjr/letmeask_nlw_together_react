import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import {Styles as GlobalStyle} from './resources'
import Routes from './routes'
import {AuthContextProvider} from "./contexts/AuthContext";

function App() {

    return (
        <BrowserRouter>
            <AuthContextProvider>
                <Routes/>
            </AuthContextProvider>
            <GlobalStyle/>
        </BrowserRouter>
    );
}

export default App;
