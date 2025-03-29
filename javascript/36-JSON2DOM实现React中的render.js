// {
//     tag: 'DIV',
//     attrs:{
//     id:'app'
//     },
//     children: [
//       {
//         tag: 'SPAN',
//         children: [
//           { tag: 'A', children: [] }
//         ]
//       },
//       {
//         tag: 'SPAN',
//         children: [
//           { tag: 'A', children: [] },
//           { tag: 'A', children: [] }
//         ]
//       }
//     ]
//   }
//   把上诉虚拟Dom转化成下方真实Dom
//   <div id="app">
//     <span>
//       <a>1</a>
//     </span>
//     <span>
//       <a>2</a>
//       <a>3</a>
//     </span>
//   </div>

function _render(vnode) {
    if (typeof vnode === 'number') {
        vnode = String(vnode)
    }
    if (typeof vnode === 'string') {
        return document.createTextNode(vnode)
    }
    const dom = document.createElement(vnode.tag)
    if (vnode.attrs) {
        for (let attr in vnode.attrs) {
            dom.setAttribute(attr, vnode.attrs[attr])
        }
    }

    if (dom.children) {
        dom.children.forEach((child) => dom.appendChild(_render(child)))
    }

    return dom
}