import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
	status: 'idle',
	items: [],
	meta: {},
	statusList:{}
};

//all posts
export const getPostsAll = createAsyncThunk('posts/all', async (paramsObj, { rejectWithValue }) => {
	const response = await fetch(`/api/admin/posts${!!paramsObj ? `?${paramsObj}` : ""}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		},
	});
	const data = await response.json();
	
	if (!response.ok) {
		return rejectWithValue(data.errors)
	}
	return data;
});


//all posts
export const getStatusList = createAsyncThunk('posts/statuses', async (paramsObj, { rejectWithValue }) => {
	const response = await fetch(`/api/admin/posts/list/status`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		},
	});
	const data = await response.json();
	
	if (!response.ok) {
		return rejectWithValue(data.errors)
	}
	return data;
});

export const postsSlice = createSlice({
	name: 'posts',
	initialState,
	extraReducers: (builder) => {
		// get all posts
		builder.addCase(getPostsAll.pending, (state, action) => {
			state.status = 'loading'
		}),
		builder.addCase(getPostsAll.rejected, (state, action) => {
			state.status = 'failed'
		}),
		builder.addCase(getPostsAll.fulfilled, (state, action) => {
			state.items = action.payload.data,
			state.meta = action.payload.meta,
			state.status = 'idle'
		}),

		//status 
		builder.addCase(getStatusList.fulfilled, (state, action) => {
			const arr = []
			for(const [k,v] of Object.entries(action.payload.data)){
				arr.push({label: k, value: v})
			}
			state.statusList = arr;
		})
	},
});


export default postsSlice.reducer