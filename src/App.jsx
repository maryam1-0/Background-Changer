import { useState, useCallback, useEffect,useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  //useRef hook, to get the reference of any element/object on your page
  const passwordRef=useRef(null)

  //caches/memorises a function definition bw re-renders and havee a dependency array, if any of that changes the function again calledand also memoization concept.when any of the dependency changes, optimise the method if runs again  
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    else if (charAllowed) str += "!@#$%^&*()~``+_-=";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

const copyPasswodToClipBoard=useCallback(()=>{

  passwordRef.current?.select()
 // passwordRef.current?.setSelectionRange(0,5)
   
  //by just writing this one line code our text is cpied to the clipboard ad is being pasted anywhere we want but we can't see if it's copied, it's showing no selection, no particular effects, to have those we make use of ref variable i.e PasswordRef.
  window.navigator.clipboard.writeText(password)
},[password])

  //any dependency changes, run it again
  useEffect(
    () => {
      passwordGenerator();
    },
    [ length, numberAllowed, charAllowed, passwordGenerator ]
  );

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 text-orange-500 bg-gray-800 my-8">
        <h1 className="my-2 text-2xl text-center text-white">
          Password generator
        </h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="rounded-sm w-full px-4 py-2 my-4"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button onClick={copyPasswodToClipBoard} className="hover:bg-blue-800 bg-blue-600 text-white outline-none shrink-0 mb-4 mt-4 ">
            Copy
          </button>
        </div>
        <div className="flex gap-x-3">
          <div className="flex gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              className="cursor-pointer"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="charInput"
              className="cursor-pointer"
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="charInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
