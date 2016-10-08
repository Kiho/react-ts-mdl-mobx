import Server from './server'

export default (state) => {
    return {
        server: new Server(state)
    }
}
