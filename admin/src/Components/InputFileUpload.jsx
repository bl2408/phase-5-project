import { FileUploader } from "react-drag-drop-files";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp, faFile, faX } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import { v4 as uuid } from "uuid";

export default function InputFileUpload({
    multiple = false,
    fileTypes,
    name
}){

    const [ currentFiles, setCurrentFiles ] = useState([])
    const fuid = useRef(uuid());
    const inputFile = useRef()
 
    const handleRemoveList =(file)=>{
        setCurrentFiles(state=>state.filter(f=>f.name !== file))
    };

    useEffect(()=>{

        const dt = new DataTransfer()
        currentFiles.forEach(file=>dt.items.add(file));
        inputFile.current.files = dt.files
        document.querySelector(`input[name="${fuid.current}"]`).value = "";
        
    },[currentFiles]);

    return (
        <div className="file-uploader">
            {
                currentFiles.length > 0
                    ? 
                    <>
                        <b>File{ currentFiles.length > 1 ? "s" : ""}:</b>
                        <div className="display-list">
                            {
                                currentFiles.map(file=>(
                                    <div key={uuid()} className="file-item">
                                        <div><FontAwesomeIcon icon={faFile} /> {file.name}</div>
                                        <div>
                                            <button onClick={()=>handleRemoveList(file.name)} type="button"><FontAwesomeIcon icon={faX} /></button>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </>
                    : null
            }

            <input ref={inputFile} type="file" name={name} style={{display:"none"}} />
            
            <FileUploader
                name={fuid.current}
                types={fileTypes} 
                multiple={multiple}
                fileOrFiles={null}
                handleChange={(files)=>{
                    setCurrentFiles(state=>[...files])
                }}
            >
                <div className={`contents ${currentFiles.length > 0 ? "shrink" : ""}`}>

                    <div className="icon">
                        <FontAwesomeIcon icon={faCloudArrowUp} />
                    </div>
                    <div>
                        Drag and drop to upload file
                    </div>
                    <div>OR</div>
                    <div><button type="button" className="btn-sml secondary">Browse files</button></div>
                    
                </div>
            </FileUploader>
        </div>
    );

}