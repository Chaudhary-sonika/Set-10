import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { MailProvider } from "./contexts/context";
import { Inbox } from "./pages/Inbox";
import { Spam } from "./pages/Spam";
import { Trash } from "./pages/Trash";
import { mails } from "./Data/mailData";
import { SingleMail } from "./pages/SingleMail";
function App(){
    return(
        <div style={{display:"flex", flexDirection:"row"}}>
            <nav style={{display:"flex", flexDirection:"column", margin:"30px"}} >
                <NavLink to="/" style={{margin:"20px"}}>Inbox</NavLink>
                <NavLink to="/spam" style={{margin:"20px"}}>Spam</NavLink>
                <NavLink to="/trash" style={{margin:"20px"}}>Trash</NavLink>
            </nav>
            <Routes>
                <Route path="/" element={<Inbox MailData={mails}/>}/>
                <Route path="/spam" element={<Spam/>}/>
                <Route path="/trash" element={<Trash/>}/>
                <Route path="/single/:singleId" element={<SingleMail/>}/>
            </Routes>
        </div>
    )
}
const root = createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
      <MailProvider>
         <App/>
      </MailProvider>
    </BrowserRouter>
)
export default App;