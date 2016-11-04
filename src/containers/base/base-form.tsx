import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import Error from '../app/error'
import Server from '../../actions/server'
import { hashHistory } from 'react-router';

import { IEntity, EntityType, createNew } from '../../model';

// define interfaces for mobx operations and method definitions for API calls
interface IFormProps {
    // mobx actions
    actions: any;
    // mobx state
    state: any;
    // type of entity
    entityType: EntityType;
    // model object
    item: Object;
    // API call: get object from server
    getById: (entity: EntityType, id: string) => void;
    // API call: post object to server
    post: (entity: EntityType, data) => void;
    // routing parameter passed from react-router
    params: { id: string };
}

/*
 * Base form to handle CRUD form events for derived form classes.
 * The base form handles CRUD functionality 
 * (it's the "Controller" in "MVC", while derived classes 
 * arrange the presentational elements (the "View" in "MVC")
 * The "Model" is the item/entity, with entityType supplying model metadata).
 *
 *    TODO: Implement deletion
 */
export abstract class BaseForm extends React.Component<IFormProps, any>{
    // object reference for communicating with server
    _server: Server;
    // object reference to hold form object
    _form: HTMLFormElement;
    // object reference to mobx observable
    _entity: IEntity;
    // flag to show busy state during server call
    _loading = true;

    constructor(props: IFormProps, public entityType: EntityType) {
        super(props);

        this.submitRequest = this.submitRequest.bind(this);
        this.afterSubmit = this.afterSubmit.bind(this);
        this.init = this.init.bind(this);

        this.init();
    }

    // update class level variables from props for convenience
    init() {
        const { state, actions } = this.props;
        this._server = actions.server;
        this._entity = state[this.entityType]
        this._loading = this._entity ? this._entity.loading : true;
    }

    // called after get object through mobx when data arrived from server, then it will update form
    get item() {
        this.init();
        return this._entity.item;
    }

    // read & write object property when value changes from text input.
    handleChange = (key) => ({
        value: this.item[key],
        onChange: e => this.item[key] = e.target.value,
        // this flag is used for the MDL component, to reset error after initialized as empty
        loading: this._loading
    })

    // React lifecycle callback
    componentDidMount() {
        // we need to set reference to form after component was mounted
        this._form = ReactDOM.findDOMNode(this).querySelector('form') as HTMLFormElement;
        // call server with id passed from router.
        this.getItem(this.props.params.id);
    }

    // React lifecycle callback
    componentDidUpdate(prevProps) {
        // handle subsequent routing after form is mounted.
        this.getItem(this.props.params.id, prevProps.params.id);
    }

    getItem(id, prevId?) {
        // we need to reload the form only if the id is different from the previous state
        if (prevId != id) {
            if (id > 0) {
                this._server.getById(this.entityType, id);
            }
            else {
                this._entity.item = createNew(this.entityType);
            }
        }
    }

    validateForm(form) {
        // check validity of all inputs
        const isValid = form.checkValidity();
        if (!isValid) {
            for (let i = 0; i < form.length; i++) {
                if (form[i].field) {
                    // need to call checkValidity method of all MDL input fields to refresh visual input state
                    form[i].field.checkValidity();
                }
            }
        }
        return isValid;
    }

    // push object changes to server
    submitRequest(e) {
        e.preventDefault();
        if (!this.validateForm(this._form)) {
            console.log("Form is not valid", this.item);
            return;
        }
        console.log("Here's the stuff you put in", this.item);
        // const callback = (id) => { hashHistory.push('/' + this.entityType + '/' + id) }
        // set callback to perform action after success of posting
        const callback = this.afterSubmit;
        this._server.post(this.entityType, this.item, callback);
    }

    afterSubmit() {
        // in this case we go back to list page
        hashHistory.push('/' + this.entityType);
    }

    // go back to previous page with recact router call
    goBack(e) {
        e.preventDefault();
        hashHistory.goBack();
    }
}

