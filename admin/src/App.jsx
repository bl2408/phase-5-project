import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Login from "./Login/Login";
import NavSide from "./NavSide/NavSide";
import NavTop from "./NavTop/NavTop";
import { validSession } from "./Slices/userSlice";
import WindowBasic from "./Windows/WindowBasic";


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
						<WindowBasic />
					</main>
				</>
			}
			
		</>
	)
}

export default App
