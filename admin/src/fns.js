export const displayDate =(timestamp)=>{
    const t = new Date(timestamp)
    return `${t.toLocaleDateString()} ${t.toLocaleTimeString('en-AU')}`;
};