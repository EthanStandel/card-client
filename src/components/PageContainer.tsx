import { css } from "@emotion/css";
import { Outlet } from "react-router";

import theme from "../styles/theme";

const PageContainer = () => (
  <div
    className={css`
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    `}
  >
    <header
      className={css`
        background: ${theme.palette.primary.main};
        width: 100vw;
        position: sticky;
        top: 0;
      `}
    >
      Header
    </header>
    <div
      className={css`
        min-height: calc(100vh - 75px);
        flex-grow: 1;
        display: flex;
        flex-direction: column;
      `}
    >
      <Outlet />
    </div>
    <footer
      className={css`
        position: sticky;
        background: green;
        bottom: 0;
      `}
    >
      Footer
    </footer>
  </div>
);

export default PageContainer;
