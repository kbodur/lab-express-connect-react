// src/components/Show.js
import { useParams, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

const Show = () => {
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

  const handleDelete = () => {
    fetch(`${API}/${index}`, { method: 'DELETE' })
      .then(() => navigate('/logs'))
      .catch(error => console.error('Error deleting log:', error));
    if (window.confirm('Are you sure you want to delete this log?')) {
      // Perform delete action
    }
  };

  if (!log) return <p>Loading...</p>;

  return (
    <div >
        <h1>Show</h1> 
        <div className="show-page">
      <h2>{log.title} - By {log.captainName}</h2>
      <p>{log.post}</p>
      <p>Days since last crisis: {log.daysSinceLastCrisis}</p>
      </div>
      
      <button onClick={() => navigate('/logs')} className='btn-back'>Back</button>
      <button onClick={() => navigate(`/logs/${index}/edit`)} className='btn-edit'>Edit</button>
      <button onClick={handleDelete} className='btn-delete'>Delete</button>
    </div>
  );
};

export default Show;
