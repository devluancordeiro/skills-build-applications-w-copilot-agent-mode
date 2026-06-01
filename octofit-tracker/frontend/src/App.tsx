import { NavLink, Routes, Route } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const isCodespaceConfigured = Boolean(codespaceName);

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>OctoFit Tracker</h1>
        <p>Modern multi-tier application starter with React 19, Vite, Express, and MongoDB.</p>
        <nav className="app-nav">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/activities">Activities</NavLink>
          <NavLink to="/leaderboard">Leaderboard</NavLink>
          <NavLink to="/teams">Teams</NavLink>
          <NavLink to="/users">Users</NavLink>
          <NavLink to="/workouts">Workouts</NavLink>
        </nav>
        {!isCodespaceConfigured && (
          <div className="app-warning">
            <strong>Warning:</strong> VITE_CODESPACE_NAME is not defined.
            Set it in <code>frontend/.env.local</code> or use a local fallback before API calls work.
          </div>
        )}
      </header>

      <main className="app-content">
        <Routes>
          <Route
            path="/"
            element={
              <section>
                <h2>Welcome</h2>
                <p>
                  Use the navigation links above to view activities, leaderboard standings, teams,
                  users, and workouts.
                </p>
                <p>
                  API requests use <code>import.meta.env.VITE_CODESPACE_NAME</code> to build URLs like
                  <code>https://&lt;name&gt;-8000.app.github.dev/api/[resource]/</code>.
                </p>
              </section>
            }
          />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route
            path="*"
            element={
              <section>
                <h2>Page not found</h2>
                <p>The page you are looking for does not exist.</p>
              </section>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
