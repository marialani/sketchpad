import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Loading from "./components/Loading";
const App = React.lazy(() => import("./App"));

ReactDOM.render(
  <Suspense fallback={<Loading />}>
    <App />
  </Suspense>,
  document.getElementById("root")
);
