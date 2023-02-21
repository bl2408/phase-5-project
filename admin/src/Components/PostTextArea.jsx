import { faArrowDownLong, faArrowUpLong, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef } from "react";
import { adjustTextArea } from "../fns";
// import { v1 as uuid } from "uuid";

export default function PostTextArea({id, t="text", bn="", v="", up, down, remove}){

    const hiddenRef = useRef()
    const inputRef = useRef();
    const textareaRef = useRef();

    const obj = {t,bn,v}
    useEffect(()=>{

        inputRef.current.value = bn
        textareaRef.current.value = v
        textareaRef.current.rows = `${adjustTextArea(textareaRef.current.value) + 2}`
        hiddenRef.current.value = JSON.stringify(obj)
        return ()=>{};
    },[]);
  

    const textAreaUpdateHidden = (e)=>{
        const txtArea = e.target
        obj.v = txtArea.value
        textareaRef.current.rows = `${adjustTextArea(textareaRef.current.value) + 2}`
        hiddenRef.current.value = JSON.stringify(obj)
    };
    const inputUpdateHidden = (e)=>{
        const input = e.target
        obj.bn = input.value
        hiddenRef.current.value = JSON.stringify(obj)
    };

    return(
        <div className="block-area">
            <div className="controls">
                <input ref={inputRef} type="text" placeholder="Block name" onChange={inputUpdateHidden} required/>
                <button onClick={()=>up(id)} type="button" className="btn-sml secondary"><FontAwesomeIcon icon={faArrowUpLong}/></button>
                <button onClick={()=>down(id)} type="button" className="btn-sml secondary"><FontAwesomeIcon icon={faArrowDownLong}/></button>
                <button onClick={()=>remove(id)} type="button" className="btn-sml red"><FontAwesomeIcon icon={faX}/></button>  
            </div>
            
            <textarea ref={textareaRef} onChange={textAreaUpdateHidden} placeholder="Add text"></textarea>
            
            <input 
                ref={hiddenRef} 
                data-is-block="true"
                type="hidden" 
            />
        </div>
    );

}