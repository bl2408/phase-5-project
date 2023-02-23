import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import "../css/posts.css"
import WindowBasic from "../Windows/WindowBasic";
import { useSelector } from "react-redux";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolder, faFont } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useRef, useState } from "react";

import { v4 as uuid } from "uuid";
import { lazy } from "react";
import SuspenseLoader from "../Components/SuspenseLoader";
import InputTags from "../Components/InputTags";
import { isIterable } from "../fns";
import InputCategory from "../Components/InputCategory";
import { useNotif } from "../Hooks/useNotif";
import DatePicker from "../Components/DatePicker";
import TimePicker from "../Components/TimePicker";
import { usePopup } from "../Hooks/usePopup";

const PostTextArea = lazy(() => import("../Components/PostTextArea"))
const PostCollectionArea = lazy(() => import("../Components/PostCollectionArea"))
const PostTextCollect = lazy(() => import("../Components/PostTextCollect"))

export default function Post() {

    const navigate = useNavigate()

    const SuspenseBlockObj = (props = {}) => {
        const compId = uuid();
        props.id = compId;
        props.up = (id)=>moveFormElement(id, true);
        props.down = (id)=>moveFormElement(id);
        props.remove = removeFormElement;
        let component = null;
        switch(props.t){
            case "text":
                component = <PostTextArea {...props} />
                break;
            case "collection":
                component = <PostCollectionArea {...props} />
                break

            case "textcollect":
            component = <PostTextCollect {...props} />
                break
        }
        return {
            id: compId,
            comp: <SuspenseLoader key={uuid()}>
                    {component}
                </SuspenseLoader>
        }
    };

    const postsStatuses                     = useSelector(state => state.posts.statusList)
    const { id: post_id }                   = useParams()
    const form                              = useRef();
    const notif                             = useNotif()
    const popup                             = usePopup()
    const [postState, setPostState]         = useState({});
    const [content, setContent]             = useState([]);

    useEffect(() => {
        form.current.title.value = postState.title ?? ""
        form.current.select_status.value = postState?.status ?? ""

        if (!!post_id) {
            try {
                const a = postState?.content ? JSON.parse(postState?.content) : [];
                if (a.length > 0) {
                    setContent(state => a.map(a => {

                        switch(a.t){
                            case "text":
                                return SuspenseBlockObj({ ...a })
                            case "collection":
                                return SuspenseBlockObj({ ...a })
                            case "textcollect":
                                return SuspenseBlockObj({ ...a })
                            default:
                                return
                        }

                    }))
                }
            } catch (err) {
                console.log(err);

                if (postState?.content?.length > 0) {
                    setContent(state => [SuspenseBlockObj({
                        t: "text",
                        bn: "Unknown",
                        v: `Record contains invalid json\n\n "${postState.content}"`
                    })]);
                }
            }
        }

        return () => { };

    }, [postState]);


    const postData = useLoaderData();

    useEffect(() => {

        if (!!post_id) {
            
            if(!!postData.errors){
                console.log(postData.errors)
            }else{
                setPostState(state => postData.data)
            }
        }

        return () => { };

    }, []);

    const createContentObj = () => {
        const filterContent = [...form.current.elements].filter(item => item.dataset.isBlock && item.value.length > 0)
        const parseBlocks = filterContent.map(cont => JSON.parse(cont.value));
        return JSON.stringify(parseBlocks);
    };

    const handleSubmit = async e => {
        e.preventDefault();

        const formObj = {
            title: form.current.title.value,
            content: createContentObj(),
            slug: form.current.title.value,
            publish_datetime: `${form.current.pub_date.value}${form.current.pub_time.value}`,
            status: form.current.select_status.value,
        }

        if(!form.current["category"]){
            notif({
                msg: "Post requires a category",
                mode: 2
            })
            return
        }
        
        formObj.category = form.current["category"].value
        
        
        if(!!form.current["tags[]"]){
            formObj.tags = isIterable(form.current["tags[]"]) 
                ? [...form.current["tags[]"]].map(a=>a.value) 
                : [form.current["tags[]"].value]

            formObj.tags = [ ...new Set(formObj.tags) ];
        }

        try {
            const response = await fetch(`/api/admin/posts${!!post_id ? `/${post_id}` : ""}`, {
                method: !!post_id ? "PATCH" : "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formObj)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error("Server error", {
                    cause: data.errors
                })
            }
            notif({
                msg: "Post saved!",
                mode: 1
            })
            navigate("/posts")
        } catch (err) {
            notif({
                msg: err.toString(),
                mode: 2
            })
        }



    };

    const addFormElement = (type) => {
        setContent(state => [...state,
            SuspenseBlockObj({t: type})
        ]);
    };

    const removeFormElement = (id) => {
        setContent(state => state.filter(item => item.id !== id))
    }

    const moveFormElement = (id, up=false) => {

        setContent(state => {

            const newState = [...state];

            const item = newState.find(item => item.id === id);
            const itemIndex = newState.indexOf(item)
            const newIndex = up ? (itemIndex - 1) : (itemIndex + 1)

            if (newIndex>=0 && newIndex <=state.length-1) {
                newState.splice(itemIndex, 1)
                newState.splice(newIndex, 0, item)
                console.log(newState)
                return newState;
            }
            
            return state
        })
    }

    const handleDeletePost = ()=>{

        popup({
            open:true,
            component: "ItemDelete",
            data: {
                itemType: "post",
                typeUrl: "posts",
                returnUrl: "/posts",
                items: [
                    {
                        label: postState.title,
                        id: post_id
                    }
                ]
            }
        })

    };

    return (
        <form ref={form} onSubmit={handleSubmit} className="grid-2">
            <WindowBasic className="post">
                <input type="text" placeholder="Title" name="title" style={{ fontSize: "3rem" }} />
                <div className="controls">
                    <button title="Text" type="button" onClick={()=>addFormElement("text")} className="btn primary"><FontAwesomeIcon icon={faFont} /></button>
                    <button title="Collection" type="button" onClick={()=>addFormElement("collection")} className="btn primary"><FontAwesomeIcon icon={faFolder} /></button>
                    <button title="Text and Collection" type="button" onClick={()=>addFormElement("textcollect")} className="btn primary"><FontAwesomeIcon icon={faFont}/> + <FontAwesomeIcon icon={faFolder} /></button>
                </div>
                <div className="display-content-blocks">
                    {content.map(cont => cont.comp)}
                </div>
            </WindowBasic>
            <WindowBasic>
                <section>
                    <button className="btn primary">{!!post_id ? "Update" : "Create"}</button>
                    {
                        !!post_id 
                            ? <button type="button" className="btn red" onClick={handleDeletePost}>Delete</button>
                            : null
                    }
                    
                </section>
                <section>
                    <h3>Status</h3>
                    <select name="select_status">
                        {postsStatuses.map(status => (
                            <option key={uuid()} value={status.label}>
                                {status.label}
                            </option>
                        ))}
                    </select>
                    
                </section>
                <section>
                    <h3>Date/Time</h3>
                    {
                        postState.publish_datetime
                            ? <DatePicker name="pub_date" setDate={new Date(postState.publish_datetime)}/>
                            : null
                    }
                    {
                        postState.publish_datetime
                            ? null
                            : <DatePicker name="pub_date" />
                    }

                    {
                        postState.publish_datetime
                            ? <TimePicker name="pub_time" setTime={new Date(postState.publish_datetime)} />
                            : null
                    }

                    {
                        postState.publish_datetime
                            ? null
                            : <TimePicker name="pub_time" />
                    }

                </section>
                <section>
                    <h3>Category</h3>
                    { postState.category ? <InputCategory category={postState.category.label}/> : null}
                    { postState.category ? null : <InputCategory />}
                </section>
                <section>
                    <h3>Tags</h3>
                    { postState.tags ? <InputTags tags={postState.tags} /> : null}
                    { postState.tags ? null : <InputTags />}
                </section>
            </WindowBasic>
        </form>
    );

}