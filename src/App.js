import { useState } from 'react';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoginForm from './components/LoginForm';
import PetList from './components/PetList';

function App() {
  const [auth, setAuth] = useState(null);
  const [screen, setScreen] = useState('/login');

  function onNavigate(evt, href) {
    evt.preventDefault();
    setScreen(href);
  }

  function onLogin(auth) {
    setAuth(auth);
    setScreen('/pet/list');
  }

  function onLogout() {
    setAuth(null);
    setScreen('/login');
  }

  return (
    <div className="App min-vh-100 d-flex flex-column">
      <Navbar auth={auth} screen={screen} onNavigate={onNavigate} />
      <div className="flex-grow-1">
        <main className="container my-5">
          {screen === '/login' && <LoginForm onLogin={onLogin}/>}
          {screen === '/pet/list' && <PetList auth={auth}/>}
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default App;
