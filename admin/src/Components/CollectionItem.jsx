import { faFile, faFolderBlank, faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function CollectionItem({label, handleItemClick, slug, display_type, url, icon, type}){


    const handleClick=()=>{
        
        if(display_type==="collection"){
            handleItemClick(slug)
        }

    };
    
    const displayIcon = ()=>{

        if(display_type==="collection" ){
            return <FontAwesomeIcon icon={icon ?? faFolderBlank} />
        }else{
            if(type.includes("image")){
                return <img src={url} loading="lazy"/>
            }
        }

    };


    return (
        <button onClick={handleClick} type="button" className="collection-button">
            <div className="icon-area">
                {
                    displayIcon()
                }
            </div>
            <div className="text-area">
                {label} 
            </div>

        </button>

    );

}