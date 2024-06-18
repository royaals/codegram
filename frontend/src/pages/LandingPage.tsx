import { Link } from "react-router-dom"

import Footer from "../components/Footer"


 const LandingPage = () => {
  return (
    <>
        <div className="flex flex-col min-h-[100dvh]">
    <header className="px-4 lg:px-6 h-14 flex items-center justify-between  py-3 bg-gray-900 text-white shadow-md">
    <Link to={'/'} className="flex items-center" >
        <FlagIcon className="h-6 w-6 mr-2" />
        <span className="text-lg font-bold">Codegram</span>
      </Link>
      <div className="flex justify-center items-center gap-4 sm:gap-6">
      <a href="#features" className=" text-sm font-medium hover:underline underline-offset-4" >
          Features
        </a>
        <Link to={'/contact'} className=" text-sm font-medium hover:underline underline-offset-4" >
          Contact
        </Link>
        <Link to={'/signin'} className=" text-sm font-medium hover:underline underline-offset-4" >
          Sign In
        </Link>
        <Link to={'/signup'}
          className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50  "
          
        >
          Get Started
        </Link>
      </div>
    </header>
     
    <main>
      <section className="bg-gray-900 text-white py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-8 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Modernize Your Legacy Code with Ease</h1>
            <p className="text-lg md:text-xl mb-8">
              Our AI-powered platform analyzes your legacy code, provides refactoring recommendations, and seamlessly
              provides updated codebase.
            </p>
            <Link
                    className="inline-flex h-10 items-center m-2 justify-center rounded-md border font-bold  border-gray-200 border-gray-200 bg-white px-8 text-sm shadow-sm transition-colors text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                    to="/signup"
                  >
                    Get started
                  </Link>
                
          </div>
          <div>
            <img
              alt="Legacy Code Migration Hero Image"
              className="rounded-lg"
              height="400"
              src="/Hero.png"
              style={{
                aspectRatio: "600/400",
                objectFit: "fill",
              }}
              width="600"
            />
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800" id="features">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                  Key Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Streamline Your Legacy Code Migration
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Our AI-powered platform analyzes your legacy codebase, identifies modernization opportunities, and
                  seamlessly migrates your application to the latest technologies.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">Automated Code Analysis</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Our AI-powered code analysis engine scans your legacy codebase, identifies technical debt, and
                    recommends the optimal migration path.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">Seamless Migration</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Our platform handles the entire migration process, from refactoring your code to the
                    modernized application, ensuring a smooth transition.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">Continuous Monitoring</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    After the migration, our platform continuously monitors your application, identifying any issues and
                    providing real-time insights to ensure ongoing success.
                  </p>
                </div>
              </div>
              <img
                alt="Image"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                height="310"
                style={{
                  aspectRatio: "600/400",
                  objectFit: "cover",
                }}
                src="/Featurehero.png"
                width="550"
              />
            </div>
          </div>
        </section>
     
      
    </main>
   <Footer />
    </div>
  </>
)
}
//@ts-ignore
function CheckIcon(props) {
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
    <path d="M20 6 9 17l-5-5" />
  </svg>
)
}

//@ts-ignore
function CodeIcon(props) {
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
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
)
}

//@ts-ignore
function CommandIcon(props) { 
    return (
    <svg
    {...props}  xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    >
   
    </svg>
    )
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

//@ts-ignore
function MenuIcon(props) {
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
    <line x1="4" x2="20" y1="12" y2="12" />
    <line x1="4" x2="20" y1="6" y2="6" />
    <line x1="4" x2="20" y1="18" y2="18" />
  </svg>
)
}

//@ts-ignore
function RedoIcon(props) {
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
    <path d="M21 7v6h-6" />
    <path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7" />
  </svg>
)
}

//@ts-ignore
function XIcon(props) {
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
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
)
}
export default LandingPage