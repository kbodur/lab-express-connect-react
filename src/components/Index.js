// src/components/Index.js
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Index = () => {
  const [logs, setLogs] = useState([]);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('captainName');
  const API = process.env.REACT_APP_URL;

  useEffect(() => {
    fetch(API)
      .then(response => response.json())
      .then(data => setLogs(data))
      .catch(error => console.error('Error fetching logs:', error));
  }, [API]);

  const filteredLogs = logs.filter(log => {
    if (filter === 'all') return true;
    if (filter === 'mistakes') return log.mistakesWereMadeToday;
    if (filter === 'noMistakes') return !log.mistakesWereMadeToday;
    return true;
  });

  const sortedLogs = filteredLogs.sort((a, b) => {
    if (sortBy === 'captainName') {
      return a.captainName.localeCompare(b.captainName);
    } else {
      return a.daysSinceLastCrisis - b.daysSinceLastCrisis;
    }
  });

  return (
    <div className="index-page">
      <h1>Captain's Logs</h1>
      <div className='filter'>
        <label>
          Filter:
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="mistakes">Mistakes Made</option>
            <option value="noMistakes">No Mistakes</option>
          </select>
        </label>
        <label>
          Sort By:
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="captainName">Captain Name</option>
            <option value="daysSinceLastCrisis">Days Since Last Crisis</option>
          </select>
        </label>
      </div>
      <table className='tbl'>
        <thead>
          <tr>
            <th>Mistakes</th>
            <th>Captain Name</th>
            <th>See this log</th>
          </tr>
        </thead>
        <tbody>
          {sortedLogs.map((log, index) => (
            <tr key={index}>
              <td>{log.mistakesWereMadeToday ? '❌' : ''}</td>
              <td>{log.captainName}</td>
              <td><Link to={`/logs/${index}`}>{log.title}</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Index;
