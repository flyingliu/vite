class MyComponent extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {

    this.shadow.innerHTML = /*san*/`
      <p>Hello from a web component!<slot></slot></p>
      
      <todo-input></todo-input>
      <style>
        p {
          color: pink;
          font-weight: bold;
          padding: 1rem;
          border: 4px solid pink;
        }
      </style>
    `;
  }
}

customElements.define("my-component", new MyComponent);