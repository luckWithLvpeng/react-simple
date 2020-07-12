import Component from '../react/component'


function render(vnode, container) {
    // 当组件是个数组的时候,会返回一个dom数组
    var node = _render(vnode, false)
    if (node.constructor === Array) {
        // 渲染dom 数组时
        node.forEach(node => container.appendChild(node))
    } else if (node.constructor === vnode.tag) {
        // 此时node是一个组件 ,不是dom节点
        // 调用组件的生命周期
        container.appendChild(node.base)
        //因为 appendChild 浏览器是进行异步渲染的, 
        //根据js的单线程时间循环机制, 用setTimeout可以把回调事件排到渲染渲染操作的后面, 应该可以解决
        //但是我觉得这并不是可靠的解决方案
        setTimeout(() => {
            if (node.componentDidMount) {
                // 只执行一次
                node.componentDidMount()
                node.componentDidMount = null
            }
        }, 0);
    } else {
        container.appendChild(node)
    }
}

function update(comp, container) {
    // 要更新的组件和父节点
    if (comp.shouldComponentUpdate && comp.shouldComponentUpdate() === false) {
        return
    }
    if (comp.componentWillUpdate) {
        comp.componentWillUpdate()
    }
    var vnode = comp.render()
    var oldBase = comp.base
    comp.base = _render(vnode, true)
    if (container.hasChildNodes() && oldBase) {
        container.replaceChild(comp.base, oldBase)
    } else {
        container.appendChild(comp.base)
    }
    // 调用更新完成的生命周期
    setTimeout(() => {
        comp.componentDidUpdate && comp.componentDidUpdate()
    }, 0)
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
function _render(vnode, isUpdate) {
    // 没传
    if (vnode === undefined || vnode === null || typeof vnode === "boolean") return document.createTextNode("");

    // vnode 是字符串
    if (typeof vnode === "string" || typeof vnode === "number") {
        return document.createTextNode(vnode.toString())
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
            if (isUpdate && typeof child.tag === "function") {
                var comp = createComponent(child.tag, child.attrs)
                update(comp, dom)
            } else {
                render(child, dom)
            }
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
export default {
    render,
    renderComponent,
    update,
}