import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import SuspenseLoader from "../Components/SuspenseLoader";

const App = lazy(() => import('../App'));
const PostsAll = lazy(() => import("./PostsAll"));
const Post =  lazy(() => import("./Post"));
const Collections = lazy(() => import('./Collections'));
const ErrorPage = lazy(() => import('./ErrorPage'));


export const routesList = createBrowserRouter([
	{
		path: "/",
		element: <SuspenseLoader element={<App />} />,
		children: [
			{
				path: "posts/",
				element: <SuspenseLoader element={<PostsAll />} />
			},
			{
				path: "posts/new/",
				element: <SuspenseLoader element={<Post />} />
			},
			{
				path: "posts/:id/",
				element: <SuspenseLoader element={<Post />} />
			},
			{
				path: "collections/",
				element: <SuspenseLoader element={<Collections />} />
			},
		],
		errorElement: <SuspenseLoader element={<ErrorPage />} />
	},
]);