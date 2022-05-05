import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	burgers: {},
	burgersLoadingStatus: "idle"
}

const burgersSlice = createSlice({
	name: "burgers",
	initialState,
	reducers: {
		burgersFetching: state => {
			state.burgersLoadingStatus = "loading"
		},
		burgersFetched: (state, action) => {
			state.burgers = action.payload;
			state.burgersLoadingStatus = "idle"
		},
		burgersFetchingError: state => {
			state.burgersLoadingStatus = "error"
		},
		burgersCreated: (state, action) => {
			state.burgers = action.payload;
		},
		burgersDeleted: (state, action) => {
			state.burgers = action.payload
		}
	}
})

const { actions, reducer } = burgersSlice;

export default reducer;

export const {
	burgersFetching,
	burgersFetched,
	burgersFetchingError,
	burgersCreated,
	burgersDeleted
} = actions;