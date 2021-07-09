import React from 'react';
import '../LoginPage.css'

const UsernameInput = (props) => {
  const { email, setEmail, emailError } = props;

  return (
    <div className='login-page_input_container'>
      <input
        placeholder='Email ID'
        type='text'
        required
        value={email}
        onChange={(event) => {setEmail(event.target.value);}}
        className='login-page_input username_input background_main_color'
      />

    <p className="errorMsg_email">{emailError}</p>
    </div>
  );
};

export default UsernameInput;
