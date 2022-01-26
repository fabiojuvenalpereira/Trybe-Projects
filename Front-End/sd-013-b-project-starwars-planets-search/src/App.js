import React from 'react';
import './App.css';

import Provider from './context/Provider';
import Table from './components/Table';
import FormSearch from './components/FormSearch';

function App() {
  return (
    <Provider>
      <FormSearch />
      <Table />
    </Provider>
  );
}

export default App;
