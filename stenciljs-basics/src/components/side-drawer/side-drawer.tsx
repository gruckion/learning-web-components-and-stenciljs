import { Component, h, Prop } from "@stencil/core";

@Component({
  tag: "sr-side-drawer",
  styleUrl: "./side-drawer.css",
  shadow: true
})
export class SideDrawer {

  @Prop() headertitle: string;

  public render() {
    return (
      <aside class="side-drawer-aside">
        <header>
          <h1>{this.headertitle}</h1>
          <main>
            <slot />
          </main>
        </header>
      </aside>
    );
  }
}
