
import { v4 as uuid } from "uuid";
import { faFile, faFolder, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function collectionSelectedList({parentListState}){

    const [ collectionSelected, setCollectionSelected ]     = parentListState;

    const sortedList = collectionSelected.sort((a, b) => {
        const typeA = a.display_type;
        const typeB = b.display_type
        if (typeA < typeB) {
          return -1;
        }
        if (typeA > typeB) {
          return 1;
        }
        return 0;
    })

    const handleRemoveSelectedItem =(uniqId)=>{
        setCollectionSelected(state=>state.filter(item=>item.uniqId !== uniqId))
    };

    return (

        <>
            <h3>Selections</h3>
            <div className="collection-sl">
                {
                    sortedList.filter(item=>item.display_type === "collection").map(item=><CollectionSlItem key={uuid()} {...item} onRemove={handleRemoveSelectedItem} />)
                }
            </div>  
            <div className="collection-sl">
                {
                    sortedList.filter(item=>item.display_type === "file").map(item=><CollectionSlItem key={uuid()} {...item} onRemove={handleRemoveSelectedItem} />)
                }
            </div>

        </>

    );
}



const CollectionSlItem = ({uniqId, label, display_type, onRemove})=>{
    const icon = display_type === "collection" ? faFolder : faFile;
    return (
        <div className="collection-sl-item">
            <div>{<FontAwesomeIcon icon={icon}/>}</div>
            <div>{label}</div>
            <div>
                <button className="" onClick={()=>onRemove(uniqId)}>
                    {<FontAwesomeIcon icon={faX} />}
                </button>
            </div>
        </div>
    );
};