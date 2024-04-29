import { useState } from 'react';
import './App.css';
import LeftSide from './components/LeftSide';
import RightSide from './components/RightSide';
import groupImage from './assests/images/Group 1572.svg'

function App() {
  const [img, setImg] = useState(groupImage)
  const [userFirstName, setUserFirstName] = useState('back')
  const [userLastName, setUserLastName] = useState('')
  const [visible, setVisible] = useState(true)

  return (
    <div className='d-flex flex-column-reverse flex-md-row'>
      <LeftSide visible={visible} setVisible={setVisible} setImg={setImg} setUserFirstName={setUserFirstName} setUserLastName={setUserLastName}/>
      <RightSide userImage={img} userFirstName={userFirstName} userLastName={userLastName} visible={visible}/>
    </div>
  );
}

export default App;
