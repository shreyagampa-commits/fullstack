import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Navbar from './Navbar'; 
import Signup from './Signup'; 
import About from './About'; 
import History from './History'; 
import Login from './Login'; 
import './App.css';
import Upload from './Upload';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/history" element={<History />} />
        <Route path="/" element={<Login />} />
        <Route path="/Upload" element={<Upload />} />
      </Routes>
    </Router>
  );
}

export default App;
