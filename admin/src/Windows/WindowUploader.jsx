import { faCheckCircle, faCircleXmark, faFolder, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UploaderContext } from "../App";
import { setView } from "../Slices/uploaderSlice";
import { v4 as uuid } from "uuid";

export default function WindowUploader(){

    const { view } = useSelector(state=>state.uploader)
    const { uploadFiles, setUploadFiles } = useContext(UploaderContext)
    const dispatch = useDispatch()

    useEffect(()=>{

        if(view === 0 && uploadFiles.length > 0 ){
            dispatch(setView(1))
        }

        if(uploadFiles.length > 0){

            if(!!uploadFiles.find(a=>a.status === "uploading")){
                return
            }
            const file = uploadFiles.find(a=>a.status === "idle");

            if(!file){
                return
            }

            if(file.retries > 2){
                file.status = "failed"
                setUploadFiles(state=>[
                    ...state.filter(s=> s.uuid !== file.uuid),
                    file
                ])
                return
            }

            file.status = "uploading"
            setUploadFiles(state=>[
                ...state.filter(s=> s.uuid !== file.uuid),
                file
            ])
            uploadFile(file)

        }
    },[uploadFiles])

    const toggleCollapse = ()=>{
        if(uploadFiles.length > 0){
            if(uploadFiles.filter(a=>a.status === "completed").length === uploadFiles.length){
                setUploadFiles(state=>[]);
                dispatch(setView(0))
                return;
            }
        }
        dispatch(setView(view === 1 ? 2 : 1))
    };

    const displayItems =()=>{

        const groups = [...new Set(uploadFiles.map(g=>g.collectionSlug))]
        const sorted = groups.map(g => ({
            collection: g,
            files: uploadFiles.filter(file=>file.collectionSlug === g)
        }))

        return sorted.map(group=>{
            return (
                <div key={uuid()}>
                    <div className="row-title">
                        <div><FontAwesomeIcon icon={faFolder} /></div>
                        <div>{group.collection}</div>  
                    </div>
                    {
                        group.files.map(row=>(
                            <div key={uuid()} className="row">
                                <div>
                                    {
                                        row.file.name.length > 10
                                            ? `${row.file.name.substring(0, 3)}...${row.file.name.slice(-6)}`
                                            : row.file.name
                                    }
                                </div>
                                <div>
                                    {  row.status === "completed"  ? <span className="success-green"><FontAwesomeIcon icon={faCheckCircle}/></span> : null }
                                    { 
                                        row.status === "uploading" 
                                        ? <div className="loader"></div>
                                        : ""
                                    }
                                    {  row.status === "failed"  ? <span className="error-red"><FontAwesomeIcon icon={faCircleXmark}/></span> : null }
                                </div>
                            </div>
                        ))
                    }
                </div>
            )
        })

    };

    const uploadFile =async (file)=>{

        const formData = new FormData();
        formData.append("file[]", file.file)
        formData.append("collection_slug", file.collectionSlug)

        try{
            const response = await fetch("/api/admin/files",{
                method: "POST",
                body: formData,
            });

            if(!response.ok){
                file.status = "idle"
                file.retries = file.retries === undefined ? 1 : (file.retries + 1)
                setUploadFiles(state=>[
                    ...state.filter(s=> s.uuid !== file.uuid),
                    file
                ])
            }
            const data = await response.json();
            if(!response.ok){
                throw new Error("Server Error",{
                    cause: data.errors
                });
            }

            

            file.status = "completed"
            setUploadFiles(state=>[
                ...state.filter(s=> s.uuid !== file.uuid),
                file
            ])
        }catch(err){
            console.log(err)
        }

    };

    return(
        <>
            {
                view !== 0 
                    ? <div className={`window-uploader window ${view === 2 ? "collapsed" : ""}`}>
                        <div className="title-area">
                            <h2>Uploader</h2>
                            <button 
                                onClick={toggleCollapse} 
                                type="button"
                                className="btn-sml secondary"
                            >
                                {
                                    view === 1
                                        ? <FontAwesomeIcon icon={faMinus} />
                                        : <FontAwesomeIcon icon={faPlus} />
                                }
                            </button>
                        </div>

                        {
                            view === 2
                                ? null
                                : <div className="contents">
                                    {displayItems()}
                                </div>
                        }
                        <div className="summary">
                            Uploaded&nbsp; 
                            {
                                uploadFiles.filter(a=>a.status === "completed").length
                            }
                            &nbsp;of&nbsp;
                            {
                                uploadFiles.length
                            }
                        </div>

                        
                    </div>
                    : null
            }
        
        </>
        
    );

}