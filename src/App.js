import './style/file.css'
import LoginPage from './LoginPage_1';
import { useState } from 'react';
import FormPage from './FormPage';

function App() {
  let [unlock , setunlock] = useState(false)
  function preData(da){
    setunlock(da)
  }
  return (
    <div className="App">
      {
        unlock?<FormPage/>:
        <LoginPage item={preData}></LoginPage>
      }
      {/* <FormPage/> */}
    </div>
  );
}

export default App;
