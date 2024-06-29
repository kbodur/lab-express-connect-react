// src/components/EditLog.js
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const EditLog = () => {
  const { index } = useParams();
  const navigate = useNavigate();
  const [log, setLog] = useState(null);
  const API = process.env.REACT_APP_URL;
  useEffect(() => {
    fetch(`${API}/${index}`)
      .then(response => response.json())
      .then(data => setLog(data))
      .catch(error => console.error('Error fetching log:', error));
  }, [index]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLog({
      ...log,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${API}/${index}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(log),
    })
      .then(() => navigate(`/logs/${index}`))
      .catch(error => console.error('Error updating log:', error));
  };

  if (!log) return <p>Loading...</p>;

  return (
    <div className="edit-log-page">
      <h2>Edit</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Captain's Name:
          <input type="text" name="captainName" value={log.captainName} onChange={handleChange} />
        </label>
        <label>
          Title:
          <input type="text" name="title" value={log.title} onChange={handleChange} />
        </label>
        <label>
          Post:
          <textarea name="post" value={log.post} onChange={handleChange}></textarea>
        </label>
        <label>
          Days since Last Crisis:
          <input type="number" name="daysSinceLastCrisis" value={log.daysSinceLastCrisis} onChange={handleChange} />
        </label>
        <label>
          Mistakes were made today:
          <input type="checkbox" name="mistakesWereMadeToday" checked={log.mistakesWereMadeToday} onChange={handleChange} />
        </label>
        <button type="submit" className='btn'>Submit</button>
      </form>
    </div>
  );
};

export default EditLog;
