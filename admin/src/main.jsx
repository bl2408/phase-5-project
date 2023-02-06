import React from 'react'
import ReactDOM from 'react-dom/client'
import './main.css'

import { Provider as ReduxProvider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit'

import { RouterProvider } from "react-router-dom";

import navSideSlice from './Slices/navSideSlice';
import userSlice from './Slices/userSlice';
import { routesList } from './pages/routesList';


const store = configureStore({
	reducer: {
		navSideOpen: navSideSlice,
		user: userSlice
	},
	devTools: true,
});


ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<ReduxProvider store={store}>
			<RouterProvider router={routesList} />
		</ReduxProvider>
	</React.StrictMode>,
)
