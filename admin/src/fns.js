export const displayDate = (timestamp) => {
    const t = new Date(timestamp)
    return `${t.toLocaleDateString()} ${t.toLocaleTimeString('en-AU')}`;
};


export const isIterable = (input) => {
    if (input === null || input === undefined) {
        return false
    }

    return typeof input[Symbol.iterator] === 'function'
}


export const monthsList = Array.from({ length: 12 }, (e, i) => {
    const d = new Date(null, i + 1, null)
    return {
        label: d.toLocaleDateString("en", { month: "long" }),
        index: d.toLocaleDateString("en", { month: "numeric" })
    }
})

export const daysList = (year, month)=> new Date(year, month, 0).getDate();

export const isValidNumber =(values)=>{

    if(typeof values === "string" && values.length > 0){
        values = +values;
    }else{
        return false
    }

    if(isIterable(values) && Array.isArray(values)){
        values.forEach(value => {
           
            if(isNaN(value)){
                return false;
            }
            
        });
    }else{

        if(isNaN(values)){
            return false;
        }
    }

    return true;

};

export const numberRange =(num, range)=>{

    if(num < range[0]){
        num = 0
    }

    if(num > range[1]){
        num = range[1]
    }

    return num

}

