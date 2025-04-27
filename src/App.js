import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Students from './pages/Students';
import HonorCandidate from './pages/HonorCandidates';
import AddStudent from './pages/AddStudent';
import UpdateStudent from './pages/UpdateStudent';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Students />} />  
          <Route path="/honor-candidates" element={<HonorCandidate />} />
          <Route path="/add-student" element={<AddStudent />} />
          <Route path="/update-student" element={<UpdateStudent />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
