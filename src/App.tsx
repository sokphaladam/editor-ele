import React from 'react';
import { DesktopMenu } from './components/DesktopMenu';
import { Container } from './components/Container';
import { LoginScreen } from './screen/LoginScreen';

class App extends React.Component{
  render(){
    return(
      <div className="bg-dark">
        <DesktopMenu/>
        <Container>
          <LoginScreen/>
        </Container>
      </div>
    )
  }
}

export default App;