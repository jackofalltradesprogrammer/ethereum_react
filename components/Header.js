import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from '../routes'; // Link is used to create anchor tags for navigation

export default () => { // we need to export this component to be used by Layout.js
    return (
        //  double curly braces are used to tell that its javascript code with object literal inside
        <Menu style={{ marginTop:  '10px'}}> 
            {/* a generic component that doesn't add anything of its own. It wraps its children with clickEvent handler to navigate
                <a> tags are used to get Semantic UI to display some css */}
            <Link route="/">
                <a className="item">CSCI 699</a>
            </Link>
            {/* // the right side of the header */}
            <Menu.Menu position="right">
                <Link route="/">
                    <a className="item">Contracts</a>
                </Link>
                <Link route="/contracts/new">
                    <a className="item">+</a>
                </Link>
            </Menu.Menu>
        </Menu>
    );
}