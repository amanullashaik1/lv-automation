import React from 'react';

const AssignLVButton = ({ changeRequestId }) => {
  const handleAssignLV = () => {
    // Call the backend API to assign LV
    fetch(`http://localhost:8080/api/cr/${changeRequestId}/assign`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lvUserId: 2 }), // Example: Assign to user with ID 2
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('LV Assigned:', data);
        alert('Live Verification assigned successfully!');
      })
      .catch((error) => console.error('Error assigning LV:', error));
  };

  return (
    <button className="assign-lv-btn" onClick={handleAssignLV}>
      Assign LV
    </button>
  );
};

export default AssignLVButton;
