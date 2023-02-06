import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
	status: 'idle',
	loggedIn: false,
	info: {}
};
//login user
export const login = createAsyncThunk('admin/login', async (formObj, { rejectWithValue }) => {
	const response = await fetch("/api/admin/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(formObj)
	});

	const data = await response.json();
	if (!response.ok) {
		return rejectWithValue(data.errors)
	}
	return data;
});

//relogin by session
export const validSession = createAsyncThunk('admin/valid', async (_, { rejectWithValue }) => {
	const response = await fetch("/api/admin/valid");
	const data = await response.json();
	if (!response.ok) {
		return rejectWithValue(data.errors)
	}
	return data;
});

//logout
export const logout = createAsyncThunk('admin/logout', async (_, { rejectWithValue }) => {
	const response = await fetch("/api/admin/logout", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
	});

	if (!response.ok) {
		const data = await response.json();
		return rejectWithValue(data.errors)
	}
	return true;
});

export const userSlice = createSlice({
	name: 'user',
	initialState,
	extraReducers: (builder) => {
		// Login
		builder.addCase(login.pending, (state, action) => {
			state.status = 'loading'
		}),
		builder.addCase(login.rejected, (state, action) => {
			state.status = 'failed'
		}),
		builder.addCase(login.fulfilled, (state, action) => {
			state.info = {
				...action.payload.data,
			}
			state.loggedIn = true;
			state.status = 'idle'
		}),

		//Valid session
		builder.addCase(validSession.pending, (state, action) => {
			state.status = 'loading'
		}),
		builder.addCase(validSession.rejected, (state, action) => {
			state.status = 'failed'
		}),
		builder.addCase(validSession.fulfilled, (state, action) => {
			state.info = {
				...action.payload.data,
			}
			state.loggedIn = true;
			state.status = 'idle'
		}),

		//logout
		builder.addCase(logout.fulfilled, (state, action) => {
			state.info = {};
			state.loggedIn = false;
		})
	},
});


export default userSlice.reducer