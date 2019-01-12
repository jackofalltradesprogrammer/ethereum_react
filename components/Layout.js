import React from 'react';
import Header from './Header';

export default (props) => { // our functional components get called with props arguments
  return  (
    <div>
        <Header/>
        {/* All the JSX passes between <Layout></Layout> will be passed as children  */}
        {props.children}    
        <h1>Im a footer</h1>
    </div>
  );
};