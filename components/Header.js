import React from 'react';
import { Menu } from 'semantic-ui-react';

export default () => { // we need to export this component to be used by Layout.js
    return (
        <Menu>
            <Menu.Item>
                CrowdCoin
            </Menu.Item>
            {/* // the right side of the header */}
            <Menu.Menu position="right">
                <Menu.Item>Campaigns</Menu.Item>

                <Menu.Item>+</Menu.Item>
            </Menu.Menu>
        </Menu>
    );
}