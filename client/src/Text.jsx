export default function Text({
    name,
    value,
}){

    const style = {
        "quote" : {width:"100%", display: "flex", justifyContent:"center"},
    }

    const textStyle = {
        "quote": {fontSize: "30px", fontStyle:"italic"},
    }

    return (

        <div style={style[name]}>
            <p style={textStyle[name]}>{value}</p>
        </div>

    )


}