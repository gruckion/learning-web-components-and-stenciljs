class Modal extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = `
            <style>
            </style>
        `;
    }

    connectedCallback() {
        this._render();
    }

    disconnectedCallback() {

    }

    attributeChangedCallback(name, newValue, oldValue) {

    }

    static get observedAttribute() {
        return [];
    }

    _render() {

    }
}
customElements.define("sr-modal", Modal);