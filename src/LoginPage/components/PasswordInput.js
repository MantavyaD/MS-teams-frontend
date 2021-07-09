import React from 'react';
import '../LoginPage.css';

const PasswordInput = (props) => {
  const { password, setPassword, passwordError } = props;

  return (
    <div className='login-page_input_container'>
      <input
        placeholder='Password'
        type='password'
        required
        value={password}
        onChange={(event) => {setPassword(event.target.value);}}
        className='login-page_input password_input background_main_color'
      />
      <br/>
      <p className="errorMsg_password">{passwordError}</p>
    </div>
  );
};

export default PasswordInput;