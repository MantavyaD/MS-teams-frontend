import React from 'react';

import './DashboardInformation.css';

const DashboardInformation = ({ username }) => {
  return (
    <div className='dashboard_info_text_container'>
      <span className='dashboard_info_text_title'>
        Hello {username} welcome to Microsoft Teams.
      </span>
      <span className='dashboard_info_text_description'>
        You can call directy to a person from the list or
        You can create or join a meeting.
      </span>
    </div>
  );
};

export default DashboardInformation;
