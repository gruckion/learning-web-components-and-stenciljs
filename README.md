## Dealing with multiple slots

When working with multipe slots we can give them a `name` attribute and then use the `slot` attribute to ensure the content is rendered into the correct slot

## Javascript processing of slot nodes parsed to our web component

If we would like to pre-process the content parsed in or just inspect it. We can use the `querySelectorAll("slot")` method on our slot elements. This gives us an array of slots, we can then add an evet listener and then use `console.dir` to print out the objects content. To then get access to the content projected into the web component use the `assignedNodes` method.

This allows us to respond to dynamic content within our slots.
