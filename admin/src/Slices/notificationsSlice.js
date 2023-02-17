import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	items: []
};

export const notificationsSlice = createSlice({
	name: 'notifications',
	initialState,
	reducers:{
		add:(state, action)=>{
			state.items.push(action.payload)
		},
		remove:(state, action)=>{
			state.items = state.items.filter(item=> item.id !== action.payload.id)
		}
	}
});

export const { add, remove } = notificationsSlice.actions

export default notificationsSlice.reducer