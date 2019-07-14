import { Component, h, Prop } from "@stencil/core";

@Component({
  tag: "sr-side-drawer",
  styleUrl: "./side-drawer.scss",
  shadow: true
})
export class SideDrawer {

  constructor() {
    this._onCloseDrawer.bind(this);
  }

  @Prop({ reflectToAttr: true }) headertitle: string;
  @Prop({ reflectToAttr: true, mutable: true }) open: boolean;

  private _onCloseDrawer = () => this.open = false;

  public render() {
    return (
      <aside class="side-drawer-aside">
        <header>
          <h1>{this.headertitle}</h1>
          <button onClick={this._onCloseDrawer}>X</button>
        </header>
        <section class="tabs">
          <button class="active">Navigation</button>
          <button>Contacts</button>
        </section>
        <main>
          <slot />
        </main>
      </aside>
    );
  }
}
