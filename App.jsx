import { useState, useCallback, useEffect, useRef} from "react";

function App() {
  const [length, setLength] = useState(10);
  const [number, setNumber] = useState(false);
  const [characters, setCharacters] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null)

  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (number) str += "0123456789";
    if (characters) str += "!@#$%^&*_+~/?-";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, number, characters, setPassword]);


  const copyPassword = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  } ,
  [password])
  useEffect(() => {
    generatePassword()
  } ,
  [length, number, characters, generatePassword])


  return (
    <>
      <h1 className="text-3xl text-center font-bold underline m-3">
        Password Generator
      </h1>

      <div className="w-full rounded-lg shadow-md rounded-lg px-8 text-black-500 bg-orange-300">

        <div className="flex rounded-lg ovrflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-2 text-center bg-gray-500 rounded-lg text-white"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          ></input>

          <button 
          onClick={copyPassword}
          className="outline-none bg-blue-500 text-white px-5 py-1 rounded-lg">
            copy
          </button>

        </div>

        <div className="flex text-sm justify-center gap-x-5 py-3">
          <div className="flex iems-center gap-x-1">
            <input
              type="range"
              min={6}
              max={20}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>length : {length}</label>
          </div>

          <div className="flex iems-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={number}
              id="numberInput"
              onChange={() => {
                setNumber((prev) => !prev);
              }}
            ></input>
            <label>Include Numbers</label>
          </div>

          <div className="flex iems-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={characters}
              id="characterInput"
              onChange={() => {
                setCharacters((prev) => !prev);
              }}
            ></input>
            <label>Include Special Characters</label>
          </div>
        </div>

      </div>
    </>
  );
}

export default App;