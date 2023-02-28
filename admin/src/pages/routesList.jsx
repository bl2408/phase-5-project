import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import Refresh from "../Components/Refresh";
import SuspenseLoader from "../Components/SuspenseLoader";

const App = lazy(() => import('../App'));
const PostsAll = lazy(() => import("./PostsAll"));
const Post =  lazy(() => import("./Post"));
const Collections = lazy(() => import('./Collections'));
const TagsAll = lazy(() => import('./TagsAll'));
const Tag = lazy(() => import('./Tag'));
const CategoryAll = lazy(() => import('./CategoryAll'));
const Category = lazy(() => import("./Category"));
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
				element: <SuspenseLoader element={<Post />} />,
				loader: async ({ params }) => {
					return postLoader(params.id);
				},
			},
			{
				path: "collections/",
				element: <SuspenseLoader element={<Collections />} />
			},
			{
				path: "collections/:id",
				element: <SuspenseLoader element={<Collections />} />
			},
			{
				path: "tags/",
				element: <SuspenseLoader element={<TagsAll />} />
			},
			{
				path: "tags/:tagSlug",
				element: <SuspenseLoader element={<Tag/>} />
			},
			{
				path: "categories/",
				element: <SuspenseLoader element={<CategoryAll />} />
			},
			{
				path: "categories/:categorySlug",
				element: <SuspenseLoader element={<Category />} />
			},
			{
				path: "refresh/",
				element: <Refresh />
			},
		],
		errorElement: <SuspenseLoader element={<ErrorPage />} />
	},
]);

async function postLoader (id){
	try {
		const response = await fetch(`/api/admin/posts/${id}`);
		const data = await response.json();
		if (!response.ok) {
			throw new Error("Server error", {
				cause: data.errors,
			})
		}

		return data

	} catch (err) {
		return {
			errors: [
				err,
				err.cause
			]
		}
	}

};