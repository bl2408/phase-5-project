import CollectionView from "../Components/CollectionView";
import WindowBasic from "../Windows/WindowBasic";

export default function Collections(){

    return (

        <WindowBasic className="collections-grid">
            <h1>Collections</h1>

            <CollectionView />
            
        </WindowBasic>

    );

}