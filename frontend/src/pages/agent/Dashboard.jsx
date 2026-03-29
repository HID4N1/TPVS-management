import { useAuth } from '../../auth/useAuth';

export default function AgentDashboard() {
  const { user } = useAuth();


  return (
    <div className="dashboard-content">
      <div className="welcome-section">
        <h1>Welcome, Agent {user?.name || user?.email}</h1>
        <p>Manage your daily operations</p>
      </div>
    </div>
  );
}

