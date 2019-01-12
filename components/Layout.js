import React from 'react';

export default (props) => { // our functional components get called with props arguments
  return  (
    <div>
        <h1>I'm a header</h1>
        {/* All the JSX passes between <Layout></Layout> will be passed as children  */}
        {props.children}    
        <h1>I'm a footer</h1>
    </div>
  );
};