import * as React from 'react';
import { IEntity, EntityType } from '../../model';
import { Button, Textfield, Grid, Cell, Spinner } from '../../components';
import Error from '../app/error';
import { BaseForm } from '../base/base-form';
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import { hashHistory, Link } from 'react-router';

// we will initialize base form with given entity type.
const entityType: EntityType = 'project';

// attribute to receive state & actions from mobx (creates a decorator)
@observer(['state', 'actions'])
class ProjectForm extends BaseForm {
    /* note that the derived class ProjectForm contains all presentational ("view") elements,
     *  while the BaseForm handles all CRUD functionality,
     *  cleanly separating "View" from "Controller"
     */

    constructor(props) {
        super(props, entityType);
    }

    render() {
        const project = this._entity;
        return (
            <div className="mdl-cell mdl-cell--9-col mdl-cell--12-col-tablet mdl-cell--12-col-phone no-p-l">
                <form className="form">
                    <h3>Project Info</h3>
                    <Grid>
                        <Cell col={6}>
                            <Textfield
                                label="Project#"
                                required={true}
                                {...this.handleChange("projectNo") }
                                floatingLabel={true} />
                        </Cell>
                        <Cell col={6}>
                            <Textfield
                                label="Project Name"
                                required={true}
                                {...this.handleChange("projectName") }
                                floatingLabel={true} />
                        </Cell>
                    </Grid>
                    <Grid>
                        <Cell col={6}>
                            <Textfield
                                label="Location"
                                {...this.handleChange("projectLocation") }
                                floatingLabel={true} />
                        </Cell>
                        <Cell col={6}>
                            <Textfield
                                label="Amount"
                                pattern="-?[0-9]*(\.[0-9]+)?"
                                error="Input is not a number!"
                                {...this.handleChange("contractAmount") }
                                floatingLabel={true} />
                        </Cell>
                    </Grid>
                    { project.error && <Error text={project.error}/> }
                    <Grid className="formfoot">
                        <Cell col={2}>
                            <Button raised={true} colored={true} onClick={this.submitRequest}>Submit</Button>
                        </Cell>
                        <Cell col={2}>
                            <Button raised={true} colored={false} onClick={this.goBack}>Back</Button>
                        </Cell>
                        <Cell col={8}>
                            <Spinner isActive={this._loading}/>
                        </Cell>
                    </Grid>
                </form>
            </div>
        )
    }
}

export default ProjectForm;
