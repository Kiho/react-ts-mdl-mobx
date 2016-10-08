import * as React from 'react';
import { EntityType } from '../../model';
import ProjectTable from './project-table';
import { observer } from 'mobx-react';
import { hashHistory } from 'react-router';

import { Button, Textfield, Grid, Cell, Spinner } from '../../components';

const entityType: EntityType = 'project';

@observer(['state', 'actions'])
class ProgectList extends React.Component<any, any>{

    componentDidMount() {
        const { server } = this.props.actions;

        server.getList(entityType);
    }

    addNew(e) {
        e.preventDefault();
        hashHistory.push('/' + entityType + '/0');
    }

    render() {
        const { state } = this.props;
        const project = state[entityType];
        const rows = project.data ? project.data : [];
        return (
            <div>
                <ProjectTable rows={rows}/>
                <Button raised={true} colored={true} onClick={this.addNew} >Add Project</Button>
            </div>
        )
    }
}

export default ProgectList;