import { useEffect, useMemo, useRef, useState } from "react";
import { daysList, monthsList } from "../fns";
import { v4 as uuid } from "uuid";

export default function DatePicker({
    setDate=new Date()
}){

    const months = monthsList

    const [ day, setDay ]                    = useState(setDate.getDate());
    const [ month, setMonth ]                = useState(setDate.getMonth() + 1);
    const [ year, setYear]                   = useState(setDate.getFullYear());
    const dayRef                             = useRef()
    const hiddenRef                          = useRef()

    useEffect(()=>{
        dayRef.current.max = daysList(year, month)
        hiddenRef.current.value = new Date(Date.UTC(year, month-1, day)).toISOString();
    },[day, month, year])

    return(
        <div className="date-picker">

            <div>
                <input 
                    ref={dayRef}
                    type="number" 
                    min="1" 
                    value={day} 
                    onChange={e=>setDay(state=>e.target.value)}
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
                    type="number" 
                    value={year} 
                    onChange={e=>setYear(state=>e.target.value)}
                    min="1900" 
                    max="9999"
                />
            </div>

            <input 
                ref={hiddenRef}
                type="hidden" 
                name="pub_date"
            />
        </div>
    );

}