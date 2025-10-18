const formatMessageDate=(date)=>{
    return new Date(date).toLocaleDateString('en-US',{
        minute:'2-digit',
        hour:'2-digit',
        hour12:false
    })
}
export default formatMessageDate