import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import WindowBasic from "../Windows/WindowBasic";
import { useNotif } from "../Hooks/useNotif";
import CategoryNewEdit from "../Components/CategoryNewEdit";


export default function Category(){

    const { categorySlug }                          = useParams();
    const [ categoryInfo, setCategoryInfo ]         = useState({})
    const notif                                     = useNotif()

    console.log(categorySlug)

    const getCategoryInfo = async()=>{

        try{
            const response = await fetch(`/api/admin/category/${categorySlug}`)
            const data = await response.json()

            if(!response.ok){
                throw new Error("Server Error",{
                    cause: data.errors
                })
            }

            setCategoryInfo(state=>data.data)

        }catch(err){
            notif({
                msg: `Error fetching category.${<br/>}${<br/>}${!!err ? err : "" }${!!err?.cause ? `${<br/>}${<br/>}${err.cause}` : ""}`,
                mode: 2
            });
        }

    };

    useEffect(()=>{
        getCategoryInfo()
    },[])

    return (
        <WindowBasic className="window-full">
            {
                JSON.stringify(categoryInfo) !== "{}"
                    ? <CategoryNewEdit {...categoryInfo}/>
                    : null
            }
        </WindowBasic>
    )

}