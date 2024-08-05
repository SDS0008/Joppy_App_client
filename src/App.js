import Auth from './components/Auth/index'
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Jobs from './components/Jobs/Jobs';
import JobItemDetails from './components/JobItemDetails';




function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={ <Home /> }></Route>
        <Route path="/auth" element={ <Auth /> }></Route>
        <Route path="/jobs" element={ <Jobs /> }></Route>
        <Route path="/job/:id" element={ <JobItemDetails /> }></Route>


      </Routes>
    </>
  );
}

export default App;
