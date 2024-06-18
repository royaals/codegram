
import { Link } from "react-router-dom"
function Footer() {
  return (
    
       <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center">
          <FlagIcon className="h-6 w-6 mr-2" />
          <span className="text-lg font-bold">Codegram</span>
        </div>
        <nav className="flex items-center space-x-4 mt-4 md:mt-0">
          <Link to={'/'} className="hover:underline" >
            Privacy Policy
          </Link>
          <Link  to={'/'} className="hover:underline">
            Terms of Service
          </Link>
          <Link to={'/contact'} className="hover:underline">
            Contact Us
          </Link>
        </nav>
      </div>
    </footer>

  )
}

export default Footer
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