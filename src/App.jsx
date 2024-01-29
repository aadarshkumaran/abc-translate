import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [option,setOption] = useState([])
  const [to,setTo] = useState("")
  const [from,setFrom] = useState("")
  const [input,setInput] = useState("")
  const [output,setOutput] = useState("")

  const translate = () =>{
    const params = new URLSearchParams()
    params.append('q',input)
    params.append('source',from)
    params.append('target',to)
    params.append('format','text')
    params.append('api_key','xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx')//need to purchase api key for this
    axios.post(`https://libretranslate.com/translate`,params,{headers:{'accept':'application/json'
    ,'Content-Type':'application/x-www-form-urlencoded'}},).then(res=>{console.log(res.data)
    setOutput(res.data.translatedText)}
    )
  }

  // curl -X 'GET' \
  // 'https://libretranslate.com/languages' \
  // -H 'accept: application/json'

  useEffect(()=>{
    axios.get(`https://libretranslate.com/languages`,{headers:{'accept':'application/json'}}).then(res=>{
      console.log(res.data);
      setOption(res.data)
    })
  },[])

  return (
    <>
    <h1 className='text-2xl'>ABC Translate - Beta</h1>
      <div className="md:flex justify-center">
        <div className="from">
          <span>From ({from}): </span>
          <select className='px-2.5' onChange={e=>setFrom(e.target.value)}>
            {option.map((option)=><option value={option.code} key={option.code}>{option.name}</option>)}
          </select>
        </div>
        <div className="to">
          <span>To : ({to})</span>
          <select className='px-2.5' onChange={e=>setTo(e.target.value)}>
          {option.map((option)=><option value={option.code} key={option.code}>{option.name}</option>)}
          </select>
        </div>
      </div>
      <div className="sm:flex justify-center">
        <div className=""><textarea cols="50" rows="8" onInput={e=>setInput(e.target.value)} className='block p-2.5 rounded-lg bg-gray-100 border border-gray-300'></textarea></div>
        <div className=""><textarea cols="50" rows="8" value={output} className='block p-2.5 rounded-lg bg-gray-100 border border-gray-300'></textarea></div>
      </div>
      <button onClick={e=>translate()} className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>Translate</button>
    </>
  )
}

export default App
