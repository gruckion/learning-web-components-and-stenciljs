import { Component, h } from "@stencil/core";

@Component({
    tag: "sr-side-drawer",
    styleUrl: "./side-drawer.css"
})
export class SideDrawer {
    public render() {
        return <aside class="side-drawer-container">Hello, World!</aside>;
    }
}
