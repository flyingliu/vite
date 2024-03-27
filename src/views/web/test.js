// 子组件（my-element.js）:
// class MyElement extends HTMLElement {
//   // 当你想传递数据给父组件时调用此方法
//   sendDataToParent(data) {
//     // 创建一个自定义事件并设置数据
//     const customEvent = new CustomEvent('data-to-parent', { detail: data });
//     // 触发自定义事件
//     this.dispatchEvent(customEvent);
//   }
// }
 

// customElements.define('my-element', MyElement);


// 父组件（index.html）:
// <my-element id="myElement"></my-element>
// <script>
//   const myElement = document.getElementById('myElement');
 
//   // 监听子组件触发的自定义事件
//   myElement.addEventListener('data-to-parent', (event) => {
//     // 处理接收到的数据
//     console.log(event.detail);
//   });
 
//   // 假设有一个函数触发数据发送
//   function sendDataToChild() {
//     const data = { message: 'Hello from the parent!' };
//     myElement.sendDataToParent(data);
//   }
// </script>