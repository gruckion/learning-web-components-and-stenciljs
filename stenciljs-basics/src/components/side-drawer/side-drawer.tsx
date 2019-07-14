import { Component, h, Prop } from "@stencil/core";

@Component({
  tag: "sr-side-drawer",
  styleUrl: "./side-drawer.css",
  shadow: true
})
export class SideDrawer {

  @Prop({ reflectToAttr: true }) headertitle: string;

  public render() {
    return (
      <aside class="side-drawer-aside">
        <header>
          <h1>{this.headertitle}</h1>
        </header>
        <main>
          <slot />
        </main>
      </aside>
    );
  }
}
