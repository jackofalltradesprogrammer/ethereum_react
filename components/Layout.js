// This component will be the root component of all our components in the web applicaiton
import React from 'react';
import { Container } from 'semantic-ui-react'; // this is used to maximize the width of the page
import Head from 'next/head'; // Head component to manipulate <head> of html page
import Header from './Header';

export default (props) => { // our functional components get called with props arguments
  return  (
    <Container>
        <Head>
          <link
            rel="stylesheet"
            href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.1/dist/semantic.min.css"
          />
        </Head>
        <Header/>
        {/* All the JSX passes between <Layout></Layout> will be passed as children  */}
        {props.children}    
    </Container>
  );
};