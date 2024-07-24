"use client"; 
import Link from "next/link"
import { Inter } from "next/font/google"
import { useState, useEffect, useRef } from "react"

const inter = Inter( {
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
  styles: ['normal', 'italic'],
})

export default function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [ dateOfBirth, setDateOfBirth ] = useState({day: "", month: "", year: ""});

  const [isLoading, setIsLoading] = useState(false);
  const [logInError, setlogInError] = useState(false);
  const loginPath = "/login";

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  // Submit function for login
  const handleLogin = (e) => {
    e.preventDefault();
    setlogInError(false);
    if (validateEmail(email) === false) {
      setlogInError(true);
      return;
    }
    setIsLoading(true);

    const userInfo = {
      username,
      password,
      email,
      dateOfBirth
    }

    console.log("User Info: ", userInfo);
    // Fetch request to backend, make async function and await response
  }

  const handleKeyDown = (e) => {
  
    if (e.key === 'Enter' && username && password) {
      handleLogin(e);
    }
  };

  const handleInputChange = (value) => {
    setEmail(value);
  };

  // Styles if user inputs wrong email or password
  const headerStyle = logInError ? "text-red-600" : "";
  const headerErrorStyle = logInError ? "italic" : "";
  const errorMsg = logInError ? " - Invalid email or password" : "*";



  return (
    <>
      <div className="w-screen h-screen md:bg-login bg-loginPopup flex justify-center md:items-center ">
        {/* Login Popup */}
        <form onSubmit={handleLogin} className={`md:w-138 md:h-161 md:rounded-3xl md:px-16 md:py-7 py-16 w-full min-w-min	px-10 bg-loginPopup flex flex-col ${inter.className}`}>
          <p className="md:text-center md:mb-7 md:text-2xl mb-7 text-2xl text-center font-bold ">Create an account</p>

          <InputComponent name="email" value={email} setValue={setEmail} logInError={logInError} handleKeyDown={handleKeyDown}/>
          <InputComponent name="username" value={username} setValue={setUsername} logInError={logInError} handleKeyDown={handleKeyDown}/>
          <InputComponent name="password" value={password} setValue={setPassword} logInError={logInError} handleKeyDown={handleKeyDown}/>
          <DateOfBirth name="date of birth" value={dateOfBirth} setValue={setDateOfBirth} logInError={logInError} handleKeyDown={handleKeyDown}/>

          {/* Login Button */}
          <button className="mt-4 w-full md:h-12 rounded-md h-12 bg-loginButton text-projectWhite font-bold" type="submit" disabled={isLoading}>
            {!isLoading ? "Continue" : "Loading..."} 
          </button>
          <Link href={loginPath} className="md:text-sm text-xs mt-1 text-projectBlue hover:text-projectHoverBlue cursor-pointer">Need an account?</Link>
        </form>  
      </div>
    </>
  )
}

function InputComponent({ name, value, setValue, logInError, handleKeyDown }) {
  // Styles if user inputs wrong email or password
  const headerStyle = logInError ? "text-red-600" : "";
  const headerErrorStyle = logInError ? "italic" : "";
  const errorMsg = logInError ? " - Invalid input" : "*";

  const style = name == "email" ? "" : "pt-5";
  return (
    <>
      <label className={`flex flex-col ${style}`}>
        <p className={`md:text-sm uppercase text-xs font-bold ${headerStyle}`}>{name}<span className={`md:text-xs text-red-600 ${headerErrorStyle}`}>{errorMsg}</span></p>
        <input className="md:w-full md:h-12 md:rounded-md mt-1 h-10 text-projectWhite bg-login pl-3" 
          required
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          autoComplete="new-password"

          />
      </label>
    </>
  )

}

function DateOfBirth({ name, value, setValue, logInError, handleKeyDown }) {
  // Styles if user inputs wrong email or password
  const headerStyle = logInError ? "text-red-600" : "";
  const headerErrorStyle = logInError ? "italic" : "";
  const errorMsg = logInError ? " - Invalid input" : "*";

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const years = Array.from({ length: 91 }, (_, i) => new Date().getFullYear() - i - 13);

  const handleDateChange = (field, value) => {
    console.log("Field: ", field, "Value: ", value);
    setValue((prevValue) => ({
      ...prevValue,
      [field]: value
    }));
  }
  return (
    <>
      <label className="flex flex-col pt-5">
        <p className={`md:text-sm uppercase text-xs font-bold ${headerStyle}`}>{name}<span className={`md:text-xs text-red-600 ${headerErrorStyle}`}>{errorMsg}</span></p>
        <div className="flex gap-2 relative">
          {/* Month, Day, Year for DOB */}
          <DropUp label="Month" value={value.month} setValue={(option) => handleDateChange("month", option)} placeHolder="Month" options={months}/>
          <DropUp label="Day" value={value.day} setValue={(option) => handleDateChange("day", option)} placeHolder="Day" options={days}/>
          <DropUp label="Year" value={value.year} setValue={(option) => handleDateChange("year", option)} placeHolder="Year" options={years}/>
        </div>
      </label>
    </>
  )
}

function DropUp( props ) {
  const [isOpen, setIsOpen] = useState(false);
  const dropUpRef = useRef(null);
  const { label, value, setValue, placeHolder, options } = props;

  const handleOnClick = (option) => {
    setValue(option);
    setIsOpen(false);
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropUpRef.current && !dropUpRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  const dateStyle = "md:w-1/3 md:h-12 md:rounded-md mt-1 h-10 text-projectWhite bg-login px-2 relative flex items-center cursor-pointer";

  return (
    <div className={dateStyle} onClick={() => setIsOpen(!isOpen)} ref={dropUpRef}>
      <div className={`${value ? "": "text-projectGrey"} flex-1 flex`} >
        {value || placeHolder}
        <span className={`arrow ${isOpen ? 'open' : ''} flex-1 w-full flex justify-end`}>&#9650;</span>
      </div>
      {isOpen && (
        <div className="absolute bg-login flex flex-col dropup-menu">
          {options.map((option, i) => (
            <div 
              key={i}
              className="text-lg p-2 hover:bg-login hover:text-projectWhite cursor-pointer"
              onClick={() => handleOnClick(option)}
            >
              {option}
            </div>
          ))}
        
        </div>
      )}
    </div>
  )
}