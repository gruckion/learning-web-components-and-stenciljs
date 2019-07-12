// Custom elements are defined in javascript using the class keyword
// All  custom elements must extend the browsers built in HTMLElement class
class Tooltip extends HTMLElement {
    constructor() {
        super();
        console.log("Created Tooltip element.");
    }

    connectedCallback() {
        const tooltipIcon = document.createElement("span");
        tooltipIcon.textContent = "(?)";

        tooltipIcon.addEventListener("mouseenter", this._showTooltiop.bind(this));
        this.appendChild(tooltipIcon);
    }

    _showTooltiop() {
        const tooltipContainer = document.createElement("div");
        tooltipContainer.textContent = "This is the tooltip text";
        // To ensure that this refers to this class, we need to bind this when calling the `_showTooltip` method.
        this.appendChild(tooltipContainer);
    }
}

// To define our element we first give it a name and then specify the class it will render.
customElements.define("sr-tooltip", Tooltip);