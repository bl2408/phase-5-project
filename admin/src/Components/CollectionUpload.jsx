import { useSelector } from "react-redux";
import InputFileUpload from "./InputFileUpload";

export default function CollectionUpload({
    close
}){

    const {label, slug} = useSelector(state=>state.popup.data)

    return(

        <>
            <h2>Upload to collection</h2>
            <p>
                You will be adding files to the following collection "{label}"
            </p> 
                    
        
            <InputFileUpload 
                multiple={true}
                name="fileUpload"
                sendToUploader={true}
                collectionSlug={slug}
                callback={()=>close()}
            />

            <div className="right-controls" style={{paddingTop:"10px"}}>
                <button onClick={close} type="button" className="btn secondary">Cancel</button>
            </div>

        </>

    );
}