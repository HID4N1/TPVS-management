import { useAuth } from '../../../auth/useAuth';

export default function AdminDashboard() {
  const { user } = useAuth();
  return (
    <div className="dashboard-content">
      <div className="welcome-section">
        <h1>Welcome, Admin {user?.last_name}</h1>
        <p>Manage agents, finances, operations</p>
      </div>
      
    </div>
  );
}

