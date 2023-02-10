import { Link, useParams } from "react-router-dom";
import InputFloatingLabel from "../Components/InputFloatingLabel";
import "../css/posts.css"
import WindowBasic from "../Windows/WindowBasic";
import { useSelector } from "react-redux";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { Suspense, useEffect, useRef, useState } from "react";

import { v4 as uuid } from "uuid";
import { lazy } from "react";

const PostTextArea = lazy(() => import("../Components/PostTextArea"))

export default function Post() {

    const SuspensePostTextArea = (props = {}) => {
        const compId = uuid();
        props.id = compId;
        props.up = (id)=>moveFormElement(id, true);
        props.down = (id)=>moveFormElement(id);
        props.remove = removeFormElement;
        return {
            id: compId,
            comp: <Suspense key={uuid()} fallback={<div className="loader"></div>}>
                <PostTextArea {...props} />
            </Suspense>
        }
    };

    const postsStatuses = useSelector(state => state.posts.statusList)

    const { id: post_id } = useParams()

    const form = useRef();

    const [postState, setPostState] = useState({});
    const [categories, setCategories] = useState([]);
    const [content, setContent] = useState([]);

    const postData = async () => {
        try {
            const response = await fetch(`/api/admin/posts/${post_id}`);
            const data = await response.json();
            if (!response.ok) {
                throw new Error("Server error", {
                    cause: data.errors,
                })
            }

            setPostState(state => data.data)

        } catch (err) {
            console.log(err)
        }

    };

    const categoryData = async () => {
        try {
            const response = await fetch(`/api/admin/category`);
            const data = await response.json();
            if (!response.ok) {
                throw new Error("Server error", {
                    cause: data.errors,
                })
            }

            setCategories(state => data.data)

        } catch (err) {
            console.log(err)
        }

    };

    const loadData = async () => {
        await categoryData();

        if (!!post_id) {
            await postData();
        }
    };

    useEffect(() => {
        form.current.title.value = postState.title ?? ""
        form.current.select_cat.value = postState?.category?.id ?? ""
        form.current.select_status.value = postState?.status ?? ""

        if (!!post_id) {
            try {
                const a = postState?.content ? JSON.parse(postState?.content) : [];
                if (a.length > 0) {
                    setContent(state => a.map(a => SuspensePostTextArea({ ...a })))
                }
            } catch (err) {
                console.log(err);

                if (postState?.content?.length > 0) {
                    setContent(state => [SuspensePostTextArea({
                        t: "text",
                        bn: "Unknown",
                        v: `Record contains invalid json\n\n "${postState.content}"`
                    })]);
                }
            }
        }

        return () => { };

    }, [postState]);

    useEffect(() => {

        loadData()

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
            publish_datetime: new Date().toISOString(),
            category_id: form.current.select_cat.value,
            status: form.current.select_status.value,
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

            console.log(data)

        } catch (err) {
            console.log(err)
        }



    };

    const addFormElement = () => {
        setContent(state => [...state,
            SuspensePostTextArea()
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


    return (
        <form ref={form} onSubmit={handleSubmit} className="grid-2">
            <WindowBasic>
                <input type="text" placeholder="Title" name="title" style={{ fontSize: "3rem" }} />
                <button type="button" onClick={addFormElement} className="btn primary"><FontAwesomeIcon icon={faPlus} /></button>
                {content?.map(cont => cont.comp)}
            </WindowBasic>
            <WindowBasic>
                <section>
                    <button className="btn primary">{!!post_id ? "Update" : "Create"}</button>
                    <button type="button" className="btn red">Delete</button>
                </section>
                <section>
                    <h2>Status</h2>
                    <select name="select_status">
                        {postsStatuses?.map(status => (
                            <option key={uuid()} value={status.label}>
                                {status.label}
                            </option>
                        ))}
                    </select>
                </section>
                <section>
                    <h2>Category</h2>
                    <select name="select_cat">
                        {categories?.map(cat => (
                            <option key={cat.id} value={cat.id}>
                                {cat.label}
                            </option>
                        ))}
                    </select>
                </section>
                <section>
                    <h2>Tags</h2>
                    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                        {postState?.tags?.map(tag => <Link className="tag-link" to="/" key={uuid()}>{tag.label}</Link>)}
                    </div>
                </section>
            </WindowBasic>
        </form>
    );

}