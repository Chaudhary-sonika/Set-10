import { useMail } from "../contexts/context";
import { Link } from "react-router-dom";
export const Trash = ()=>{
    const {state} = useMail();
    const mailDeleted = state.mailFilterData.filter((arr)=>arr.isDeleted);
    return(
        <div>
            <h1>Trash Box</h1>
            {mailDeleted.map((item)=>(
                <div key={item.mId}>
                <h2>Subject : {item.subject}</h2>
                <p>{item.content}</p>
                <Link to={`/single/${item.mId}`}>View Details</Link>
                <div style={{textAlign:"right"}}>
                    <button onClick={()=>dispatch({type:"RestoreD", id: item.mId})}>Restore</button>
                    <button>{item.unread ? "Mark as read" : "Mark as unread"}</button>
                </div>
            </div>
            ))}
        </div>
    )
}