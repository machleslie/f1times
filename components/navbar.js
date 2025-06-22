'use client';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const [latest, setLatest] = useState(null);

  useEffect(() => {
    fetch('https://api.openf1.org/v1/sessions?session_key=latest')
      .then(response => response.json())
      .then(data => {
        setLatest(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []); // Empty dependency array = run only once after component mounts

  
  const sessionKey = latest ? latest[0].session_key : 'Loading...';

  return (
    <div className="max-w-max font-bold text-7xl text-red-700">
      F1times
      <div className="text-base text-black mt-4">
        {sessionKey}
      </div>
    </div>
  );
};

export default Navbar;
