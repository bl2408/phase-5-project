import { lazy, useState } from "react";
import CollectionView from "../Components/CollectionView";
import WindowBasic from "../Windows/WindowBasic";
import SuspenseLoader from "../Components/SuspenseLoader";
import  CollectionViewSelected from "../Components/CollectionViewSelected"

import "../css/collection.css"
const CollectionSelectedList = lazy(()=>import("../Components/CollectionSelectedList"))

export default function Collections() {

    const [ collectionSelected, setCollectionSelected ]     = useState([])
    const [ viewSelected, setViewSelected ]                 = useState({})

    return (
        <div className="grid-2">
            <WindowBasic >
                <h1>Collections</h1>
                <CollectionView 
                    parentListState={[collectionSelected, setCollectionSelected]}
                    parentViewState={[viewSelected, setViewSelected]}
                    showUpload={true}
                    useLocationPath={true}
                />
            </WindowBasic>

            <WindowBasic className="collection-side-panel">

                {
                    viewSelected?.id 
                        ? <CollectionViewSelected parentViewState={viewSelected} />
                        : null
                }

                {
                    collectionSelected.length > 0 
                        ? <SuspenseLoader>
                            <CollectionSelectedList 
                                showControls={true}
                                parentListState={[collectionSelected, setCollectionSelected]} 
                            />
                        </SuspenseLoader>
                        : null
                }

            </WindowBasic>
        </div>

    );

}

