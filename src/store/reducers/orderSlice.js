import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	order: {}
}

const orderSlice = createSlice({
	name: 'order',
	initialState,
	reducers: {
		addToOrder: (state, action) => {
			state.order = action.payload;
		},
		deleteOrder: (state, action) => {
			const newOrder = { ...state.order };
			delete newOrder[action.payload];
			state.order = newOrder;
		}
	}
})

const { actions, reducer } = orderSlice;

export default reducer;

export const {
	addToOrder,
	deleteOrder
} = actions;