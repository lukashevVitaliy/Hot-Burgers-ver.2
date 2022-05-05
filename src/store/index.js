import { configureStore } from "@reduxjs/toolkit";

import restaurants from "./reducers/restaurantsSlice";
import burgers from "./reducers/burgersSlice";
import order from "./reducers/orderSlice";


const store = configureStore({
	reducer: { restaurants, burgers, order },
	devTools: process.env.NODE_ENV !== "production"
})

export default store;