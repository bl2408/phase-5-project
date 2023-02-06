import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './main.css'

import { Provider as ReduxProvider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit'

import navSideSlice from './Slices/navSideSlice';

const store = configureStore({
	reducer: {
		navSideOpen: navSideSlice
	},
	devTools: true,
});

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<ReduxProvider store={store}>
			<App />
		</ReduxProvider>
	</React.StrictMode>,
)
