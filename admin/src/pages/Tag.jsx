import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import WindowBasic from "../Windows/WindowBasic";
import { v4 as uuid } from "uuid";
import { displayTagMeta } from "../fns";
import TagNewEdit from "../Components/TagNewEdit";
import { useNotif } from "../Hooks/useNotif";


export default function Tag(){

    const { tagSlug }                   = useParams();
    const [ tagInfo, setTagInfo ]       = useState({})
    const [ meta, setMeta ]             = useState({})
    const notif                         = useNotif()


    const getTagInfo = async()=>{

        try{
            const response = await fetch(`/api/admin/tags/${tagSlug}`)
            const data = await response.json()

            if(!response.ok){
                throw new Error("Server Error",{
                    cause: data.errors
                })
            }

            setTagInfo(state=>data.data)
            setMeta(state=>data.meta)

        }catch(err){
            notif({
                msg: `Error fetching tag.${<br/>}${<br/>}${!!err ? err : "" }${!!err?.cause ? `${<br/>}${<br/>}${err.cause}` : ""}`,
                mode: 2
            });
        }

    };

    useEffect(()=>{
        getTagInfo()
    },[])

    return (
        <div className="grid-2 reverse">
            <WindowBasic style={{display:"flex", flexDirection:"column", gap:"20px"}}>
                <div>
                    <h2>Used in:</h2>
                    {
                        displayTagMeta(meta).map(m=>(
                            <div className="row-meta" key={uuid()}>
                                <div>{m.target}</div>
                                <div>{m.total}</div>
                            </div>
                        ))
                    }
                    <div className="row-meta">
                        <div>Total</div>
                        <div>{tagInfo.count}</div>
                    </div>
                </div>
            </WindowBasic>

            <WindowBasic>
                {
                    JSON.stringify(tagInfo) !== "{}"
                        ? <TagNewEdit {...tagInfo}/>
                        : null
                }
            </WindowBasic>
        </div>

    )

}