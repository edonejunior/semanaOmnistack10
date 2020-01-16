import React from 'react';
import {StatusBar} from 'react-native';

//Importar as rotas
import Routes from './src/routes'

export default function App() {
  return (
    <>
      <StatusBar  barStyle='light-content'/>
      <Routes />
    </>
  );
}

