Continued...

- We can create autonmous elements
- As well as extending built-in elements

To create a custom element and actually render content we need to append a child element.
to this we append an element we have created using `document.createElement(s: string)`.
We can set the text content on the newly created element and thenn set it as the content of
the HTMLElement using `document.appendChild(e: HTMLElement)`.

This will cause an error which is due to a lack of consideration for the web components life cycle.
`// Uncaught DOMException: Failed to construct 'CustomElement': The result must not have children`

# Web Component Lifecycle

The first thing that gets call is the constructor, this is called when the element is created.
However it is important to note that the moment when the element is created is not when it is actually attached to the DOM.
It is first created in memory before being attached to the DOM, the element has not yet been added to the DOM when the constructor is being called. This is why trying to append an element that has not yet been added to the DOM will fail.

Once the element has been mounted the `connectedCallback()` mehod will be called once your element has been attached to the DOM.
So this is the correct plaace to place DOM initialisations. There is also a `disconnectedCallback()` method that will be called by the browser whenever it is remove from the DOM.

There is a third method `attributeChangedCallback()` this is used to moniter changes to the attributes (props) of our custom elements.

Moving our element into the `connectedCallback()` fixes the error and allows us to render to the browser.

# Event listeners

We can add more logic to our component to detect the onHover event. We now have an event listener using `addEventListner` that will render a `div` when we hover over the "(?)". However each time we mouse enter it will produce a new `div` rather than revealing and hiding. For this functionality to work as intended we will need to add another event listener and use `removeChild` on our element.

# Using attributes on our web components

To create an element that can take in an attribute we just pass in the attribute with the desire value e.g. `text="hello"`.We then use `getAttribute(s: string)` to get the text by the attribute as a string. To provide default text if it is not set, we can use the `hasAttribute(s: string)` to first check if the attribute has been provided. In the DOM our first element will render with custom text whilst the second tooltip will render with the default text.

# Adding styles to your web components

We can add styles to HTMLElements within our web component using the `.styles` property. However global styles defined outside of our web component will override the css set through javascript. To avoid this global issue we need to make use of the shadow DOM. It would also be nice to avoid having to write html using the `createElement` attribute which can be done using templates.

# Shadow DOM

Currently all elements within our web component are visible within the DOM. We would like to hide the inner html of our web component and this is achieved using the shadow DOM. To do this we need to use `attachShadow(init: ShadowRootInit)`. Then we append our child elements to the shadowRoot of our component rather than directlyl to the HTMLElement. This is done by changing `this.appendChild` to `this.shadowRoot.appendChild`.

Doing this has abstracted away the DOM of our web component however the content within the usage of our component has also vanished, namely the text. In order to bring this back we need to use trmplates.

# Templates

We can define a template within the DOM `<template></template>` and within this we can define the HTML we want to be displayed within our web component. The template element will not be render automatically. By applying an `id` attribute to it we can reference it from within our web component. This is done using the `document.querySelector()` by the id, we can then append the templates content to our shadowRoot making sure we use `cloneNode(true)` to do a deep copy to take all the nested DOM elements within the templates first element in the tree. We can then query select the shadowRoot to get the span HTMLElement to add our event listeners too.
