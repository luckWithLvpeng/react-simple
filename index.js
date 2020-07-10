import React from './react'

import ReactDOM from './react-dom'
const ele = (
    <div title="你好" style={{ background: "red", height: 30 }}>
        <h3 className="title"> hello
        </h3>
    </div>
)

function Layout() {
    return ele
}
class Ele {
    constructor(props) {
        this.props = props
    }
    render() {
        return (
            <div title={this.props.title} style={{ background: "red", height: 30 }}>
                <h3 className="title"> hello</h3>
            </div>
        )
    }
}

// ReactDOM.render(ele,document.querySelector("#root"))
//ReactDOM.render(<Layout title="hello" />,document.querySelector("#root"))
ReactDOM.render(<Ele title="hellofff" />, document.querySelector("#root"))