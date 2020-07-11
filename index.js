import React from './react'

import ReactDOM from './react-dom'
const ele = (
    <div title="你好" style={{ background: "red", height: 30 }}>
        <h3 className="title"> hello
        </h3>
    </div>
)
function Layout(props) {
    return ele
}
class Ele extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        //console.log(this.props)
        return (
            <div title={this.props.title} style={{ background: "red" }}>
                <h3 className="title">hello</h3>
            </div>
        )
    }
}

// ReactDOM.render(ele,document.querySelector("#root"))
//ReactDOM.render(<Layout title="hello" />,document.querySelector("#root"))
ReactDOM.render(<div>
    <Ele title="hellofff">
        <div>
            哈哈
        </div>
        <div>
            哈2
        </div>
        <div>
            哈3
        </div>
    </Ele>
</div>, document.querySelector("#root"))