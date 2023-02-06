import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
	status: 'idle',
	items: []
};

//logout
export const getPostsAll = createAsyncThunk('posts/all', async (_, { rejectWithValue }) => {
	const response = await fetch("/api/admin/posts", {
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
		// Login
		builder.addCase(getPostsAll.pending, (state, action) => {
			state.status = 'loading'
		}),
		builder.addCase(getPostsAll.rejected, (state, action) => {
			state.status = 'failed'
		}),
		builder.addCase(getPostsAll.fulfilled, (state, action) => {
			state.items = action.payload.data,
			state.status = 'idle'
		})
	},
});


export default postsSlice.reducer