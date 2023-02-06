export default function InputFloatingLabel(props){

    return (
        <div className="input-floating-label">
            <input {...props} required/>
            <span>{props.label}</span>
        </div>
    );

}