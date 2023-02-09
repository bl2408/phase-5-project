import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";



const App = lazy(() => import('../App'));
const PostsAll = lazy(() => import("./PostsAll"));
const Post =  lazy(() => import("./Post"));
const Collections = lazy(() => import('./Collections'));
const ErrorPage = lazy(() => import('./ErrorPage'));


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