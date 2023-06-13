import type { Components, JSX } from "../types/components";

interface KortxyzMapinfo extends Components.KortxyzMapinfo, HTMLElement {}
export const KortxyzMapinfo: {
  prototype: KortxyzMapinfo;
  new (): KortxyzMapinfo;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
