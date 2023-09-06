import './App.css';
import { Routes, Route } from "react-router-dom";
import Header from './Header';
import Post from './Post';
import Login from './Login';

function App() {
  return (
    <Routes>
      <Route
        index
        element={
          <main>
            <Header />
            <Post />
            <Post />
          </main>
        }
      />

      <Route
        path={'/login'}
        element={
          <div>
            <Header />
            <Login />
          </div>
        }
      />

      <Route
        path={'/logout'}
        element={
          <main>
        <Header />
      
          </main>
    
          
          
        }
      />
    </Routes>
  );
}

export default App;
