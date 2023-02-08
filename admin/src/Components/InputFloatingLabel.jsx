export default function InputFloatingLabel(props){

    return (
        <div className="input-floating-label" style={props.baseStyle}>
            <input {...props} required/>
            <span style={props.labelStyle}>{props.label}</span>
        </div>
    );

}