import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	breadcrumb: {}
};

export const navTopSlice = createSlice({
	name: 'navTopSlice',
	initialState,
	reducers:{
		setBreadcrumb:(state, action)=>{
			state.breadcrumb = {...action.payload}
		}
	}
});

export const { setBreadcrumb } = navTopSlice.actions

export default navTopSlice.reducer