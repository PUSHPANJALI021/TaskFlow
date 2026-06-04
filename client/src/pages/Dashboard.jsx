import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDesc] = useState('');
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  useEffect(() => { fetchTasks(); }, []);

  const fetchTasks = async () => {
    try {
      const { data } = await api.get('/tasks');
      setTasks(data);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async () => {
    if (!title.trim()) return;
    setAdding(true);
    await api.post('/tasks', { title, description });
    setTitle(''); setDesc('');
    setAdding(false);
    fetchTasks();
  };

  const toggleStatus = async (id) => {
    await api.patch(`/tasks/${id}`);
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await api.delete(`/tasks/${id}`);
    fetchTasks();
  };

  const pending = tasks.filter(t => t.status === 'pending').length;
  const completed = tasks.filter(t => t.status === 'completed').length;

  return (
    <div style={s.page}>
      <div style={s.blob1} />
      <div style={s.blob2} />
      <div style={s.blob3} />

      {/* Navbar */}
      <nav style={s.nav}>
        <div style={s.navBrand}>
          <div style={s.navIcon}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
            </svg>
          </div>
          <span style={s.navTitle}>TaskFlow</span>
        </div>
        <div style={s.navRight}>
          <span style={s.navUser}>👋 {user?.name}</span>
          <button onClick={logout} style={s.logoutBtn}>Logout</button>
        </div>
      </nav>

      <div style={s.content}>
        {/* Stats */}
        <div style={s.statsRow}>
          <div style={s.statCard}>
            <div style={s.statNum}>{tasks.length}</div>
            <div style={s.statLabel}>Total Tasks</div>
          </div>
          <div style={{...s.statCard, ...s.statCardPending}}>
            <div style={s.statNum}>{pending}</div>
            <div style={s.statLabel}>Pending</div>
          </div>
          <div style={{...s.statCard, ...s.statCardDone}}>
            <div style={s.statNum}>{completed}</div>
            <div style={s.statLabel}>Completed</div>
          </div>
        </div>

        {/* Add Task */}
        <div style={s.addCard}>
          <h2 style={s.sectionTitle}>Add New Task</h2>
          <div style={s.addRow}>
            <input
              placeholder="What needs to be done?"
              value={title}
              onChange={e => setTitle(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addTask()}
              style={s.input}
              onFocus={e => e.target.style.borderColor = '#a78bfa'}
              onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.12)'}
            />
            <input
              placeholder="Description (optional)"
              value={description}
              onChange={e => setDesc(e.target.value)}
              style={{...s.input, flex: '0 0 220px'}}
              onFocus={e => e.target.style.borderColor = '#a78bfa'}
              onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.12)'}
            />
            <button onClick={addTask} disabled={adding} style={s.addBtn}>
              {adding ? '...' : '+ Add Task'}
            </button>
          </div>
        </div>

        {/* Task List */}
        <div style={s.tasksSection}>
          <h2 style={s.sectionTitle}>Your Tasks</h2>
          {loading ? (
            <div style={s.empty}>Loading...</div>
          ) : tasks.length === 0 ? (
            <div style={s.empty}>No tasks yet. Add one above! 🚀</div>
          ) : (
            <div style={s.taskList}>
              {tasks.map(task => (
                <div key={task._id} style={task.status === 'completed' ? {...s.taskCard, ...s.taskCardDone} : s.taskCard}>
                  <div style={s.taskLeft}>
                    <button onClick={() => toggleStatus(task._id)} style={task.status === 'completed' ? {...s.checkbox, ...s.checkboxDone} : s.checkbox}>
                      {task.status === 'completed' && (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      )}
                    </button>
                    <div>
                      <div style={task.status === 'completed' ? {...s.taskTitle, ...s.taskTitleDone} : s.taskTitle}>
                        {task.title}
                      </div>
                      {task.description && <div style={s.taskDesc}>{task.description}</div>}
                    </div>
                  </div>
                  <div style={s.taskRight}>
                    <span style={task.status === 'completed' ? {...s.badge, ...s.badgeDone} : s.badge}>
                      {task.status}
                    </span>
                    <button onClick={() => deleteTask(task._id)} style={s.deleteBtn} title="Delete">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const s = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
    fontFamily: "'Segoe UI', sans-serif",
    position: 'relative',
    overflowX: 'hidden',
  },
  blob1: {
    position: 'fixed', width: 500, height: 500, borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(167,139,250,0.15) 0%, transparent 70%)',
    top: '-150px', left: '-150px', pointerEvents: 'none', zIndex: 0,
  },
  blob2: {
    position: 'fixed', width: 600, height: 600, borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)',
    bottom: '-200px', right: '-200px', pointerEvents: 'none', zIndex: 0,
  },
  blob3: {
    position: 'fixed', width: 300, height: 300, borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(236,72,153,0.1) 0%, transparent 70%)',
    top: '40%', right: '10%', pointerEvents: 'none', zIndex: 0,
  },
  nav: {
    position: 'sticky', top: 0, zIndex: 100,
    background: 'rgba(15,12,41,0.7)',
    backdropFilter: 'blur(20px)',
    borderBottom: '1px solid rgba(255,255,255,0.08)',
    padding: '0 32px',
    height: 64,
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
  },
  navBrand: { display: 'flex', alignItems: 'center', gap: 10 },
  navIcon: {
    width: 36, height: 36, borderRadius: 10,
    background: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  navTitle: { color: '#fff', fontWeight: 700, fontSize: 18 },
  navRight: { display: 'flex', alignItems: 'center', gap: 16 },
  navUser: { color: 'rgba(255,255,255,0.6)', fontSize: 14 },
  logoutBtn: {
    background: 'rgba(255,255,255,0.07)',
    border: '1px solid rgba(255,255,255,0.12)',
    color: 'rgba(255,255,255,0.7)',
    borderRadius: 8, padding: '7px 16px', fontSize: 13,
    cursor: 'pointer',
  },
  content: {
    maxWidth: 800, margin: '0 auto', padding: '32px 24px',
    position: 'relative', zIndex: 1,
  },
  statsRow: {
    display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 28,
  },
  statCard: {
    background: 'rgba(255,255,255,0.06)',
    backdropFilter: 'blur(12px)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 16, padding: '20px 24px',
  },
  statCardPending: { borderColor: 'rgba(251,191,36,0.2)', background: 'rgba(251,191,36,0.06)' },
  statCardDone: { borderColor: 'rgba(52,211,153,0.2)', background: 'rgba(52,211,153,0.06)' },
  statNum: { color: '#fff', fontSize: 32, fontWeight: 700, lineHeight: 1 },
  statLabel: { color: 'rgba(255,255,255,0.45)', fontSize: 13, marginTop: 6 },
  addCard: {
    background: 'rgba(255,255,255,0.05)',
    backdropFilter: 'blur(12px)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 20, padding: '24px 28px', marginBottom: 28,
  },
  sectionTitle: {
    color: '#fff', fontSize: 16, fontWeight: 600, margin: '0 0 16px',
  },
  addRow: { display: 'flex', gap: 12, flexWrap: 'wrap' },
  input: {
    flex: 1, minWidth: 160,
    background: 'rgba(255,255,255,0.07)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: 10, padding: '11px 14px',
    color: '#fff', fontSize: 14, outline: 'none',
    transition: 'border-color 0.2s',
  },
  addBtn: {
    background: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
    color: '#fff', border: 'none', borderRadius: 10,
    padding: '11px 22px', fontSize: 14, fontWeight: 600,
    cursor: 'pointer', whiteSpace: 'nowrap',
    boxShadow: '0 4px 15px rgba(124,58,237,0.3)',
  },
  tasksSection: {
    background: 'rgba(255,255,255,0.05)',
    backdropFilter: 'blur(12px)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 20, padding: '24px 28px',
  },
  taskList: { display: 'flex', flexDirection: 'column', gap: 12 },
  taskCard: {
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 14, padding: '14px 18px',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    gap: 12, transition: 'background 0.2s',
  },
  taskCardDone: {
    background: 'rgba(52,211,153,0.05)',
    borderColor: 'rgba(52,211,153,0.15)',
  },
  taskLeft: { display: 'flex', alignItems: 'center', gap: 14, flex: 1, minWidth: 0 },
  checkbox: {
    width: 22, height: 22, borderRadius: 6, flexShrink: 0,
    border: '2px solid rgba(255,255,255,0.2)',
    background: 'transparent', cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    transition: 'all 0.2s',
  },
  checkboxDone: {
    background: 'linear-gradient(135deg, #10b981, #059669)',
    border: '2px solid #10b981',
  },
  taskTitle: {
    color: '#fff', fontSize: 15, fontWeight: 500,
    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
  },
  taskTitleDone: {
    color: 'rgba(255,255,255,0.35)',
    textDecoration: 'line-through',
  },
  taskDesc: {
    color: 'rgba(255,255,255,0.4)', fontSize: 13, marginTop: 3,
  },
  taskRight: { display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 },
  badge: {
    background: 'rgba(251,191,36,0.15)',
    color: '#fbbf24',
    border: '1px solid rgba(251,191,36,0.25)',
    borderRadius: 6, padding: '3px 10px', fontSize: 12, fontWeight: 500,
  },
  badgeDone: {
    background: 'rgba(52,211,153,0.15)',
    color: '#34d399',
    borderColor: 'rgba(52,211,153,0.25)',
  },
  deleteBtn: {
    background: 'rgba(239,68,68,0.1)',
    border: '1px solid rgba(239,68,68,0.2)',
    color: '#f87171', borderRadius: 7,
    width: 32, height: 32,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    cursor: 'pointer',
  },
  empty: {
    color: 'rgba(255,255,255,0.35)', fontSize: 15,
    textAlign: 'center', padding: '40px 0',
  },
};
