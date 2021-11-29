import { css } from "@emotion/css";

const breakpoint = (breakpoint: string) => (style: string) =>
  css`
    @media only screen and (${breakpoint}) {
      ${style}
    }
  `;

export const mobile = breakpoint("max-width: 1023px");
export const desktop = breakpoint("min-width: 1024px");
