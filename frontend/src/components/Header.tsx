
import { Link } from "react-router-dom"
import { useEffect, useState } from 'react';

import { HoverCardTrigger, HoverCardContent, HoverCard } from "@/components/ui/hover-card"
import { Button } from "@/components/ui/button"



export const Header = () => {
  const [userName, setUserName] = useState('Default');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const email = user.email || '';
    const name = email.substring(0, email.indexOf('@'));
    setUserName(name);
  }, []);


    return <div className="border-b flex justify-between px-10 py-4">
                <div  className="flex items-center gap-2">
                <FlagIcon className="h-6 w-6 mr-2" />
                <Link to={'/codegen'}>
                <span className="text-lg font-bold cursor-pointer">Codegram</span>
                </Link>
        
        </div>
        <div className="flex items-center">
        <div className="flex justify-center items-center gap-4 sm:gap-6">
    <div
        className="border-md inline-flex h-10 items-center m-2 mr-10 justify-center cursor-pointer rounded-md border font-bold bg-black px-8 text-sm shadow-sm transition-colors text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
        onClick={() => window.location.reload()}
    >
        NEW +
    </div>
</div>


            <div className="relative">
            <HoverCard>
        
              <HoverCardTrigger asChild>
              
                <div className="flex items-center gap-2 cursor-pointer rounded-full bg-gray-100 px-3 py-2 text-sm font-medium  ">
          
                <Avatar size={"big"} name={userName} />




        </div>
        
        </HoverCardTrigger>
        <HoverCardContent align="end" className="w-64" side="bottom">
                
                <div className="space-y-2 p-4">
                  <div className="flex items-center gap-3">
                
                  <Avatar size={"big"} name={userName} />

              
             
                    <div>
                   
                      <h4 className="text-sm font-semibold">{userName}</h4>
                      <p className="text-xs text-gray-500 ">@{userName}</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Link to={'/'}>
                    <Button className="w-full mt-5" size="sm" onClick={() => localStorage.removeItem('user')}>
                      Sign Out
                    </Button>
                    </Link>
                   
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
        </div>
        </div>
    </div>
}



function Avatar({ name, size = "small" }: { name: string, size?: "small" | "big" }) {
  return (
    <div className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-600 rounded-full ${size === "small" ? "w-6 h-6" : "w-10 h-10"}`}>
      <span className={`${size === "small" ? "text-xs" : "text-md"} font-bold text-gray-300 `}>
        {name[0].toUpperCase()}
      </span>
    </div>
  );
}


//@ts-ignore
function FlagIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <line x1="4" x2="4" y1="22" y2="15" />
    </svg>
  )
  }