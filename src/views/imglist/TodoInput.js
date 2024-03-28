// TodoInput.js


class TodoInput extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadow.innerHTML = `
      <form>
        <input name="text" type="text" placeholder="What needs to be done?" />
      </form>
    `;

    this.shadow.querySelector("form").addEventListener("submit", evt => {
      evt.preventDefault();
      const data = new FormData(evt.target);

      this.dispatchEvent(new CustomEvent("add", { detail: data.get("text") }));
      evt.target.reset();
    });
  }
}

customElements.define("todo-input", TodoInput);