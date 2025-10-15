import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [flagResponse, setFlagResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/');
      return;
    }

    // Decode JWT to show user info (client-side only for display)
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUser(payload);
    } catch (err) {
      router.push('/');
    }
  }, [router]);

  const attemptGetFlag = async () => {
    setLoading(true);
    setFlagResponse(null);

    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const res = await fetch('/api/flag', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setFlagResponse({ status: res.status, data });
    } catch (err) {
      setFlagResponse({ error: 'Request failed' });
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    router.push('/');
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Dashboard</h1>

        <div style={styles.userInfo}>
          <h2 style={styles.sectionTitle}>User Information</h2>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Role:</strong> {user.role}</p>
          <p style={styles.roleWarning}>
            {user.role === 'admin' ? '✅ Admin Access' : '⚠️ Limited Access'}
          </p>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Get the Flag</h2>
          <p style={styles.description}>
            Click the button below to attempt to retrieve the flag. Only admins have access!
          </p>

          <button onClick={attemptGetFlag} disabled={loading} style={styles.button}>
            {loading ? 'Checking...' : '🚩 Get Flag'}
          </button>

          {flagResponse && (
            <div style={{
              ...styles.response,
              background: flagResponse.status === 200 ? '#d4edda' : '#f8d7da',
              borderColor: flagResponse.status === 200 ? '#c3e6cb' : '#f5c6cb',
            }}>
              <p><strong>Status:</strong> {flagResponse.status}</p>
              <pre style={styles.pre}>{JSON.stringify(flagResponse.data, null, 2)}</pre>
            </div>
          )}
        </div>

        <button onClick={logout} style={styles.logoutButton}>
          Logout
        </button>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: '100vh',
    padding: '20px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  card: {
    background: 'white',
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
    maxWidth: '800px',
    margin: '0 auto',
  },
  title: {
    margin: '0 0 30px 0',
    fontSize: '32px',
    color: '#333',
  },
  userInfo: {
    background: '#f8f9fa',
    padding: '20px',
    borderRadius: '5px',
    marginBottom: '30px',
  },
  sectionTitle: {
    fontSize: '20px',
    margin: '0 0 15px 0',
    color: '#333',
  },
  roleWarning: {
    marginTop: '10px',
    fontSize: '16px',
    fontWeight: 'bold',
  },
  section: {
    marginBottom: '30px',
  },
  description: {
    color: '#666',
    marginBottom: '15px',
  },
  button: {
    padding: '12px 24px',
    fontSize: '16px',
    background: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  response: {
    marginTop: '20px',
    padding: '15px',
    borderRadius: '5px',
    border: '1px solid',
  },
  pre: {
    margin: '10px 0 0 0',
    overflow: 'auto',
    fontSize: '14px',
  },
  logoutButton: {
    padding: '10px 20px',
    fontSize: '14px',
    background: '#e74c3c',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};
