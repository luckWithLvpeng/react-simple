const ReactDOM = {
    render
}


function render(vnode, container) {
    // 没传
    if (vnode === undefined) return;

    // vnode 是字符串
    if (typeof vnode === "string") {
        const textnode = document.createTextNode(vnode)
        return container.appendChild(textnode)
    }

    // vnode 是虚拟dom
    console.log(vnode)
    const {tag, attrs} = vnode;
    const dom = document.createElement(tag);
    container.appendChild(dom)
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