import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	items: []
};

export const notificationsSlice = createSlice({
	name: 'notifications',
	initialState,
	reducers:{
		add:(state, action)=>{
			state.items = [...state.items, action.payload]
		},
		remove:(state, action)=>{
			state.value = action.payload;
		}
	}
});

export const { add, remove } = notificationsSlice.actions

export default notificationsSlice.reducer