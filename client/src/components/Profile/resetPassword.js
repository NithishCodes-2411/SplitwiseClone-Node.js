import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import PublishIcon from '@mui/icons-material/Publish';
import axios from 'axios';

const ResetPassword = () => {
  const [newPass, setNewPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [oldPass, setOldPass] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const emailId = localStorage.getItem('userEmail');

  const handleNewPass = (e) => {
    const newPassword = e.target.value;
    setNewPassword(newPassword);
  };

  const handleConfirmNewPass = (e) => {
    const confirmPassword = e.target.value;
    setConfirmPass(confirmPassword);
  };

  const handleOldPassword = (e) => {
    const oldPassword = e.target.value;
    setOldPass(oldPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessMsg("");

    if(!newPass.trim()&&!oldPass.trim()&&!confirmPass.trim()){
      setError("Required fields cannot be empty");
    }

    if (newPass !== confirmPass) {
      setError("Confirm password doesn't match");
      return;
    }
    if(oldPass === newPass){
      setError("Your new Password is same as the old Password");
      return;
    }
    //setSuccessMsg("")

    axios
      .post('http://localhost:5000/api/user/resetPassword', {
        emailID: emailId,
        oldPassword: oldPass,
        newPassword: newPass,
      })
      .then((res) => {
        if (res.status === 200) {
          setSuccessMsg('Password changed successfully');
          setError('');
          setNewPassword('');
          setConfirmPass('');
          setOldPass('');
        } else {
          setError('An error occurred. Please try again later.');
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          setError('Unauthorized: Please check your old password');
        } else {
          setError('An error occurred. Please try again later./');
        }
      });
  };

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <TextField
          id="outlined-basic-3"
          onChange={handleOldPassword}
          label="Old Password"
          variant="outlined"
        />
        <br />
        <TextField
          onChange={handleNewPass}
          id="outlined-basic-1"
          label="New Password"
          variant="outlined"
        />
        <br />
        <TextField
          onChange={handleConfirmNewPass}
          id="outlined-basic-2"
          label="Confirm New Password"
          variant="outlined"
        />
        <br />
      </div>
      {error && <p className="text-danger fs-5">{error}</p>}
      {successMsg && <p className="text-success fs-5">{successMsg}</p>}
      <br />
      <Button onClick={handleSubmit} variant="contained">
        <PublishIcon />
      </Button>
    </>
  );
};

export default ResetPassword;
