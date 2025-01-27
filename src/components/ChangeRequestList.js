import React, { useEffect, useState } from 'react';
import ChangeRequestItem from './ChangeRequestItem';

const ChangeRequestList = () => {
  const [changeRequests, setChangeRequests] = useState([]);

  useEffect(() => {
    // Fetch all change requests from the backend
    fetch('http://localhost:8080/api/cr')
      .then((response) => response.json())
      .then((data) => setChangeRequests(data))
      .catch((error) => console.error('Error fetching CR data:', error));
  }, []);

  return (
    <div>
      <h3>Change Requests</h3>
      <ul>
        {changeRequests.map((cr) => (
          <ChangeRequestItem key={cr.id} changeRequest={cr} />
        ))}
      </ul>
    </div>
  );
};

export default ChangeRequestList;
