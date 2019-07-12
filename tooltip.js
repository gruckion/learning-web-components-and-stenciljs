// Custom elements are defined in javascript using the class keyword
// All  custom elements must extend the browsers built in HTMLElement class
class Tooltip extends HTMLElement {
    constructor() {
        super();
        console.log("Created Tooltip element.");

        // This will throw an error
        // Uncaught DOMException: Failed to construct 'CustomElement': The result must not have children
        const tooltipIcon = document.createElement("span");
        tooltipIcon.textContent = "(?)";
        this.appendChild(tooltipIcon);

    }
}

// To define our element we first give it a name and then specify the class it will render.
customElements.define("sr-tooltip", Tooltip);