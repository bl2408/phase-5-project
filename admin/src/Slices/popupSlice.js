import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	open: false,
	component: "",
	data: {}
};

export const popupSlice = createSlice({
	name: 'popup',
	initialState,
	reducers:{
		open:(state, action)=>{
			state.open = true,
			state.component = action.payload.component,
			state.data = action.payload.data?? {}
		},
		close:(state)=>{
			state.open = false,
			state.component = '',
			state.data = {}
		}
	}
});

export const { open, close } = popupSlice.actions

export default popupSlice.reducer