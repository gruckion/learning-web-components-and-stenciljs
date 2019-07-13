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
