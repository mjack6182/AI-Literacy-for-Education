import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Student from './pages/Student'
import Teacher from './pages/Teacher'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/student" element={<Student />} />
        <Route path="/teacher" element={<Teacher />} />
      </Routes>
    </BrowserRouter>
  )
}
