import { Inter } from "next/font/google"
const inter = Inter( {
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
  styles: ['normal', 'italic'],
})

export default function Login() {

  return (
    <>
      <div className="w-screen h-screen md:bg-login bg-loginPopup flex justify-center items-center ">
        <form className={`md:w-161 md:h-96 md:rounded-3xl md:px-16 md:py-7 bg-loginPopup flex flex-col ${inter.className}`}>
          <p className="md:text-center md:mb-7 md:text-2xl font-bold ">Welcome back!</p>
          <label className="flex flex-col">
            <p className="md:text-sm uppercase font-bold">Email or phone number <span className="md:text-xs text-red-500">*</span></p>
            <input className="md:w-full md:h-12 md:rounded-md text-white bg-login " type="email" />
          </label>
          <label className="flex flex-col pt-5">
            <p className="md:text-sm uppercase font-bold">Password <span className="md:text-xs text-red-500">*</span></p>
            <input className="md:w-full md:h-12 md:rounded-md text-white bg-login " type="password" />
          </label>
          <p className="md:text-sm md:mt-1 text-projectBlue">Forgot your password</p>
          <button className="mt-4 w-full md:h-20 md:rounded-md bg-loginButton text-white font-bold" type="submit">Log In</button>
          <p className="md:text-sm md:mt-1 text-projectGrey">Need an account? <span className="text-projectBlue">Register</span></p>
        </form>  
      </div>
    </>
  )
}