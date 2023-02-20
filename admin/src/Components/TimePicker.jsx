import { useState } from "react";
import { isValidNumber, numberRange } from "../fns";

export default function DatePicker({
    setTime=new Date(),
    name="time"
}){

    const getAmPm = (hr) => hr >= 12 ? 'pm' : 'am';
    const adjustHrs = (hr)=>{

        let hrs = hr % 12
        hrs = !!hrs ? hrs : 12;
        return parseInt((`0${hrs}`).slice(-2))

    }; 
    const adjustMins = (min)=>parseInt((`0${min}`).slice(-2));

    const getFullTime =()=>{

        let hh, mm

        hh = !isValidNumber(hr) ? 0 : hr
        hh = numberRange(hh,[0, 12])
        hh = adjustHrs(hh)

        mm = !isValidNumber(min) ? 0 : min
        mm = numberRange(mm,[1, 59])
        mm = adjustMins(mm)

        
        if(ampm === "am"){
            hh = hh === 12 ? 0 : hh
        }

        if(ampm === "pm"){
            hh = hh < 12 ? (hh + 12) : 12
        }

        const ft = new Date(Date.UTC(null, null, null, hh,mm,0)).toISOString().split("T")        
        return `T${ft[1]}`
    }
    
    const [ hr, setHr ]                         = useState(adjustHrs(setTime.getHours()))
    const [ min, setMin ]                       = useState(adjustMins(setTime.getMinutes()))
    const [ ampm, setAmPm ]                     = useState(getAmPm(setTime.getHours()))

    return(
        <div className="time-picker">

            <div>
                <input 
                    type="text" 
                    value={hr} 
                    onChange={e=>setHr(state=>e.target.value)}
                    pattern={`[0-9]{1,2}`}
                    inputMode="numeric"
                    maxLength="2"
                />
            </div>
            <div>
                <input 
                    type="text" 
                    value={min} 
                    onChange={e=>setMin(state=>e.target.value)}
                    pattern={`[0-9]{1,2}`}
                    inputMode="numeric"
                    maxLength="2"
                />
            </div>
            <div>
                <select
                    value={ampm}
                    onChange={e=>setAmPm(state=>e.target.value)}
                >
                    <option value="am">AM</option>
                    <option value="pm">PM</option>
                </select>
            </div>


            <input 
                value={getFullTime()}
                type="hidden" 
                name={name}
            />
        </div>
    );

}