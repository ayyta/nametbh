import Link from "next/link"
import { Inter } from "next/font/google"
const inter = Inter( {
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
  styles: ['normal', 'italic'],
})

export default function Login() {
  const registerPath = "/register";
  const forgotPasswordPath = "/register"; // PLACEHOLDER: Change to forgot password path
  return (
    <>
      <div className="w-screen h-screen md:bg-login bg-loginPopup flex justify-center md:items-center ">
        <form className={`md:w-161 md:h-96 md:rounded-3xl md:px-16 md:py-7 py-16 w-full min-w-min	px-10 bg-loginPopup flex flex-col ${inter.className}`}>
          <p className="md:text-center md:mb-7 md:text-2xl mb-7 text-2xl text-center font-bold ">Welcome back!</p>
          <label className="flex flex-col">
            <p className="md:text-sm uppercase text-xs font-bold">Email or phone number <span className="md:text-xs text-red-500">*</span></p>
            <input className="md:w-full md:h-12 md:rounded-md mt-1 h-10 text-projectWhite bg-login pl-2" type="email" />
          </label>
          <label className="flex flex-col pt-5">
            <p className="md:text-sm uppercase text-xs font-bold">Password <span className="md:text-xs text-red-500">*</span></p>
            <input className="md:w-full md:h-12 md:rounded-md h-10 text-projectWhite bg-login pl-2" type="password" />
          </label> 
          <div>
            <Link href={forgotPasswordPath}className="md:text-sm mt-1 text-xs text-projectBlue hover:text-projectHoverBlue cursor-pointer inline">Forgot your password?</Link>
          </div>
          <button className="mt-4 w-full md:h-20 md:rounded-md h-12 bg-loginButton text-projectWhite font-bold" type="submit">Log In</button>
          <p className="md:text-sm text-xs mt-1 text-projectGrey">Need an account? <Link href={registerPath} className="text-projectBlue hover:text-projectHoverBlue cursor-pointer">Register</Link></p>
        </form>  
      </div>
    </>
  )
}