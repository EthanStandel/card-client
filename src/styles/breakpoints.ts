import { css, SerializedStyles } from "@emotion/react";

const breakpoint = (breakpoint: string) => (style: SerializedStyles) =>
  css`
    @media only screen and (${breakpoint}) {
      ${style}
    }
  `;

export const mobile = breakpoint("max-width: 1023px");
export const desktop = breakpoint("min-width: 1024px");
