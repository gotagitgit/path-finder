import React from 'react';
import { Matrix } from './Matrix';
import { AppContextProvider } from './RootContext';

function App() {
  return (
    <AppContextProvider>
      <Matrix />
    </AppContextProvider>
  );
}

export default App;
