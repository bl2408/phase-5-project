import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Login from "./Login/Login";
import NavSide from "./NavSide/NavSide";
import NavTop from "./NavTop/NavTop";
import { getStatusList } from "./Slices/postsSlice";
import { validSession } from "./Slices/userSlice";


function App() {

	const user = useSelector(state => state.user);
	// const postsStatusList = useSelector(state => state.posts.statusList);
	const dispatch = useDispatch();

	const checkSession = async ()=>{
		try {
            await dispatch(validSession()).unwrap()
        } catch (err) {
            console.log(err)
        }
	};

	const loadPostStatusList = async ()=>{
		try {
            await dispatch(getStatusList()).unwrap()
        } catch (err) {
            console.log(err)
        }
	};

	useEffect(()=>{
		checkSession();
	}, [])

	useEffect(()=>{
		if(user.loggedIn){
			loadPostStatusList()
		}
	}, [user.loggedIn])


	return (
		
		<>
			{
			!user.loggedIn 
				? <Login /> 
				:<>
					<NavSide />
					<NavTop />
					<main>
						<Outlet />
					</main>
				</>
			}
			
		</>
	)
}

export default App
