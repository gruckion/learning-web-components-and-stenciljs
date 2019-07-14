# Creating web components in stencil

## Declaring a web component

Just like normal web components we use class's and we need to define the tag that we use to load our component.

In stencil this is done using the `@Component` decorator. This takes an object that has a `tag` property on it. This allows us to specify the name our element similar to `customElements.define()`

```javascript
define(name: string, constructor: Function, options?: ElementDefinitionOptions)
```

The annotation is placed above the `class`;

```typescript
@Component({
  tag: "sr-side-drawer"
})
export class SideDrawer {}
```

In normal web components we can render our shadow DOM from the constructor or from the `connectedCallback()` method. In stencil we can use the render method. Inside the render method we return JSX.

## Styling a stencil component

In order to connect our stencil component to styles we can point it to css file. Stencil also offers support for scss, with a little config.

## Scoping styles or using shadow DOM

We can use the `scoped` attribute to restrict our element to only apply apply the styles to our component, this is done by prefixing all of our styles. This offers support for older platforms that do not implement the shadow DOM specification. However since stencil will automatically polyfil for older browsers we can still use the `shadow` attribute without loosing support for older browsers.

```typescript
@Component({
    tag: "sr-side-drawer",
    styleUrl: "./side-drawer.css",
    shadow: true
})
```

## Stencil attributes / props

In stencil, we do not need to concer ourselves with listening to the attribute changed callback. We simply use the `@Prop()` decorator. By using `setTimeout` we can see that stencil automatically watches the `prop` and we can change it directly or by using `setAttribute`.

Note if we change the attribute using;

```javascript
const sideDrawer = document.getElementById("side-drawer");
setTimeout(() => {
  sideDrawer.headertitle = "Change as prop";
}, 2000);
```

The attribute does not change in the HTML DOM. Only if we use `setAttribute` will this change reflect correctly. We can however reflect the change this change by adding a property to the `@Prop()` decorator. This is done inside a javascript object where we set `{ reflectToAttr: true` to true. This will now ensure that the attribute is also updated when we change the prop directly.

## Slots in stencil

We can get content into our component through the use of slots, but we can also use slots. These work the same as vanilla javascript slots. But again it is not possible to style the inner content from our web component. In order to style the nested content we need to apply these styles within the light DOM.

## Immutable props by default

In stencil we can use props and change them from the HTML, however if we try to set them from within our stencil component we will get a warning. Props in stencil are immutable by default. This is by design to impose a unidirectional data flow into the component. To enable `mutable` props, we simply add the mutable property to the `@Prop({ })` decorator object.

## State in stencil

If we want to manage state within our component it is possible to use `@Prop()` with immutable, but if we only want to manage the state from within our component and not expose it. Then we will need to use the `@Statr()` decorator. Stencil will automatically render the content when state changes occur.

## Stencil public methods

To define a function within our component that can be called through javascript, we must use the `@Method()` decorator.

## Returning multiple elements

We cannot use jsx fragments but instead we can return an array of elements.
