"use client"; 
import Link from "next/link"
import { Inter } from "next/font/google"
import { useState } from "react"
import { useRouter } from "next/navigation"
import "@/styles/accountpages.css"
import { login } from "@/lib/auth"

const inter = Inter( {
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
  styles: ['normal', 'italic'],
})

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [logInError, setlogInError] = useState(false);

  const router = useRouter();
  const registerPath = "/register";
  const forgotPasswordPath = "/register"; // PLACEHOLDER: Change to forgot password path

  // Submit function for login
  const handleLogin = async (e) => {
    e.preventDefault();
    setlogInError(false);

    // Call login function from auth.js
    const response = await login(username, password, router);
    if (!response.ok) {
      setlogInError(true);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && username && password) {
      handleLogin(e);
    }
  };

  // Styles if user inputs wrong email or password
  let headerStyle = logInError ? "text-red-600" : "";
  let headerErrorStyle = logInError ? "italic" : "";
  let errorMsg = logInError ? " - Invalid email or password" : "*";

  return (
    <>
      <div className="w-screen h-screen md:bg-login bg-loginPopup flex justify-center md:items-center">
        {/* Login Popup */}
        <form onSubmit={handleLogin} className={`md:w-161 md:h-96 md:rounded-3xl md:px-16 md:py-7 py-16 w-full min-w-min	px-10 bg-loginPopup flex flex-col ${inter.className}`}>
          <p className="md:text-center md:mb-7 md:text-2xl mb-7 text-2xl text-center font-bold ">Welcome back!</p>

          {/* Email/Number Input */}
          <label className="flex flex-col">
            <p className={`md:text-sm uppercase text-xs font-bold ${headerStyle}`}>Email or phone number <span className={`md:text-xs text-red-600 ${headerErrorStyle}`}>{errorMsg}</span></p>
            <input className="md:w-full md:h-12 md:rounded-md mt-1 h-10 text-projectWhite bg-login pl-3 account-input" 
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={handleKeyDown}
              />
          </label>

          {/* Password Input */}
          <PasswordInput headerErrorStyle={headerErrorStyle} headerStyle={headerStyle} errorMsg={errorMsg} value={password} setValue={setPassword} handleKeyDown={handleKeyDown} />


          {/* Forgot Password */}
          <div>
            <Link href={forgotPasswordPath}className="md:text-sm mt-1 text-xs text-projectBlue hover:text-projectHoverBlue cursor-pointer inline">Forgot your password?</Link>
          </div>

          {/* Login Button */}
          <button className="mt-4 w-full md:h-20 rounded-md h-12 bg-loginButton text-projectWhite font-bold" type="submit" disabled={isLoading}>
            {!isLoading ? "Log In" : "Loading..."}
          </button>
          <p className="md:text-sm text-xs mt-1 text-projectGrey">Need an account? <Link href={registerPath} className="text-projectBlue hover:text-projectHoverBlue cursor-pointer">Register</Link></p>
        </form>  
      </div>
    </>
  )
}

function PasswordInput ({headerErrorStyle, headerStyle, errorMsg, value, setValue, handleKeyDown}) {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

return (
  <label className={`flex flex-col pt-5`}>
    <p className={`md:text-sm uppercase text-xs font-bold ${headerStyle}`}>Password<span className={`md:text-xs text-red-600 ${headerErrorStyle}`}>{errorMsg}</span></p>
    <div className="flex flex-row md:w-full md:h-12  mt-1 rounded-md h-10 text-projectWhite bg-login">
      <input className="w-full h-full rounded-md pl-3 bg-transparent" 
        required
        value={value}
        type={passwordVisible ? "text" : "password"}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        autoComplete="new-password"
      />
      <button className="px-2 text-projectWhite text-sm" type="button" onClick={togglePasswordVisibility}> 
        {passwordVisible ? "Hide" : "Show"}
        
      </button>
    </div>
  </label>

)
}