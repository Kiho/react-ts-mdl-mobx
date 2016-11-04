import { createNew } from './model';
import { observable, asFlat, isObservableArray, isObservableMap, isObservableObject, toJS } from 'mobx';

// Default state structure
// Everything that defines our application and that could be
// shared between components should be declared here.
const defaultState = observable({

    app: {
        title: 'React MDL MobX',
        statusCode: 200,
        hostname: 'localhost'
    },

    account: {},

    project: {
        loading: false,
        error: null,
        data: null,
        item: createNew('project')
    }
})

// Export function that creates our client state
export function createClientState() {
    return defaultState;
}
