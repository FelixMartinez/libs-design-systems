/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { ButtonType, Size, ThemeColor } from "./shared/types/types";
export { ButtonType, Size, ThemeColor } from "./shared/types/types";
export namespace Components {
    interface MyComponent {
        /**
          * The first name
         */
        "first": string;
        /**
          * The last name
         */
        "last": string;
        /**
          * The middle name
         */
        "middle": string;
    }
    interface RetoButton {
        "color": ThemeColor;
        "disable": boolean;
        "size": Size;
        "spinner": boolean;
        "text": string;
        "type": ButtonType;
    }
    interface RetoInput {
        "color": ThemeColor;
        "disable": boolean;
        "size": Size;
        "spinner": boolean;
        "text": string;
        "type": ButtonType;
    }
}
export interface RetoButtonCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLRetoButtonElement;
}
export interface RetoInputCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLRetoInputElement;
}
declare global {
    interface HTMLMyComponentElement extends Components.MyComponent, HTMLStencilElement {
    }
    var HTMLMyComponentElement: {
        prototype: HTMLMyComponentElement;
        new (): HTMLMyComponentElement;
    };
    interface HTMLRetoButtonElement extends Components.RetoButton, HTMLStencilElement {
    }
    var HTMLRetoButtonElement: {
        prototype: HTMLRetoButtonElement;
        new (): HTMLRetoButtonElement;
    };
    interface HTMLRetoInputElement extends Components.RetoInput, HTMLStencilElement {
    }
    var HTMLRetoInputElement: {
        prototype: HTMLRetoInputElement;
        new (): HTMLRetoInputElement;
    };
    interface HTMLElementTagNameMap {
        "my-component": HTMLMyComponentElement;
        "reto-button": HTMLRetoButtonElement;
        "reto-input": HTMLRetoInputElement;
    }
}
declare namespace LocalJSX {
    interface MyComponent {
        /**
          * The first name
         */
        "first"?: string;
        /**
          * The last name
         */
        "last"?: string;
        /**
          * The middle name
         */
        "middle"?: string;
    }
    interface RetoButton {
        "color"?: ThemeColor;
        "disable"?: boolean;
        "onButtonClicked"?: (event: RetoButtonCustomEvent<any>) => void;
        "size"?: Size;
        "spinner"?: boolean;
        "text"?: string;
        "type"?: ButtonType;
    }
    interface RetoInput {
        "color"?: ThemeColor;
        "disable"?: boolean;
        "onButtonClicked"?: (event: RetoInputCustomEvent<any>) => void;
        "size"?: Size;
        "spinner"?: boolean;
        "text"?: string;
        "type"?: ButtonType;
    }
    interface IntrinsicElements {
        "my-component": MyComponent;
        "reto-button": RetoButton;
        "reto-input": RetoInput;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "my-component": LocalJSX.MyComponent & JSXBase.HTMLAttributes<HTMLMyComponentElement>;
            "reto-button": LocalJSX.RetoButton & JSXBase.HTMLAttributes<HTMLRetoButtonElement>;
            "reto-input": LocalJSX.RetoInput & JSXBase.HTMLAttributes<HTMLRetoInputElement>;
        }
    }
}