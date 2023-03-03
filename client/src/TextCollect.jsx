export default function TextCollect({
    name,
    value,
}){

    const style = {
        "text-image" : {width:"100%", display:"grid", gridTemplateColumns:"1fr 2fr", gap: "20px"},
        "image-text" : {width:"100%", display:"grid", gridTemplateColumns:"2fr 1fr", gap: "20px"},
        "quote" : {width:"100%", position: "relative"},
    }

    const textStyle = {
        "text-image": {display:"flex", justifyContent:"center", alignItems:"center"},
        "image-text": {display:"flex", justifyContent:"center", alignItems:"center"},
        "quote": {
            display:"flex", justifyContent:"center", alignItems:"center", 
            position:"absolute", top: "0", left: "0", bottom: "0", right:"0", zIndex:"2", backgroundColor:"rgba(0,0,0,0.7)",
            fontSize: "30px", fontStyle:"italic"
        },
    }
    const collectionStyle = {
        "text-image":{},
        "image-text": {},
        "quote": {},
    }

    const text = (
        <div style={textStyle[name]}>
            <p>{value.text}</p>
        </div>
    )

    const collection = (
        <div style={collectionStyle[name]}>
            {value.collection.map(coll=>{

                return (
                    <div >
                        <img style={{objectFit:"cover", objectPosition:"center"}} alt={coll.alt_text} src={coll.url} />
                    </div>
                )

            })}
        </div>
    )

    return (

        <div style={style[name]}>

            {
                name === "text-image" ||  name === "quote"
                    ? <>{text}{collection}</>
                    : null
            }
            {
                name === "image-text"
                    ? <>{collection}{text}</>
                    : null
            }
            

        </div>

    )


}