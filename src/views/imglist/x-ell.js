class HTMLEllElement extends HTMLElement {
    // 指定观察的属性，这样attributeChangedCallback才会起作用
    static get observedAttributes() {
        return ['rows', 'list']
    }

    constructor() {
        // constructor中首先第一件事情就是调用 super
        // super指代了整个prototype或者__proto__指向的对象
        // 这一步免不了的
        super()

        // 创建shadow元素，实际上，从本例要实现的效果讲，
        // 直接元素上设置也可以，就是HTML丑了点，CSS要放在外部
        // 且目前火狐并不支持shadow dom可以不用
        this.shadow = this.attachShadow({
            // open外部可访问（通过element.shadowRoot），closed则不能
            mode: 'open',
        })

        // 文本内容移动到shadow dom元素中
        // var div = document.createElement('div');
        // div.innerHTML = this.innerHTML;
        // this.innerHTML = '';
        // var style = document.createElement('style');
        // shadow.appendChild(style);
        // shadow.appendChild(div);
    }

    open() {
        console.log(this)
    }

    // 下面4个方法为常用生命周期
    connectedCallback() {
        // console.log('自定义元素加入页面', this._list)
        const $li = this._list
            .split(',')
            .map((li) => `<li class="item"><img src="${li}-small" alt="${li}" /></li>`)
            .join('')

        this.shadow.innerHTML = /*san*/ `
      <div class="imgbox">
        <div class="title"><slot></slot></div>
        <ul class="imgul" popovertarget="imgBook">${$li}</ul>
        <img id="imgBook" popover src="https://img.zdic.net/kai/cn/7ADE.svg" />
      </div>
      
      <style>
        .imgbox .title { font:bold 14px arial; padding: 10px 0;}
        .imgul, .imgul li { padding:0; margin: 0; list-style:none;}
        .imgul { display: flex; flex-flow: row wrap;}
        .imgul li {border:2px solid #fff;}
        .imgul li img { display:block; width:36px;height:36px; object-fit:cover} 
      </style>
    `
        this.shadow.querySelector('.imgul').addEventListener('click', (e) => {
            // evt.preventDefault();

            console.log(
                e.target.alt
            )
        })
        // 执行渲染更新
        this._updateRendering()
    }
    disconnectedCallback() {
        // 本例子该生命周期未使用，占位示意
        console.log('自定义元素从页面移除')
    }
    adoptedCallback() {
        // 本例子该生命周期未使用，占位示意
        console.log('自定义元素转移到新页面')
    }
    attributeChangedCallback(name, oldValue, newValue) {
        console.log('自定义元素属性发生变化')
        if (name === 'rows') {
            this._rows = newValue
            // 执行渲染更新
            this._updateRendering()
        } else if (name === 'list') {
            this._list = newValue
        }
    }

    get rows() {
        return this._rows
    }
    set rows(v) {
        this.setAttribute('rows', v)
    }
    get list() {
        return this._list
    }
    set list(v) {
        this.setAttribute('list', v)
    }

    _updateRendering() {
        // 根据变化的属性，改变组件的UI
        var shadow = this.shadowRoot
        var childNodes = shadow.childNodes
        var rows = this._rows
    }
}
// 定义x-ell标签元素为多行打点元素
customElements.define('x-ell', HTMLEllElement)
