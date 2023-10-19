import './App.css';
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Header from './component/header/header';
import AddForm from './component/form/add-form';
import Dashboard from './component/dashboard/add-dashboard';

function App() {
  return (
    <BrowserRouter>
        <Header />
      <Routes>
        <Route path='/addform' element={<AddForm />} ></Route>
        <Route path='/' element={<Dashboard />}></Route>
        <Route path='/dashboard' element={<Dashboard />}></Route>
        <Route path='/editcontact/:id' element={<AddForm />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
