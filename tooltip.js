// Custom elements are defined in javascript using the class keyword
// All  custom elements must extend the browsers built in HTMLElement class
class Tooltip extends HTMLElement {
    constructor() {
        super();
        console.log("Created Tooltip element.");
        this._tooltipContainer;
    }

    connectedCallback() {
        const tooltipIcon = document.createElement("span");
        tooltipIcon.textContent = "(?)";

        tooltipIcon.addEventListener("mouseenter", this._showTooltiop.bind(this));
        tooltipIcon.addEventListener("mouseleave", this._hideTooltiop.bind(this));
        this.appendChild(tooltipIcon);
    }

    _showTooltiop() {
        this._tooltipContainer = document.createElement("div");
        this._tooltipContainer.textContent = "This is the tooltip text";
        // To ensure that this refers to this class, we need to bind this when calling the `_showTooltip` method.
        this.appendChild(this._tooltipContainer);
    }

    _hideTooltiop() {
        this.removeChild(this._tooltipContainer);
    }
}

// To define our element we first give it a name and then specify the class it will render.
customElements.define("sr-tooltip", Tooltip);