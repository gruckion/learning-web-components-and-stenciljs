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
