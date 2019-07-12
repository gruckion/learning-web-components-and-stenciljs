// Custom elements are defined in javascript using the class keyword
// All  custom elements must extend the browsers built in HTMLElement class
class Tooltip extends HTMLElement {
    constructor() {
        super();
        console.log("Created Tooltip element.");
        this._tooltipContainer;
        this._tooltipText = "This is the default text if not set";
        this.attachShadow({ mode: "open" });
        const template = document.querySelector("#tooltip-template");
        // We can appendChild to the shadowRoot from the constructor but can not append to the main DOM until
        // connectedCallback is called.
        this.shadowRoot.appendChild(template.content.cloneNode(true));
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
        this._tooltipContainer.style.backgroundColor = "black";
        this._tooltipContainer.style.color = "white";
        this._tooltipContainer.style.position = "absolute";
        this._tooltipContainer.style.zIndex = 10;
        // To ensure that this refers to this class, we need to bind this when calling the `_showTooltip` method.
        this.shadowRoot.appendChild(this._tooltipContainer);
    }

    _hideTooltiop() {
        this.shadowRoot.removeChild(this._tooltipContainer);
    }
}

// To define our element we first give it a name and then specify the class it will render.
customElements.define("sr-tooltip", Tooltip);