import ReactDOM from '../react-dom/index'
class Component {
    constructor(props = {}) {
        this.props = props
        this.state = {}
    }
    setState(state) {
        this.state = Object.assign(this.state, state)
        var parentNode = this.base.parentNode
        ReactDOM.update(this,parentNode)
    }
}

export default Component