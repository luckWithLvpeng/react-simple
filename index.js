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
        this.state = {
            num: 1
        }
    }
    // 渲染阶段
    componentWillMount() {
        console.log("组件将要挂载")
    }
    componentDidMount() {
        console.log("组件挂载完成")
    }
    // 更新阶段
    componentWillReciveProps(props) {
        console.log("将要接收props:" ,props)
    }
    shouldComponentUpdate(props) {
        console.log("组将是否更新")
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
                <Display num={this.state.num}></Display>
                <button onClick={()=> this.setState({num: this.state.num +5})}>自增</button>
            </div>
        )
    }
}
class Display extends React.Component {
     // 渲染阶段
    componentWillMount() {
        console.log("子组件将要挂载")
    }
    componentDidMount() {
        console.log("子组件挂载完成")
    }
    shouldComponentUpdate(props) {
        console.log("子组将是否更新")
    }
    componentWillUpdate(props) {
        console.log("子组将将要更新")
    }
    componentDidUpdate(props) {
        console.log("子组件已经更新")
    }
    render() {
        return (
            <div>{ this.props.num}</div>
        )
    }
}
function ChildComponent() {
    return (
        <div>
            <p> 哈哈</p>
            我是子组件
            <Display num={1000} />
        </div>
    )
}
function PureComponent() {
    return (
        <div>
            {/*<ChildComponent />*/}
            <ul>
                <li>1</li>
                <li>2</li>
                <li>3</li>
                <li>4</li>
            </ul>
        </div>
    )
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
    <PureComponent />
</div>, document.querySelector("#root"))