import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Login from "./Login/Login";
import NavSide from "./NavSide/NavSide";
import NavTop from "./NavTop/NavTop";
import { validSession } from "./Slices/userSlice";


function App() {

	const user = useSelector(state => state.user);
	const dispatch = useDispatch();

	const checkSession = async ()=>{

		try {
            await dispatch(validSession()).unwrap()
        } catch (err) {
            console.log(err)
        }

	};

	useEffect(()=>{

		checkSession();

	}, [])

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
