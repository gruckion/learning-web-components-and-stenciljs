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
