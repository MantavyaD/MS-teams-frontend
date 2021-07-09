import React from 'react';

const SubmitButton = ({ handleSubmitButtonPressed }) => {
  return (
    <div>
        {handleSubmitButtonPressed()}
    </div>

  );
};

export default SubmitButton;
