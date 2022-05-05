import React from "react";
import ReactDOM from "react-dom/client";

import RouterList from "./components/router-list/RouterList";
import './firebase';

import "./scss/styles.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<RouterList />
	</React.StrictMode>
);


