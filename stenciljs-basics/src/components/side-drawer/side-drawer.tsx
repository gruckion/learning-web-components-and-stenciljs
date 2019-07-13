import { Component, h } from "@stencil/core";

@Component({
  tag: "sr-side-drawer",
  styleUrl: "./side-drawer.css",
  shadow: true
})
export class SideDrawer {
  public render() {
    return <aside class="side-drawer-aside">Hello, World!</aside>;
  }
}
