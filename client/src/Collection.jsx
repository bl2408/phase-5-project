export default function Collection({
    name,
    value,
}){

    const style = {
        "gallery1" : {width:"100%"},
        "download" : {width:"100%", margin:"10px", textAlign:"center"},
    }

    const collectionStyle = {
        "gallery1" : {display:"flex", flexWrap: "wrap", justifyContent: "space-between", gap: "10px"}
    }
    const individualStyle = {
        "gallery1" : {width:"150px"},
        "download" : {padding:"10px"}
    }

    const display = ()=>{

        switch(name){
            case "gallery1":
                return value.map(coll=>{
                    return (
                        <div style={individualStyle[name]}>
                            <a href={coll.url} target="_blank">
                                <img alt={coll.alt_text} src={coll.url} />
                            </a>
                        </div>
                    )
                })
            case "download":
                return value.map(coll=>{
                    return (
                        <div style={individualStyle[name]}>
                            <form method="get" action={coll.url}>
                                <button type="submit">Download {coll.alt_text}!</button>
                            </form>
                        </div>
                    )
                })
        }

    }

    return (

        <div style={style[name]}>
            <div style={collectionStyle[name]}>
                {display()}
            </div>
        </div>

    )


}