import { createContext, lazy, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Login from "./Login/Login";
import NavSide from "./NavSide/NavSide";
import NavTop from "./NavTop/NavTop";
import { getStatusList } from "./Slices/postsSlice";
import { validSession } from "./Slices/userSlice";
import WindowPopup from "./Windows/WindowPopup"
import WindowUploader from "./Windows/WindowUploader";

const Notifications = lazy(()=>import("./Notifications/Notifications"))
// const WindowPopup = lazy(()=>import("./Windows/WindowPopup"))
export const UploaderContext = createContext();

function App() {

	const user = useSelector(state => state.user);
	const popupState = useSelector(state => state.popup);
	const dispatch = useDispatch();

	const [ uploadFiles, setUploadFiles ] = useState([])

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
		
		<UploaderContext.Provider value={{uploadFiles, setUploadFiles}}>
			{
			!user.loggedIn 
				? <Login /> 
				:<>
					<NavSide />
					<NavTop />
					<Notifications />
					<WindowUploader />
					{	popupState.open
							? <WindowPopup {...popupState} />
							: null
					}
					<main>
						<Outlet />
					</main>
				</>
			}
			
		</UploaderContext.Provider>
	)
}

export default App
