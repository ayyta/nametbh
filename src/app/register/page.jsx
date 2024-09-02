"use client"; 
import Link from "next/link"
import { Inter } from "next/font/google"
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import "../../styles/accountpages.css"
import { login } from "@/lib/auth"
const inter = Inter( {
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
  styles: ['normal', 'italic'],
})

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState({day: "", month: "", year: ""});
  const [error, setError] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [logInError, setLogInError] = useState(false);
  const loginPath = "/login";
  const router = useRouter();

  // Styles if user inputs bad input
  let headerStyle = logInError ? "text-red-600" : "";
  let headerErrorStyle = logInError ? "italic" : "";
  let errorMsg = logInError ? ` - Invalid input` : "*";
  let emailUsernameErrorMsg = logInError ? ` - ${error ? error: 'Invalid Input'}` : "*";
  let passwordErrorMsg = logInError ? " - Password must be atleast 6 characters" : "*";

  // If there is an error, set logInError to true
  useEffect(() => {
    error ? setLogInError(true) : setLogInError(false);
  }, [error]);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  // Submit function for login
  const handleLogin = async (e) => {
    e.preventDefault();

    if (validateEmail(email) === false || password.length < 6) {
      setLogInError(true);
      return;
    }
    //
    const dateOfBirthString = convertDateOfBirthToDate(dateOfBirth);

    const userInfo = {
      username,
      password,
      name,
      email,
      dateOfBirth: dateOfBirthString,
    }
    if (await handleRegister(userInfo, setError)) {
      setIsLoading(true);
      setError("");

      // Redirect to home page
      router.push("/home");
    };
    // TODO: Fetch request to backend, make async function and await response
  }

  // Can submit form with enter key
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && username && password) {
      handleLogin(e);
    }
  };


  useEffect(() => {
    // Styles if user inputs bad input
    headerStyle = logInError ? "text-red-600" : "";
    headerErrorStyle = logInError ? "italic" : "";
    errorMsg = logInError ? ` - Invalid input` : "*";
    emailUsernameErrorMsg = logInError ? ` - ${error ? error: 'Invalid Input'}` : "*";
    passwordErrorMsg = logInError ? " - Password must be atleast 6 characters" : "*";
  }, [logInError]);
  return (
    <>
      <div className="w-screen h-screen md:bg-login bg-loginPopup flex justify-center md:items-center ">
        {/* Login Popup */}
        <form onSubmit={handleLogin} className={`md:w-138 md:h-161 md:rounded-3xl md:px-16 md:py-7 py-16 w-full min-w-min	px-10 bg-loginPopup flex flex-col ${inter.className}`}>
          <p className="md:text-center md:text-2xl mb-4 text-2xl text-center font-bold ">Create an account</p>
          
          {/* Input Fields */}
          <InputComponent name="name" value={name} setValue={setName} logInError={logInError} handleKeyDown={handleKeyDown} headerStyle={headerStyle} headerErrorStyle={headerErrorStyle} errorMsg={errorMsg}/>
          <InputComponent name="email" value={email} setValue={setEmail} logInError={logInError} handleKeyDown={handleKeyDown} headerStyle={headerStyle} headerErrorStyle={headerErrorStyle} errorMsg={emailUsernameErrorMsg}/>
          <InputComponent name="username" value={username} setValue={setUsername} logInError={logInError} handleKeyDown={handleKeyDown} headerStyle={headerStyle} headerErrorStyle={headerErrorStyle} errorMsg={emailUsernameErrorMsg}/>
          <InputComponent name="password" value={password} setValue={setPassword} logInError={logInError} handleKeyDown={handleKeyDown} headerStyle={headerStyle} headerErrorStyle={headerErrorStyle} errorMsg={passwordErrorMsg}/>
          <DateOfBirth name="date of birth" value={dateOfBirth} setValue={setDateOfBirth} logInError={logInError} headerStyle={headerStyle} headerErrorStyle={headerErrorStyle} errorMsg={errorMsg}/>

          {/* Continue Button */}
          <button className="mt-5 w-full md:h-12 rounded-md h-12 bg-loginButton text-projectWhite font-bold" type="submit" disabled={isLoading}>
            {!isLoading ? "Continue" : "Loading..."} 
          </button>
          <div className="w-full">
            <Link href={loginPath} className="md:text-sm text-xs mt-1 text-projectBlue hover:text-projectHoverBlue cursor-pointer">Have an account?</Link>
          </div>
        </form>  
      </div>
    </>
  )
}

// Component for text input fields
function InputComponent({ name, value, setValue, handleKeyDown, headerStyle, headerErrorStyle, errorMsg }) {
  const style = name == "name" ? "" : "pt-5";
  return (
    <>
      <label className={`flex flex-col ${style}`}>
        <p className={`md:text-sm uppercase text-xs font-bold ${headerStyle}`}>{name}<span className={`md:text-xs text-red-600 ${headerErrorStyle}`}>{errorMsg}</span></p>
        <input className="md:w-full md:h-12 rounded-md mt-1 h-10 text-projectWhite bg-login pl-3" 
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

// Component for date of birth input field
function DateOfBirth({ name, value, setValue, headerStyle, headerErrorStyle, errorMsg }) {
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
          <DropUp value={value.month} setValue={(option) => handleDateChange("month", option)} placeHolder="Month" options={months}/>
          <DropUp value={value.day} setValue={(option) => handleDateChange("day", option)} placeHolder="Day" options={days}/>
          <DropUp value={value.year} setValue={(option) => handleDateChange("year", option)} placeHolder="Year" options={years}/>
        </div>
      </label>
    </>
  )
}

// Component for text dropup fields
function DropUp( props ) {
  const [isOpen, setIsOpen] = useState(false);
  const dropUpRef = useRef(null);
  const { value, setValue, placeHolder, options } = props;


  // Closes dropup menu when option is selected
  const handleOnClick = (option) => {
    setValue(option);
    setIsOpen(false);
  }

  // Closes dropup menu when clicked outside
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

  // Styles for dropup menu
  const dateStyle = "w-1/3 md:h-12 rounded-md mt-1 h-10 text-projectWhite bg-login px-2 relative flex items-center cursor-pointer";

  return (
    <div className={dateStyle} onClick={() => setIsOpen(!isOpen)} ref={dropUpRef}>

      {/* Text and arrow */}
      <div className={`${value ? "": "text-projectGrey"} flex-1 flex`} >
        {value || placeHolder}
        <span className={`arrow ${isOpen ? 'open' : ''} flex-1 w-full md:flex justify-end hidden`}>&#9650;</span>
      </div>

      {/* Dropup options */}
      {isOpen && (
        <div className="absolute bg-projectLightGrey flex flex-col dropup-menu">
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

// Convert date of birth object to string
function convertDateOfBirthToDate(dateOfBirth) {
  const monthMap = {
    January: '01',
    February: '02',
    March: '03',
    April: '04',
    May: '05',
    June: '06',
    July: '07',
    August: '08',
    September: '09',
    October: '10',
    November: '11',
    December: '12',
  };

  // Get the day, month, and year from the dateOfBirth object
  const day = String(dateOfBirth.day).padStart(2, '0'); // Ensure day is two digits
  const month = monthMap[dateOfBirth.month]; // Convert month name to number
  const year = String(dateOfBirth.year); // Convert year to string

  // Combine them into the YYYY-MM-DD format
  return `${year}-${month}-${day}`;
}

async function handleRegister(userInfo, setError) {
  try {
    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userInfo),
    });

    if (response.ok) {
      alert("User created!");
      return true;
    } else {
      const errorData = await response.json();
      setError(errorData.error);
      return false;
    }
  } catch (error) {
    setError(error.message);
    return false;
  }
}
