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

    // 渲染阶段
    componentWillMount() {
        console.log("组件将要挂载")
    }
    componentDidMount() {
        console.log("组件挂载完成")
        console.log(document.getElementById("con"))
    }

    // 更新阶段
    componentWillReciveProps(props) {
        console.log("将要接收props:" ,props)
    }
    shouldComponentUpdate(props) {
        console.log("组将将要更新")
    }
    componentWillUpdate(props) {
        console.log("组将将要更新")
    }
    componentDidUpdate(props) {
        console.log("组件已经更新")
    }

    // 组件卸载
    compoenntWillUnmount() {
        console.log("组件即将卸载")
    }
    render() {
        //console.log(this.props)
        return (
            <div title={this.props.title} style={{ background: "red" }}>
                <h3 id={"con"} className="title">hello</h3>
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