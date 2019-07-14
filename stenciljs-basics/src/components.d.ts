/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';


export namespace Components {
  interface SrSideDrawer {
    'headertitle': string;
    'open': () => Promise<void>;
    'opened': boolean;
  }
}

declare global {


  interface HTMLSrSideDrawerElement extends Components.SrSideDrawer, HTMLStencilElement {}
  var HTMLSrSideDrawerElement: {
    prototype: HTMLSrSideDrawerElement;
    new (): HTMLSrSideDrawerElement;
  };
  interface HTMLElementTagNameMap {
    'sr-side-drawer': HTMLSrSideDrawerElement;
  }
}

declare namespace LocalJSX {
  interface SrSideDrawer extends JSXBase.HTMLAttributes<HTMLSrSideDrawerElement> {
    'headertitle'?: string;
    'opened'?: boolean;
  }

  interface IntrinsicElements {
    'sr-side-drawer': SrSideDrawer;
  }
}

export { LocalJSX as JSX };


declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements extends LocalJSX.IntrinsicElements {}
  }
}


