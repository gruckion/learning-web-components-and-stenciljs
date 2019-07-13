class Modal extends HTMLElement {
    constructor () {
        super();
        this.attachShadow( { mode: "open" } );
        this.isOpen = false;
        this.shadowRoot.innerHTML = `
            <style>
                :host([open]) #backdrop {
                    opacity: 1;
                    pointer-events: all;
                }
                :host([open]) #modal {
                    opacity: 1;
                    pointer-events: all;
                }
                #backdrop {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100vh;
                    background: rgba(0, 0, 0, 0.75);
                    z-index: 10;
                    opacity: 0;
                    pointer-events: none;
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
                    opacity: 0;
                    pointer-events: none;
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
                ::slotted(h1) {
                    font-size: 1.25rem;
                }
                #actions button {
                    margin: 0 0.25rem;
                }
                #main {
                    padding: 1rem;
                }
            </style>
            <div id="backdrop"></div>
            <div id="modal">
                <header>
                    <slot name="title">Default Title</slot>
                </header>
                <section id="main">
                    <slot name="main"></slot>
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

    attributeChangedCallback( name, newValue, oldValue ) {
        if ( newValue === oldValue ) {
            return;
        }

        switch ( name ) {
            case "open":
                this.isOpen = this.hasAttribute("open");
                break;
            default:
                console.log("name: ", name);
                break;
        }
    }

    static get observedAttributes() {
        return [ ];
    }

    _render() {

    }

    open() {
        this.setAttribute("open",  "");
        this.isOpen = true;
    }
}
customElements.define( "sr-modal", Modal );