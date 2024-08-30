import { useState,useCallback, useEffect, useRef } from "react"



function App() {
  let [length,setlength]=useState(8);
  let [numAllowed,setnumAllowed]=useState(false);
  let [charAllowed,setcharAllowed]=useState(false);
  let [password,setpassword]=useState("");
  //use ref hook
  const passwordRef=useRef(null);
  const copyPass=useCallback(()=>{
    window.navigator.clipboard.writeText(password);
    alert("Copied")

  },[password])

  //use callback
  const passwordGenerator=useCallback(()=>
    {
      let pass="";
      let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      if(numAllowed){
        str+="1234567890";
      }
      if(charAllowed){
        str+="!@#$%^&*_+=[]{}~`";
      }
      
      for (let i = 0; i < length; i++) {  
        let charIndex = Math.floor(Math.random() * str.length);
        pass += str.charAt(charIndex);  
      }
      setpassword(pass);
    

   },[length,numAllowed,charAllowed]);

  //  useEffect(()=>{  passwordGenerator,[length,numAllowed,charAllowed,passwordGenerator]}); error runs infinitly

  return (
    <>
    <div id="body" className=" bg-slate-800 h-screen w-screen">
      <div id="nav" className="text-center pt-4 font-bold text-2xl pb-4 text-gray-300 bg-slate-800 border-b-2 border-black"> Password Generator </div>
      <div id="content" className=" bg-slate-800 w-screen h-screen flex justify-center items-center ">
        <div id="passG" className="  bg-slate-400 px-20 py-14 space-y-7 rounded-lg border-gray-300 border-2 shadow-lg">
          <div className=" space-x-5">
          <input type="text" readOnly value={password} placeholder="Password" className="  text-black px-4 rounded-md py-2 border-2 border-black bg-slate-500 font-medium"  ref={passwordRef}/> 
          <button className=" border-2 border-black px-3 py-2 bg-blue-400 rounded-md font-bold text-white" onClick={copyPass}>Copy</button>
          <button className=" border-2 border-black px-3 py-2 bg-green-400 rounded-md font-bold" onClick={passwordGenerator}>Generate</button>
          </div>
          <div className=" space-x-6 flex">
          <div className=" flex items-center space-x-2 "><input type="range" value={length} min={8} max={15} className=" cursor-pointer" onChange={(e)=>{setlength(e.target.value)}} /> <label className=" font-semibold text-black" > Length:{length }</label></div>
          <div className=" flex items-center space-x-2"><input type="checkbox" id="numInput" value={numAllowed} onChange={()=>{setcharAllowed((prev)=>!prev)}}/> <label className=" font-semibold text-black">Characters</label></div>
          <div className=" flex items-center space-x-2"><input type="checkbox" id="numInput" value={numAllowed} onChange={()=>{setnumAllowed((prev)=>!prev)}}/> <label className=" font-semibold text-black">Numbers </label></div>
          </div>
        </div>
        
      </div>
    </div>
    </>
  )
}

export default App
