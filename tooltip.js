// Custom elements are defined in javascript using the class keyword
// All  custom elements must extend the browsers built in HTMLElement class
class Tooltip extends HTMLElement {
    constructor() {
        super();
        console.log("Created Tooltip element.");
        this._tooltipContainer;
        this._tooltipText = "This is the default text if not set";
        this.attachShadow({ mode: "open" });

        // We no longer want to have our template outside of our component.
        // const template = document.querySelector("#tooltip-template");
        // // We can appendChild to the shadowRoot from the constructor but can not append to the main DOM until
        // // connectedCallback is called.
        // this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.shadowRoot.innerHTML = `
            <style>
                div {
                    background-color: black;
                    color: white;
                    position: absolute;
                    z-index: 10;
                }
                .highlight {
                    background-color: red;
                }
                :host {
                    background-color: var(--primary-color);
                }
                :host(.red) {
                    background-color: red;
                }
                :host-context(p) {
                    font-weight: bold;
                }
                ::slotted(.highlight) {
                    border-bottom: 5px dotted red;
                }
                .icon {
                    background-color: green;
                    color: white;
                    padding: 0.15rem 0.15rem;
                    text-align: center;
                    border-radius: 50%;
                }
            </style>
            <slot>Default slot text</slot>
            <span class="icon">(?)</span>`;
    }

    connectedCallback() {
        if (this.hasAttribute("text")) {
            this._tooltipText = this.getAttribute("text");
        }
        const tooltipIcon = this.shadowRoot.querySelector("span");

        tooltipIcon.addEventListener("mouseenter", this._showTooltiop.bind(this));
        tooltipIcon.addEventListener("mouseleave", this._hideTooltiop.bind(this));
        this.shadowRoot.appendChild(tooltipIcon);
        this.style.position = "relative";
    }

    _showTooltiop() {
        this._tooltipContainer = document.createElement("div");
        this._tooltipContainer.textContent = this._tooltipText;
        // To ensure that this refers to this class, we need to bind this when calling the `_showTooltip` method.
        this.shadowRoot.appendChild(this._tooltipContainer);
    }

    _hideTooltiop() {
        this.shadowRoot.removeChild(this._tooltipContainer);
    }
}

// To define our element we first give it a name and then specify the class it will render.
customElements.define("sr-tooltip", Tooltip);