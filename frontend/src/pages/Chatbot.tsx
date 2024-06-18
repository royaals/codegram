import './Chatbot.css';
import gptLogo from "../assets/chatgpt.svg";
import addBtn from '../assets/add-30.png';
import msgIcon from '../assets/message.svg'
import home from'../assets/home.svg'
import saved from'../assets/bookmark.svg'
import rocket from'../assets/rocket.svg'
import sendBtn from "../assets/send.svg"
import userIcon from"../assets/user-icon.png"
import gptImgLogo  from "../assets/chatgptLogo.svg"
function Chatbot() {
    return (
        <div className="wrapper">
            <div className="App">
            <div className="sideBar h-screen">
                <div className="upperSide">
                    <div className="upperSideTop">
                        <img src={gptLogo} alt="" className="logo" />
                        <span className="brand">Code</span>
                    </div>
                    <button className="midBtn"><img src={addBtn} alt="new chat" className="addBtn" />New Chat</button>
                    <div className="upperSideBottom">
                        <button className="query"><img src={msgIcon} alt="Query" />What is programming?</button>
                        <button className="query"><img src={msgIcon}alt="Query" />How to use an API</button>
                    </div>
                </div>
          
                <div className="lowerSide">
                    <div className="listItems"><img src={home} alt="" className="listitemsImg" />Home</div>
                    <div className="listItems"><img src={saved} alt="" className="listitemsImg" />Saved</div>
                    <div className="listItems"><img src={rocket} alt="" className="listitemsImg" />UpgradeToPro</div>
                </div>
            </div>

            <div className="main ">
                <div className="chats">
                    <div className="chat flex gap-2 w-full">
                        <div className=" w-[10%] h-[10%] img-container flex items-center justify-center">
                            <img className=' rounded-full' src={userIcon} alt="profile photo" />
                        </div>
                        <div className="message w-full flex">
                            <p className='w-full  items-center justify-center'>Hi, I am GPT-3. How can I help you?</p>
                        </div>
                    </div>
                </div>

                <div className="chats" id='gpt'>
                    <div className="chat flex gap-2 w-full">
                        <div className=" w-[10%] h-[10%] img-container flex items-center justify-center">
                            <img className=' rounded-full' src={gptImgLogo} alt="profile photo" />
                        </div>
                        <div className="message w-full flex">
                            <p className='w-full  items-center justify-center'>Hi, I am GPT-3. How can I help you?</p>
                        </div>
                    </div>
                </div>
                
                <div className="chatFooter">
                    <div className="inp">
                    <input id='input' type="text"  placeholder='Send a message'/>
                    <button className="send"> <img src={sendBtn} alt="" /></button>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}

export default Chatbot;