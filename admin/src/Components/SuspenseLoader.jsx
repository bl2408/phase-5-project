import { Suspense } from "react";


export default function SuspenseLoader({element, children}){
	return (
		<Suspense 
			fallback={<div className="loader"></div>}
		>
			{element?? null}
			{children}
		</Suspense>
    );
}