import NotesForm from '../component/NotesForm'
import { Datacontext } from '../context/Datacontext'
import { v4 as uuidv4 } from 'uuid';
import './App.css'
import { useState } from 'react';

let data = [
  {
    id: uuidv4(),
    tit: "hello",
    descreption: "loaremhdsjjkskjhl",
    isDone: false,
  },
  {
    id: uuidv4(),
    tit: "hello 2",
    descreption: "dsfdsgrh",
    isDone: false,
  },
  {
    id: uuidv4(),
    tit: "hello3",
    descreption: "drehfjyifb",
    isDone: false,
  }
]
function App() {
  let [fulldata, upfulldata] = useState(data);

  return (
    // #191b1f good color
    <Datacontext.Provider value={{fulldata , upfulldata}}>
      <div
        className='flex items-center justify-center pt-10'
        style={{marginBottom: "50px"}}
        >
        <NotesForm />
      </div>
    </Datacontext.Provider>
  )
}

export default App
