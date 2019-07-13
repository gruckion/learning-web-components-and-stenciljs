# The basics of web components

- We can create autonmous elements
- As well as extending built-in elements

To create a custom element and actually render content we need to append a child element.
to this we append an element we have created using `document.createElement(s: string)`.
We can set the text content on the newly created element and thenn set it as the content of
the HTMLElement using `document.appendChild(e: HTMLElement)`.

This will cause an error which is due to a lack of consideration for the web components life cycle.
`// Uncaught DOMException: Failed to construct 'CustomElement': The result must not have children`

## Web Component Lifecycle

The first thing that gets call is the constructor, this is called when the element is created.
However it is important to note that the moment when the element is created is not when it is actually attached to the DOM.
It is first created in memory before being attached to the DOM, the element has not yet been added to the DOM when the constructor is being called. This is why trying to append an element that has not yet been added to the DOM will fail.

Once the element has been mounted the `connectedCallback()` mehod will be called once your element has been attached to the DOM.
So this is the correct plaace to place DOM initialisations. There is also a `disconnectedCallback()` method that will be called by the browser whenever it is remove from the DOM.

There is a third method `attributeChangedCallback()` this is used to moniter changes to the attributes (props) of our custom elements.

Moving our element into the `connectedCallback()` fixes the error and allows us to render to the browser.

## Event listeners

We can add more logic to our component to detect the onHover event. We now have an event listener using `addEventListner` that will render a `div` when we hover over the "(?)". However each time we mouse enter it will produce a new `div` rather than revealing and hiding. For this functionality to work as intended we will need to add another event listener and use `removeChild` on our element.

## Using attributes on our web components

To create an element that can take in an attribute we just pass in the attribute with the desire value e.g. `text="hello"`.We then use `getAttribute(s: string)` to get the text by the attribute as a string. To provide default text if it is not set, we can use the `hasAttribute(s: string)` to first check if the attribute has been provided. In the DOM our first element will render with custom text whilst the second tooltip will render with the default text.

## Adding styles to your web components

We can add styles to HTMLElements within our web component using the `.styles` property. However global styles defined outside of our web component will override the css set through javascript. To avoid this global issue we need to make use of the shadow DOM. It would also be nice to avoid having to write html using the `createElement` attribute which can be done using templates.

## Shadow DOM

Currently all elements within our web component are visible within the DOM. We would like to hide the inner html of our web component and this is achieved using the shadow DOM. To do this we need to use `attachShadow(init: ShadowRootInit)`. Then we append our child elements to the shadowRoot of our component rather than directlyl to the HTMLElement. This is done by changing `this.appendChild` to `this.shadowRoot.appendChild`.

Doing this has abstracted away the DOM of our web component however the content within the usage of our component has also vanished, namely the text. In order to bring this back we need to use trmplates.

## Templates

We can define a template within the DOM `<template></template>` and within this we can define the HTML we want to be displayed within our web component. The template element will not be render automatically. By applying an `id` attribute to it we can reference it from within our web component. This is done using the `document.querySelector()` by the id, we can then append the templates content to our shadowRoot making sure we use `cloneNode(true)` to do a deep copy to take all the nested DOM elements within the templates first element in the tree. We can then query select the shadowRoot to get the span HTMLElement to add our event listeners too.

The draw backs of this approach is that we no longer have a self contained web component. We are also still loosing the inner elements within our web component, as it is still not rendered to the DOM.

## Template slots

We can add our text within the component back by using templates slots. The `<slot></slot>` element allows as to mark the location within our template where the inner conent of our web component should be place. We can also set the default text within our slot, this is done by setting the value within the `<slot>` element. Now if our `<sr-tooltip>` does not have any inner content then it will render the default slot value.

## Defining Templates within the web component

To have a self contained web component we would like to move our `<template></template>` to be within our web component. We can do this by setting the innerHTML of the shadowRoot within the constructor to be the content within the `<template>`.

## Adding styles within our web component

We can also now move out styles into the innerHTML of the shadowRoot which means we can delete our javascript css styles. Even if we style the div element directly we can see that the css does not leak out of our shadow DOM it is completely hidden away.

## Creating new web components based on existing elements

So far we have created a web component from the basic HTMLElement, but we can also set our starting point to be any othe HTMLElemnt, e.g. HTMLSpanElement, HTMLAnchorElement e.t.c. When we define our custom tag we must also add an object with an `extends` property which is set to a string for the tag we want to extend. This goes into the `define` function. `define(name: string, constructor: Function, options?:. ElementDefinitionOptions):` like so `customElements.define("sr-confirm-link", ConfirmLink, { extends: "a" });`. To display our element we still need the `<a>` element but we add an `is` attribute `<a is="sr-confirn-link" href="http://www.google.com">Google</a>`.

# Deeper dive into web components

## Slots content is accessible via the light DOM

It is important to realise that the content within a `<slot>` is defined within the light DOM and even through it is projected into the shadow DOM it iss contained within the light DOM and hence can be styled outside of the shadow DOM. Styles within the main website will effect the content within the `<slot>`

This presents a problem if you do want to style the content within the `<slot>` from within your web component. We can style the slotted content using the pseudo selector `::slotted(span)`. However we can only select the top most element, not nested elements. It's also important to realise that the styles in the light DOM will override the shadow DOM for slotted or projected content.

## Styling our web component overall from within the web component

We can style our element using `sr-tooltip {}` but if we want to have a default style defined within our web component we need to use `:host {}` as `sr-tooltip` is not defined within the web components `<style>` scope.

If you want to conditionally apply default styling we can not use `:host.white {}` for example. We need to treat `:host()` as a function which takes in the additional class's as parameters. `:host(.red){}`

If we want to conditionally style based on the parent element that our web component is placed withhin, then we must use the `:host-contxt(p) {}` selector. Here this will only apply to a parent container that is a paragraph.

## Styling with css variables

We can also specify the default style to be the value of css variables. These can be set in the light down allowing consumers to override the default styling.

## Dynamically changing attributes

At the moment, if an attribute changes a run-time nothing will happen. In order for this we use the `attributeChangedCallback(name: string, oldValue: object, newValue: object)` and register the attribute to be watched. We can watch the attribute by listing it in an array returned by `static get observedAttributes()`. We can then change the value of the attribute when the `oldValue` is different for the new value and apply changes when attribute name `text` changes.

## Clean up on disconnected

When our element is removed from the DOM we will want to remove our event listeners. To do this we make use of the `disconnectedCallback` method.

## Using a `_render` method

Currently we have DOM content in both show and hide tooltip methods. It would be nicer if there was one method that dealt with rendering. We can do this by using our `_showTooltip` and `_hidetooltip` to only toggle the visible state and then trigger a render. For most components we will want to call `_render` in the `connectedCallback` to trigger the first render. This doesn't matter in the case of a tooltip as nothing is shown initially.
