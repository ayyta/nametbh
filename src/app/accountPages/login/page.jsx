"use client"; 
import Link from "next/link"
import { Inter } from "next/font/google"
import { useState, useRef } from "react"

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

  
  const registerPath = "/register";
  const forgotPasswordPath = "/register"; // PLACEHOLDER: Change to forgot password path

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  // Submit function for login
  const handleLogin = (e) => {
    e.preventDefault();
    setlogInError(false);
    if (validateEmail(username) === false) {
      setlogInError(true);
      return;
    }
    setIsLoading(true);

    const userInfo = {
      username,
      password
    }

    console.log("User Info: ", userInfo);
    // Fetch request to backend, make async function and await response
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && username && password) {
      handleLogin(e);
    }
  };

  // Styles if user inputs wrong email or password
  const headerStyle = logInError ? "text-red-600" : "";
  const headerErrorStyle = logInError ? "italic" : "";
  const errorMsg = logInError ? " - Invalid email or password" : "*";

  return (
    <>
      <div className="w-screen h-screen md:bg-login bg-loginPopup flex justify-center md:items-center ">
        {/* Login Popup */}
        <form onSubmit={handleLogin} className={`md:w-161 md:h-96 md:rounded-3xl md:px-16 md:py-7 py-16 w-full min-w-min	px-10 bg-loginPopup flex flex-col ${inter.className}`}>
          <p className="md:text-center md:mb-7 md:text-2xl mb-7 text-2xl text-center font-bold ">Welcome back!</p>

          {/* Email/Number Input */}
          <label className="flex flex-col">
            <p className={`md:text-sm uppercase text-xs font-bold ${headerStyle}`}>Email or phone number <span className={`md:text-xs text-red-600 ${headerErrorStyle}`}>{errorMsg}</span></p>
            <input className="md:w-full md:h-12 md:rounded-md mt-1 h-10 text-projectWhite bg-login pl-3" 
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={handleKeyDown}
              />
          </label>

          {/* Password Input */}
          <label className="flex flex-col pt-5">
            <p className={`md:text-sm uppercase text-xs font-bold ${headerStyle}`}>Password <span className={`md:text-xs text-red-600 ${headerErrorStyle}`}>{errorMsg}</span></p>
            <input className="md:w-full md:h-12 md:rounded-md h-10 text-projectWhite bg-login pl-3" 
              required
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
              />
          </label> 

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