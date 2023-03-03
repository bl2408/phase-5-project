import { useEffect, useState } from "react";
import Collection from "./Collection";
import Text from "./Text";
import TextCollect from "./TextCollect";

function App() {

	const [ page, setPage ] = useState("posts")
	const [ pageData, setPageData ] = useState({})

	const setUrl=(url)=>{
		setPage(state=>`${url}`)
		setPageData(state=>({}))
	}

	const fetchFn = async ()=>{

		try{
			const res = await fetch(`/api/api/${page}`);
			const data = await res.json()

			if(!res.ok){
				throw new Error("Server error", {
					cause: data.errors
				})
			}

			setPageData(state=>data.data)
			console.log(data)

		}catch(err){
			console.log(err)
		}
	};

	const displayPagePostList = (page === "posts" && JSON.stringify(pageData) !== "{}") ? (
			<div>
				<h1>Post List</h1>
				<section>
					{
						pageData.map(post=>{
							return(
								<div className="link">
									<button onClick={()=>setUrl(`posts/${post.slug}`)}>{post.title}</button>
									<div className="row r3">
										<div> 
											<div>ID</div>
											<span className="opacity50">
												{post.id}
											</span>
										</div>
										<div> 
											<div>Datetime</div>
											<span className="opacity50">
												{new Date(post.publish_datetime).toLocaleDateString()}
												&nbsp;
												{new Date(post.publish_datetime).toLocaleTimeString()}
											</span>
										</div>
										<div className="link">
											<div>Category</div>
											<button onClick={()=>setUrl(`posts/${post.category.slug}`)}>{post.category.label}</button>
										</div>
									</div>
								</div>
							)
						})
					}
				</section>
			</div>
	) 
	: null

	const displayPagePostSingle = (page.includes("posts/") && JSON.stringify(pageData) !== "{}") ? (
		<div>
			<section>
				<h1 style={{marginBottom:0}}>{pageData.title}</h1>
				<span className="opacity50">
					{new Date(pageData.publish_datetime).toLocaleDateString()}
					&nbsp;
					{new Date(pageData.publish_datetime).toLocaleTimeString()}
				</span>	
				<span className="opacity50">
					<h2>{pageData.category.label}</h2>
				</span>	
				
				{
					pageData.content.map(item=>{
						switch(item.type){
							case "text":
								return <Text {...item} />
							case "textcollect":
								return <TextCollect {...item} />
							case "collection":
								return <Collection {...item}/>
						}
					})
				}		
				<div style={{display: "flex", flexWrap:"wrap", gap:"10px"}}>
					{
						pageData.tags.map(tag=>{

							return (
								<button style={{borderRadius:"20px"}}>{tag.label}</button>
							)

						})
					}
				</div>	
			</section>
		</div>
) 
: null


	useEffect(()=>{
		fetchFn()
	},[page]);

	return (
		<div className="App">
			<nav>
				<div className="link">
					<button onClick={()=>setUrl("posts")}>Posts list</button>
				</div>
			</nav>
			<main>
				<div className="content">
					{displayPagePostList}
					{displayPagePostSingle}
				</div>
			</main>
		</div>
	)
}

export default App
