import { createContext, useContext ,useEffect,  useState} from "react";
import { mails } from "../Data/mailData";
import { useReducer } from "react";
const MailContext = createContext(null);
const mailReducer = (state, action)=>{
    switch(action.type){
        case "StarredD":
        return {...state, isStarred:!state.isStarred};

        case "ReadD":
        return {...state, isRead:!state.isRead};

        // btn
        case "DeleteD":
            const newUpdatedMail = state.mailFilterData.map((arrMail)=>{
                if(arrMail.mId===action.id){
                    return {...arrMail, isDeleted: true}
                }else{
                    return arrMail;
                }
            });
            return {...state, mailFilterData: newUpdatedMail};

        case "RestoreD":
            const mailRestored = state.mailFilterData.map((arrMail)=>{
                if(arrMail.mId === action.id){
                    return {...arrMail, isDeleted: false};
                }else{
                    return arrMail;
                }
            });
            return {...state, mailFilterData: mailRestored};
        
        case "SpamD":
            const mailSpam = state.mailFilterData.map((arrMail)=>{
                if(arrMail.mId===action.id){
                    return {...arrMail, isSpammed: !arrMail.isSpammed};
                }else{
                    return arrMail;
                }
            });
            return {...state, mailFilterData: mailSpam};
            
         case "READ-UNREAD":
            const readUnreadMail = state.mailFilterData.map((arrMail)=>{
                if(arrMail.mId ===action.id){
                    return {...arrMail, unread: !arrMail.unread};
                }else{
                    return arrMail;
                }
            });
            const unread = readUnreadMail.reduce((acc, curr)=>(curr.unread ? acc+1 : acc), 0);
            return {...state, mailFilterData: readUnreadMail, unReadCount: unread };
            
        case "STAR-UNSTAR":
            const starredMail = state.mailFilterData.map((arrMail)=>{
                if(arrMail.mId===action.id){
                    return {...arrMail, isStarred: !arrMail.isStarred};
                }else{
                    return arrMail;
                }
            }); 
            return {...state, mailFilterData:starredMail};
         default:
            return state;   
    }

};

export const MailProvider = ({children})=>{
 const [mailFilterData, setMailFilterData] = useState([]);
 useEffect(()=>{
    setMailFilterData(mails);
 }, []);

 const initiallyUread = mails.reduce((acc, curr)=>(curr.unread ? acc+1: acc), 0);
 const [state, dispatch] = useReducer(mailReducer, {mailFilterData:[...mails], isRead: false, isStarred: false, unReadCount: initiallyUread});
    
  const finalMailData = state.mailFilterData.filter((arrMail)=> (state.isRead ? arrMail.unread : true)&&(state.isStarred ? arrMail.isStarred : true) && !arrMail.isDeleted && !arrMail.isSpammed);
    return(
        <MailContext.Provider value={{ mailFilterData, state, dispatch, finalMailData}}>
            {children}
        </MailContext.Provider>
    )
}
export const useMail = ()=> useContext(MailContext);