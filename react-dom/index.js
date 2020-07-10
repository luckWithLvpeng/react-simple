import Component from './component'
const ReactDOM = {
    render
}

function render(vnode, container) {
    container.appendChild(_render(vnode))
}
function createComponent(comp, props) {
    var instance = null;
    if (comp.prototype && comp.prototype.render) {
        instance = new comp(props)
    } else {
        instance = new Component(props)
        instance.constructor = comp
        instance.render = function() {
            return this.constructor()
        }
    }
    return instance
}

function renderComponent(comp){
    comp.base = _render(comp.render())
}
function _render(vnode) {
    console.log(vnode)
    // 没传
    if (vnode === undefined || vnode === null || typeof vnode === "boolean") return null;

    // vnode 是字符串
    if (typeof vnode === "string") {
        return document.createTextNode(vnode)
    }

    // vnode 是虚拟dom
    const {tag, attrs} = vnode;
    if (typeof tag === "function") {
        var component = createComponent(tag, attrs)
        renderComponent(component)
        console.log(component.base)
        // vnode.childrens.forEach(child => {
        //     render(child, component.base)
        // }) 
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
    vnode.childrens.forEach(child => {
        render(child, dom)
    })
    return dom
    
}

function setAttribute(dom,key, value) {
    // className 转换 class
    if (key === "className") {
        key = "class"
    }
    // 处理 事件
    if(/on\w+/.test(key)) {
        key = key.toLowerCase()
        dom.addEventListener(key.replace("on", ""), value)
    } else if (key === "style" ) { // 处理 style
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