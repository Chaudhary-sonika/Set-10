import { useParams } from "react-router";
import { mails } from "../Data/mailData";
export const SingleMail = ()=>{
    const {singleId} = useParams();
    const product = mails.find((item)=>item.mId === singleId);
    const {mId, subject, content} = product;
    // console.log(mails)
    // console.log(product)
    return(
        <div>
            <h1>Reagarding {subject}</h1>
            <h2>Subject: {subject}</h2>
            <p>{content}</p>
            <i>Unknow sender...</i>
        </div>
    )
}