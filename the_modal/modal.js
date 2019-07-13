class Modal extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = `
            <style>
                #backdrop {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100vh;
                    background: rgba(0, 0, 0, 0.75);
                }
            </style>
            <div id="backdrop"></div>
            <div id="modal"></div>
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