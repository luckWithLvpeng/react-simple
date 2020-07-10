import React from './react'

import ReactDOM from './react-dom'
const ele = (
    <div title="你好" style={{background: "red", height: 30}}>
        <h3 className="title"> hello 
            <span onClick={() => console.log(1111)}>
                react
            </span> 
        </h3>
    </div>
)

ReactDOM.render(ele,document.querySelector("#root"))