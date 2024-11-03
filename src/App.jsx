import { useCallback, useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [length, setlength] = useState(8);

  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);

  const [password, setpassword] = useState("");
  const passRef = useRef(null);
  const [btnClick, setbtnClick] = useState("bg-blue-800");

  
  // password generator
  const passGenerate = useCallback(() => {

    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!£$%^&*()[]{}¬`#";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char);
    }
    setpassword(pass)
  }, [length, numberAllowed, charAllowed, setpassword]);

  // console.log(password)

  // for copy password clipboard button
  const copyPasswordToClipboard = useCallback(() => {

    passRef.current?.select();
    window.navigator.clipboard.writeText(password);
    setbtnClick("bg-blue-500")
  }, [password, btnClick]);

  useEffect(() => {

    passGenerate();
    setbtnClick("bg-blue-800")
  }, [length, numberAllowed, charAllowed, passGenerate]);
  return (
    <>
      <div className="container max-w-[40rem] h-auto m-auto mt-5  rounded-2xl bg-gray-800">
        <h2 className='text-lime-200 font-extrabold text-3xl text-center'>Password Generator</h2>
        <div className="box mb-3 flex justify-center mt-5">
          <input type="text" ref={passRef} className='w-[30rem] rounded-s-lg outline-none' readOnly value={password} onChange={(e) => setpassword(e.target.value)} placeholder='Enter password' />
          <button onClick={copyPasswordToClipboard} className={`bg-blue-800 text-lime-50 p-2 px-4 rounded-e-lg ${btnClick} `}>copy</button>
        </div>
        <div className="box flex items-center justify-center gap-4 pb-10">
          <input type="range" min={6} max={100} value={length} onChange={(e) => setlength(e.target.value)} />
          <p className='text-[#ea580c]'>Length ({length})</p>
          <input type="checkbox" defaultChecked={numberAllowed} value={numberAllowed} onChange={() => setNumberAllowed((prev) => !prev)} /><span className='text-[#ea580c]'>Numbers</span>
          <input type="checkbox" value={charAllowed} onChange={() => setCharAllowed((prev) => !prev)} /><span className='text-[#ea580c]'>Characters</span>
        </div>
      </div>
    </>
  )
}

export default App
