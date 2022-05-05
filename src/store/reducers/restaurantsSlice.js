import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	restaurants: [],
	restaurantsLoadingStatus: "idle",
	currentRestaurants: {}
}

const restaurantsSlice = createSlice({
	name: "restaurants",
	initialState,
	reducers: {
		restaurantsFetching: state => {
			state.restaurantsLoadingStatus = "loading";
		},
		restaurantsFetched: (state, action) => {
			state.restaurantsLoadingStatus = "idle";
			state.restaurants = action.payload;
		},
		restaurantsFetchingError: state => {
			state.restaurantsLoadingStatus = "error";
		},
		setCurrentRestaurants: (state, action) => {
			state.currentRestaurants = action.payload;
		}
	}
})

const { actions, reducer } = restaurantsSlice;

export default reducer;

export const {
	restaurantsFetching,
	restaurantsFetched,
	restaurantsFetchingError,
	setCurrentRestaurants
} = actions;