import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	value: true
};

export const navSideSlice = createSlice({
	name: 'navSideIsOpen',
	initialState,
	reducers:{
		toggleMenu:(state)=>{
			state.value = !state.value
		},
		setMenu:(state, action)=>{
			state.value = action.payload;
		}
	}
});

export const { toggleMenu, setMenu } = navSideSlice.actions

export default navSideSlice.reducer