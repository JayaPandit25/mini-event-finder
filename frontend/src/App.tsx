import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import EventListPage from './pages/EventListPage';
import EventDetailPage from './pages/EventDetailPage';
import CreateEventPage from './pages/CreateEventPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <Link to="/" className="text-xl font-bold text-gray-800">
                Event Discovery
              </Link>
              <Link
                to="/events/new"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Create Event
              </Link>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<EventListPage />} />
          <Route path="/events/new" element={<CreateEventPage />} />
          <Route path="/events/:id" element={<EventDetailPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;