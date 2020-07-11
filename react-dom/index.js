import Component from '../react/component'
const ReactDOM = {
    render
}

function render(vnode, container) {
    // 当组件是个数组的时候,会返回一个dom数组
    var node = _render(vnode)
    if (node.constructor === Array) {
        // 渲染dom 数组时
        node.forEach(node => container.appendChild(node))
    } else if (node.constructor === vnode.tag) {
        // 此时node是一个组件 ,不是dom节点
        // 调用组件的生命周期
        container.appendChild(node.base)
        //因为 appendChild 浏览器是进行异步渲染的, 
        //根据js的单线程时间循环机制, 用setTimeout可以把回调事件排到渲染操作的后面,理论上可以解决
        //但是我觉得这并不是可靠的解决方案
        setTimeout(() => {
            if (node.componentDidMount) {
                node.componentDidMount()
                node.componentDidMount = null
            } else {
                node.componentDidUpdate && node.componentDidUpdate()
            }
        }, 0);
    } else {
        container.appendChild(node)
    }
}
function createComponent(comp, props) {
    var instance = null;
    if (comp.prototype && comp.prototype.render) {
        instance = new comp(props)
    } else {
        instance = new Component(props)
        instance.props = props
        instance.constructor = comp
        instance.render = function () {
            return this.constructor(props)
        }
    }
    return instance
}
function setComponentProps(comp, props, children) {
    if (!comp.base) {
        comp.componentWillMount && comp.componentWillMount(props)
    } else {
        comp.componentWillReciveProps && comp.componentWillReciveProps(props)
    }
    comp.props = props
    comp.props.children = children
    renderComponent(comp)
}
function renderComponent(comp) {
    if (comp.base) {
        comp.componentWillUpdate && comp.componentWillUpdate()
    }
    var base = _render(comp.render())
    comp.base = base
}
function _render(vnode) {
    // 没传
    if (vnode === undefined || vnode === null || typeof vnode === "boolean") return document.createTextNode("");

    // vnode 是字符串
    if (typeof vnode === "string") {
        return document.createTextNode(vnode)
    }
    // 渲染数组组件
    if (vnode.constructor === Array) {
        var nodes = []
        vnode.forEach(child => {
            nodes.push(_render(child))
        })
        return nodes
    }
    // vnode 是虚拟dom
    const { tag, attrs, children } = vnode;
    if (typeof tag === "function") {
        var component = createComponent(tag, attrs)
        setComponentProps(component, attrs, children)
        return component
    }
    const dom = document.createElement(tag);
    if (attrs) {
        Object.keys(attrs).forEach(key => {
            const value = attrs[key]
            // 设置属性
            setAttribute(dom, key, value)
        })
    }
    if (vnode.children) {
        vnode.children.forEach(child => {
            render(child, dom)
        })
    }
    return dom

}

function setAttribute(dom, key, value) {
    // className 转换 class
    if (key === "className") {
        key = "class"
    }
    // 处理 事件
    if (/on\w+/.test(key)) {
        key = key.toLowerCase()
        dom.addEventListener(key.replace("on", ""), value)
    } else if (key === "style") { // 处理 style
        if (!value || typeof value === "string") {
            dom.style.cssText = value || ""
        } else if (value && typeof value === "object") {
            for (let k in value) {
                if (typeof value[k] === 'number') {
                    dom.style[k] = value[k] + "px"
                } else {
                    dom.style[k] = value[k]
                }
            }
        }
    } else {
        if (key in dom) {
            dom[key] = value || ""
        }
        if (value) {
            dom.setAttribute(key, value)
        } else {
            dom.removeAttribute(key)
        }
    }

}
export default ReactDOM