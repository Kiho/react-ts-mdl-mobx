import * as React from 'react';
import * as Router from "react-router";
import * as ReactTransitionGroup from 'react-addons-css-transition-group';

import { observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools';

import { Layout, Drawer, Content, Textfield, Menu, MenuItem, IconButton } from '../components';
import Header from './app/header';
import HeaderAvatar from './app/header-avatar';
import Nav from './app/nav';

@observer(['state', 'actions'])
class App extends React.Component<any, any> {
    render() {
        const { children } = this.props;

        let content;
        // let content = isLoggedIn ? children : <LoginDialog />;
        content = (
            <Layout className="demo-layout" fixedHeader={true} fixedDrawer={true}>
                <Header />
                <Drawer className="demo-drawer mdl-color--blue-grey-900 mdl-color-text--blue-grey-50">
                    <HeaderAvatar />
                    <Nav />
                </Drawer>
                <Content className="mdl-color--grey-100">
                    <div className="mdl-grid demo-content">
                        {children}
                    </div>
                </Content>
                <DevTools />
            </Layout>
        );
        return <div>{content}</div>;
    }
}

export default App;