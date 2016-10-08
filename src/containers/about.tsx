import * as React from 'react';
import { observer } from 'mobx-react';

@observer(['state','actions'])
class About extends React.Component<any, any> {
    render() {
        return <main>
            <h1>react-ts-mdl-mobx</h1>
            <section className="account">
                <p>                    
                </p>
                <p>
                    React, TypeScript, Matarial-Design-Lite, Mobx CRUD
                </p>
                <p>
                    <a href="https://github.com/kiho/react-ts-mdl-mobx" target="_blank">
                        https://github.com/kiho/react-ts-mdl-mobx
                    </a>
                </p>
            </section>
        </main>
    }
}

export default About
