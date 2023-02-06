export default function WindowBasic(props){

    return (

        <div {...props} className={`window ${props.className||""}`} >
            {props.children}
        </div>

    );

}