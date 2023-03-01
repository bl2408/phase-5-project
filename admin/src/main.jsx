import React from 'react'
import ReactDOM from 'react-dom/client'
import './css/main.css'

import { Provider as ReduxProvider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit'

import { RouterProvider } from "react-router-dom";

import navSideSlice from './Slices/navSideSlice';
import userSlice from './Slices/userSlice';
import { routesList } from './pages/routesList';
import postsSlice from './Slices/postsSlice';
import notificationsSlice from './Slices/notificationsSlice';
import popupSlice from './Slices/popupSlice';
import uploaderSlice from './Slices/uploaderSlice';
import navTopSlice from './Slices/navTopSlice';


const store = configureStore({
	reducer: {
		navSideOpen: navSideSlice,
		user: userSlice,
		posts: postsSlice,
		notifications: notificationsSlice,
		popup: popupSlice,
		uploader: uploaderSlice,
		navTop: navTopSlice
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
