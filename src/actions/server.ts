import * as Api from '../api/server/';
import * as model from '../model';

export default class Server {
    constructor(public state) {
        this.state = state
    }

    execute(promise, path) {
        const state = this.state[path]
        state.loading = true;
        state.error = null;
        promise().catch(error => {
            state.error = error.message;
        }).then(() => {
            state.loading = false;
        });
    }

    getById(path, id) {
        return this.execute(() => Api.getById(path, id)
            .then((res) => {
                this.state[path].item = res;
            }), path);
    }

    getList(path) {
        return this.execute(() => Api.getList(path, null)
            .then((res) => {
                this.state.project.data = res;
            }), path);
    }

    post(path, item, callback: (id?) => void) {
        return this.execute(() => Api.post(path, item)
            .then((res: any) => {
                console.log('POST', res);
                if (res.key && res.key > 0) {
                    callback(res.key);
                }
                else {
                    callback();
                }
            }), path);
    }
}