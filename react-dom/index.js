import Component from '../react/component'
const ReactDOM = {
    render
}

function render(vnode, container) {
    // 当组件是个数组的时候,会返回一个dom数组
    var nodes = _render(vnode)
    if (nodes.constructor === Array) {
        nodes.forEach(node => container.appendChild(node))
    } else {
        container.appendChild(nodes)
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

function renderComponent(comp) {
    comp.base = _render(comp.render())
}
function setComponentProps(comp, props, children) {
    comp.props = props
    comp.props.children = children
    renderComponent(comp)
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
        return component.base
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