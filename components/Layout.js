// This component will be the root component of all our components in the web applicaiton
import React from 'react';
import { Container } from 'semantic-ui-react'; // this is used to maximize the width of the page
import Header from './Header';

export default (props) => { // our functional components get called with props arguments
  return  (
    <Container>
        <Header/>
        {/* All the JSX passes between <Layout></Layout> will be passed as children  */}
        {props.children}    
        <h1>Im a footer</h1>
    </Container>
  );
};