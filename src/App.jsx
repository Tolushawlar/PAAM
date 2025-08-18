import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import Navbar from './components/Navbar'

function App() {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <Dashboard />
      </div>
    </div>
  )
}

export default App
