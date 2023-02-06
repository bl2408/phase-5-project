import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import App from '../App';
import ErrorPage from '../ErrorPages/ErrorPage';

const Posts = lazy(() => import("../pages/Posts"));

const SuspenseLoader =({element})=>{
	return (
		<Suspense 
			fallback={<div className="loader"></div>}
		>
			{element}
		</Suspense>);
}

export const routesList = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				path: "posts/",
				element: <SuspenseLoader element={<Posts />} />
			},
			{
				path: "posts/:id",
				element: <SuspenseLoader element={<Posts />} />
			},
		],
		errorElement: <ErrorPage />
	},
]);