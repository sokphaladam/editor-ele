import React from 'react';
import { DesktopMenu } from './components/DesktopMenu';

class App extends React.Component{
  render(){
    return(
      <div className="bg-dark">
        <DesktopMenu/>
      </div>
    )
  }
}

export default App;