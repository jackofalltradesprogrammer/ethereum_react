import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from '../routes'; // Link is used to create anchor tags for navigation

export default () => { // we need to export this component to be used by Layout.js
    return (
        //  double curly braces are used to tell that its javascript code with object literal inside
        <Menu style={{ marginTop:  '10px'}}> 
            {/* a generic component that doesn't add anything of its own. It wraps its children with clickEvent handler to navigate */}
            <Link route="/">
                <a className="item">CrowdCoin</a>
            </Link>
            {/* // the right side of the header */}
            <Menu.Menu position="right">
                <Link route="/">
                    <a className="item">Campaigns</a>
                </Link>
                <Link route="/campaigns/new">
                    <a className="item">+</a>
                </Link>
            </Menu.Menu>
        </Menu>
    );
}