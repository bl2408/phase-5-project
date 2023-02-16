import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { v4 as uuid } from "uuid";

export default function InputCategory({
    category
}){
    const controller = new AbortController()

    const [ categorySelection, setCategorySelection ]           = useState("")
    const [ resultsList, setResultsList ]                       = useState([])
    const [ search, setSearch ]                                 = useState("")
    const [ dropDown, setDropDown ]                             = useState(false)
    const [ isLoading, setIsLoading ]                           = useState(false)
    const searchTimer                                           = useRef()
    const inputRef                                              = useRef()

    useEffect(()=>{
        if(!!category && category.length > 0){
            setCategorySelection(state=>category)
        }
        return ()=>{}
    },[]);

    const searchCategories = async (keywords)=>{
        try{
            const sp = new URLSearchParams({
                keywords
            })
            const response = await fetch(`/api/admin/category/?${sp.toString()}`,{
                signal: controller.signal
            });
            const data = await response.json();

            if(!response.ok){
                throw new Error("Server error",{
                    cause: data.errors
                });
            }

            setResultsList(state=>data.data)

        }catch(err){
            console.log(err)
            console.log(err.cause)
        }finally{
            setIsLoading(state=>false)
        }
    };

    const handleKeyUp =(e)=>{
        const keyword = inputRef.current.value
        if(e.key === 'Enter'){
            e.preventDefault();
            addCategorySelected(keyword)
            setIsLoading(state=>false)
            clearTimeout(searchTimer.current)
        }else{
            clearTimeout(searchTimer.current)
            searchTimer.current = setTimeout(()=>{
                setIsLoading(state=>true)
                setSearch(state=>keyword);
            }, 400)
        }
    };

    useEffect(()=>{

        if(search && search.length > 0){
            searchCategories(search)
            setDropDown(state=>true)
        }else{
            setDropDown(state=>false)
        }

        return ()=> controller.abort()
    }, [search]);

    const handleInputBlur = ()=>{
        setTimeout(()=>{
            setDropDown(state=>false)
        }, 200)
    };

    const handleInputFocus = ()=>{
        if(search && search.length > 0){
            setDropDown(state=>true)
        }
    };

    const addCategorySelected =(cat)=>{
        inputRef.current.value = "";
        setCategorySelection(state=>cat)
        setSearch(state=>"");
    };

    const removeCatSelected =()=>{
        setCategorySelection(state=>"")
    };

    return (
        <div className="input-cat">
            {
                categorySelection 
                    ? <input key={uuid()} type="hidden" name="category" value={categorySelection}/>
                    : null
            }
            <div className="border">
                <div className="display-list">
                    {
                        categorySelection.length > 0
                            ? <div key={uuid()} className="cat">
                                <div>{categorySelection}</div>
                                <div>
                                    <button 
                                        type="button"
                                        onClick={removeCatSelected}
                                    >
                                        <FontAwesomeIcon icon={faX}/>
                                    </button>
                                </div>
                            </div>
                            : null
                    }
                </div>
                <div className="input-area">
                    <input 
                        ref={inputRef}
                        type="text" 
                        placeholder="Enter Category" 
                        onKeyUp={handleKeyUp} 
                        onKeyDown={e=>{
                            if(e.key === "Enter") { e.preventDefault(); }
                        }}
                        onBlur={handleInputBlur}
                        onFocus={handleInputFocus}
                    />
                    {   dropDown 
                        ?   <div className="drop-down" tabIndex={1}>
                                {
                                    isLoading ? <div className="loader"></div> 
                                    
                                    : search.length > 0
                                        ? resultsList.map(res=>(
                                            <div 
                                                className="dd-item" 
                                                key={uuid()} 
                                                onClick={()=>addCategorySelected(res.label)}
                                            >
                                                {res.label}
                                            </div>
                                        ))
                                        : null
                                }
                                
                                {
                                    !isLoading && !resultsList.some(i => i.label === search)
                                        ? <div className="dd-item" onClick={()=>addCategorySelected(search)}>
                                            <div>Category "{search}" not found!</div>
                                            <div>Create category "{search}"</div>
                                        </div>
                                        : null
                                }
                        </div>
                        : null
                    }
                </div>
            </div>

        </div>
    );

}