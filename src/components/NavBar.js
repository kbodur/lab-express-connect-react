// src/components/Navbar.js
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li className='captain'><Link to="/logs">Captain's Logs</Link></li>
        <li className='new'><Link to="/logs/new">New Log</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
