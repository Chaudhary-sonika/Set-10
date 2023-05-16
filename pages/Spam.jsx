import { useMail } from "../contexts/context";
import { Link } from "react-router-dom";
export const Spam =()=>{
    const {state} = useMail();
    const mailSpammed = state.mailFilterData.filter((arr)=>arr.isSpammed);
    return(
        <div>
            <h1>Spam Mails</h1>
            {mailSpammed.map((item)=>(
                <div key={item.mId}>
                <h2>Subject : {item.subject}</h2> 
                <p>{item.content}</p>
                <Link to={`/single/${item.mId}`}>View Details</Link>
            </div>
            ))}
        </div>
    )
}