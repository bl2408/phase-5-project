import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	open: false,
	component: "",
};

export const popupSlice = createSlice({
	name: 'popup',
	initialState,
	reducers:{
		open:(state, action)=>{
			state.open = true;
			state.component = action.payload
		},
		close:(state)=>{
			state.open = false;
		}
	}
});

export const { open, close } = popupSlice.actions

export default popupSlice.reducer