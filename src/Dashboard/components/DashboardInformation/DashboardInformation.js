import React,{useState} from 'react';

import './DashboardInformation.css';

const DashboardInformation = ({ username }) => {
  const [readMore,setReadMore] = useState(false);
  const extraContent=<div>
  <div className='extra-content dashboard_info_text_description'>
    <li>You can call a peer from the list of Active Users displayed on left.</li>
    <li>You can also join an existing meeting displayed at the bottom.</li>
    <li>Also you can create a new one, from the button in the right. </li>
  </div>
</div>

  // const linkName = readMore?'Read Less << ':'Read More >> '
  return (
    <div className='dashboard_info_text_container'>
      <span className='dashboard_info_text_description'>
      <h2>Connect with Peers! At your own Convenience</h2>  
        <div className='second_line'>Video Call, Chat and Share Screen on the go in a single app.</div> 
      </span>
      <button className='custom-btn btn-15' onClick={() => { setReadMore(!readMore) }}>Guide</button>
      {readMore && extraContent}
      <h1 className='active_rooms'>Active Meetings</h1>      
    </div>
  );
};

export default DashboardInformation;
