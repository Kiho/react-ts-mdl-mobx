import * as React from 'react';

import { Spacer, Navigation, Icon } from '../../components';
// Router
import { Router, Link, IndexLink } from "react-router";

const NavIcon = (props: {name: string})=> {
    return <Icon className="mdl-color-text--blue-grey-400" name={props.name} />
}

export default React.createClass({
    render: function () {
        return (
            <Navigation className="demo-navigation mdl-color--blue-grey-800">
                <IndexLink to="home"><NavIcon name="format_size" />Home</IndexLink>
                <Link to="project"><NavIcon name="settings" />Project</Link>
                <Link to="about"><NavIcon name="account_box" />About</Link>

                <Spacer />
                <a>
                    <NavIcon name="help_outline" />
                    <span className="visuallyhidden">Help</span>
                </a>
            </Navigation>
        );
    }
})
