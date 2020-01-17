import React from 'react';
import {StatusBar} from 'react-native';

//Importar as rotas
import Routes from './src/routes'

export default function App() {
  //Nesse return estilizamos a status Bar e chamamos o arquivo routes.
  return (
    <>
      <StatusBar  barStyle='light-content' backgroundColor='#7D40E7'/>
      <Routes />
    </>
  );
}

