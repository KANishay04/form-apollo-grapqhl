// src/App.js
import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import RegistrationForm from './components/RegistrationForm';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql', 
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <RegistrationForm />
      </div>
    </ApolloProvider>
  );
};

export default App;
