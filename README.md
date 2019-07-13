## Dealing with multiple slots

When working with multipe slots we can give them a `name` attribute and then use the `slot` attribute to ensure the content is rendered into the correct slot

## Javascript processing of slot nodes parsed to our web component

If we would like to pre-process the content parsed in or just inspect it. We can use the `querySelectorAll("slot")` method on our slot elements. This gives us an array of slots, we can then add an evet listener and then use `console.dir` to print out the objects content. To then get access to the content projected into the web component use the `assignedNodes` method.

This allows us to respond to dynamic content within our slots.

## Custom event listeners

We can create our own custom event actions like `cancel` and confirm. To do this we can add `click` events to the two buttons and bind(this) on two private methods `_cancel` and `_confirm`. To add an eventListener to the cancel event we use `addEventListener` and specify the type as `cancel`.

Inside the private method we can write

```javascript
_cancel(event) {
    this.hide();
    const cancelEvent = new Event("cancel");
    event.target.dispatchEvent(cancelEvent);
}
```

But this can only be done within our web component. To expose this outside of our component. In order to compose the event from outside the web component we need to set `{ compose: true }` as the second argument to the Event instance. We can also allow other elements higher up in the DOM tree to handle this event by using `{ bubbles: true }`

Another way to dispatch the event is by using `dispatchEvent` on `this` since this refers to our own element.

```javascript
_confirm() {
    this.hide();
    const confirmEvent = new Event("confirm");
    this.dispatchEvent(confirmEvent);
}
```
