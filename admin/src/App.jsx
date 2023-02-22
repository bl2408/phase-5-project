import { lazy, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Login from "./Login/Login";
import NavSide from "./NavSide/NavSide";
import NavTop from "./NavTop/NavTop";
import { getStatusList } from "./Slices/postsSlice";
import { validSession } from "./Slices/userSlice";


const Notifications = lazy(()=>import("./Notifications/Notifications"))
const Popup = lazy(()=>import("./Windows/WindowPopup"))

function App() {

	const user = useSelector(state => state.user);
	const popup = useSelector(state => state.popup);
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
					<Notifications />
					{	popup.open
							? <Popup component={popup.component}/>
							: null
					}
					<main>
						<Outlet />
					</main>
				</>
			}
			
		</>
	)
}

export default App
