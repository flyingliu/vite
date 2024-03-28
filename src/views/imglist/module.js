
  // 定义<zxx-info>
  class HTMLZxxInfoElement extends HTMLElement {
    constructor () {
      super();
      this.shadow = this.attachShadow({ mode: "open" });
      // 内部显示信息   
      this.shadow.innerHTML = `
  <div class="scope">
    <img src="/images/cat.png">
    <p>帅哥一枚！</p>
  </div>
  <style>
    .scope {
      contain: content;
    }

    .scope>img {
      float: left;
      margin-right: 10px;
    }

    .scope>p {
      margin: 0;
      overflow: hidden;
    }
    .scope>img {
      box-shadow: 3px solid #ccc;
    }
  </style>`
    }
  };
  // 注册
  customElements.define('zxx-info', HTMLZxxInfoElement);
