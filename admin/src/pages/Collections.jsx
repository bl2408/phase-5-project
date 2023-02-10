import { useState } from "react";
import CollectionView from "../Components/CollectionView";
import WindowBasic from "../Windows/WindowBasic";

export default function Collections(){

    

    return (
        <div className="grid-2">
            <WindowBasic >
                <h1>Collections</h1>  
                <CollectionView 
                    // collectionSelected={collectionSelected} 
                    // setCollectionSelected={setCollectionSelected}
                />              
            </WindowBasic>

            <WindowBasic>
                {/* {collectionSelected?.map(cs => <div key={cs.uniqId}>{cs.label}</div>)} */}
            </WindowBasic>
        </div>

    );

}








// import { useState } from "react";
// import CollectionView from "../Components/CollectionView";
// import WindowBasic from "../Windows/WindowBasic";

// export default function Collections(){

//     const [selectedItems, setSelectedItems ] = useState([]);

//     return (
//         <div className="grid-2">
//             <WindowBasic >
//                 <h1>Collections</h1>
//                 <CollectionView 
//                     setSelectedItems={setSelectedItems}
//                     selectedItems={selectedItems} 
//                 />
                
//             </WindowBasic>
//             <WindowBasic>
//                 {selectedItems.map(item=><div key={item.id}>{item.id} - {item.label}</div>)}
//             </WindowBasic>
//         </div>

//     );

// }