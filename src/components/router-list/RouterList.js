import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";

import { Landing } from "../landing";
import App from "../app/App";
import { NotFound } from "../not-found";

import store from "../../store";


const RouterList = () => {
	return (
		<Provider store={store}>
			<Router>
				<Routes>
					<Route path="/" element={<Landing />} />
					<Route path="/restaurant/:restaurantId" element={<App />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</Router>
		</Provider>

	)
}

export default RouterList;