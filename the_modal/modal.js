class Modal extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = `
            <style>
                .hidden {
                    opacity: 0;
                    pointer-events: none;
                }
                #backdrop {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100vh;
                    background: rgba(0, 0, 0, 0.75);
                    z-index: 10;
                }
                #modal {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    position: fixed;
                    top: 15vh;
                    left: 25%;
                    width: 50%;
                    z-index: 100;
                    background: white;
                    border-radius: 3px;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
                }
                #actions {
                    border-top: 1px solid #ccc;
                    padding: 1rem;
                    display: flex;
                    justify-content: flex-end;
                }
                header {
                    padding: 1rem;
                }
                header h1 {
                    font-size: 1.25rem;
                }
                #actions button {
                    margin: 0 0.25rem;
                }
                #main {
                    padding: 1rem;
                }
            </style>
            <div id="backdrop" class="hidden"></div>
            <div id="modal" class="hidden">
                <header>
                    <h1>Please confirm</h1>
                </header>
                <section id="main">
                    <slot></slot>
                </section>
                <section id="actions">
                    <button>Cancel</button>
                    <button>Okay</button>
                </section>
            </div>
        `;
    }

    connectedCallback() {
        this._render();
    }

    disconnectedCallback() {

    }

    attributeChangedCallback(name, newValue, oldValue) {
        if (newValue === oldValue) {
            return;
        }

        console.log("name: ", name);
        switch(name) {
            case "open":
                if (this.hasAttribute("open")) {
                    this.shadowRoot.getElementById("backdrop").classList.remove("hidden");
                    this.shadowRoot.getElementById("modal").classList.remove("hidden");
                }
                break;
        }
    }

    static get observedAttributes() {
        return ["open"];
    }

    _render() {

    }
}
customElements.define("sr-modal", Modal);