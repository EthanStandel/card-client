import { css } from "@emotion/css";
import { BrowserRouter } from "react-router-dom";
import "./App.css";

const App = () => (
  <BrowserRouter>
    <div
      className={css`
        color: red;
      `}
    >
      This text should be red!
    </div>
  </BrowserRouter>
);

export default App;
