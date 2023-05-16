import { Link } from "react-router-dom"
import { useMail } from "../contexts/context"; 

export const Inbox = ({MailData})=>{
  const {state, dispatch, finalMailData} = useMail();
    // console.log(finalMailData);
    return(
        <div>
            <h1>Your Mail Box</h1>
            <div style={{border:"solid grey"}}>
            <h3>Filters:</h3> 
            <label><input type="checkbox" value= "ReadD" onChange={(e)=>dispatch({type:e.target.value})}/>Show unread mails </label>
            <label><input type="checkbox" value= "StarredD" onChange={(e)=>dispatch({type:e.target.value})}/>Show starred mails</label> 
            </div>
            <h3>Unread: {state.unReadCount}</h3>
            {finalMailData.map((item)=>(
                <div key={item.mId}>
                    <h2>Subject : {item.subject}</h2>
                    <button onClick={()=>dispatch({type:"STAR-UNSTAR", id:item.mId})}>{item.isStarred?"Unstar": "Star"}</button>
                    <p>{item.content}</p>
                    <Link to={`/single/${item.mId}`}>View Details</Link>
                    <div style={{textAlign:"right"}}>
                        <button onClick={()=>dispatch({type:"DeleteD", id: item.mId})}>Delete</button>
                        <button onClick={()=>dispatch({type:"READ-UNREAD", id: item.mId})}>{item.unread ? "Mark as read" : "Mark as unread"}</button>
                        <button onClick={()=>dispatch({type:"SpamD", id: item.mId})}>Report spam</button>
                    </div>
                </div>
            ))}
        </div>
    )
}