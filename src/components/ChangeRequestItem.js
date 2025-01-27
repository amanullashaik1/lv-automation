import React from 'react';

const CRListItem = ({ cr }) => {
  return (
    <li>
      {cr.title} - {cr.status}
    </li>
  );
};

export default CRListItem;
