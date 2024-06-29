// src/components/NewLog.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NewLog = () => {
  const navigate = useNavigate();
  const [log, setLog] = useState({
    captainName: '',
    title: '',
    post: '',
    mistakesWereMadeToday: false,
    daysSinceLastCrisis: 0,
  });
  const API = process.env.REACT_APP_URL;
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLog({
      ...log,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(log),
    })
      .then(() => navigate('/logs'))
      .catch(error => console.error('Error creating log:', error));
  };

  return (
    <div className="new-log-page">
      <h2>New</h2>
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

export default NewLog;
