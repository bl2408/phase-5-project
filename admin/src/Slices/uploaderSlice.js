import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	view: 0,
	status: "idle"
};

export const uploaderSlice = createSlice({
	name: 'uploader',
	initialState,
	reducers:{
		setView:(state, action)=>{
			state.view = action.payload
		}
	}
});

export const { setView } = uploaderSlice.actions

export default uploaderSlice.reducer