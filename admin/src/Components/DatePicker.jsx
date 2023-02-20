import { useState } from "react";
import { daysList, isValidNumber, monthsList, numberRange } from "../fns";
import { v4 as uuid } from "uuid";

export default function DatePicker({
    setDate=new Date(),
    name="date"
}){

    const months = monthsList

    const [ day, setDay ]                    = useState(setDate.getDate());
    const [ month, setMonth ]                = useState(setDate.getMonth() + 1);
    const [ year, setYear]                   = useState(setDate.getFullYear());

    const getFullDate=()=>{
        
        const curYear = new Date().getFullYear();
        let dd, mm, yyyy;
        
        dd = !isValidNumber(day) ? 1 : day
        
        mm = !isValidNumber(month) ? 1 : month
        
        yyyy = !isValidNumber(year) ? curYear : year

        yyyy = numberRange(yyyy, [curYear - 100, curYear + 100])
        
        dd = numberRange(dd, [1, daysList(yyyy, mm)])

        const fd = new Date(Date.UTC(yyyy, mm-1, dd)).toISOString().split("T")        
        return fd[0];
    }

    return(
        <div className="date-picker">

            <div>
                <input 
                    type="text" 
                    value={day} 
                    onChange={e=>setDay(state=>e.target.value)}
                    pattern={`[0-9]{1,2}`}
                    inputMode="numeric"
                    maxLength="2"
                />
            </div>

            <div>
                <select 
                    value={month} 
                    onChange={e=>setMonth(state=>e.target.value)}
                >
                    {
                        months.map(m=><option key={uuid()} value={m.index}>{m.label}</option>)
                    }
                </select>
            </div>
  
            <div>
                <input 
                    type="text" 
                    value={year} 
                    onChange={e=>setYear(state=>e.target.value)}
                    pattern={`[0-9]{4}`}
                    inputMode="numeric"
                    maxLength="4"
                />
            </div>

            <input 
                value={getFullDate()}
                type="hidden" 
                name={name}
            />
        </div>
    );

}