import React, { useState } from "react";
import apiClient from "../services/apiClient";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { useNavigate } from "react-router-dom";

interface Props {
  route: string;
  method: 'login' | 'register';
}

interface FormData {
  username: string;
  password: string;
}

const Form = ({route, method}: Props) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({username: '', password: ''});
  const name = (method == 'login') ? 'Login' : 'Register';
  const handleSubmit = (event: React.FormEvent)  => {
    event.preventDefault();
    apiClient.post(route, formData)
    .then(res => {
      if (method == 'login') {
        localStorage.setItem(ACCESS_TOKEN, res.data.access)
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh)
        navigate('/')
      }
      else {
        navigate('/login')
      }
    })
    .catch(error => {
      alert(error.message)
    })
    
  }
  
  return (
    <form onSubmit={handleSubmit} >
      <h1>{name}</h1>
      <input type="text" className="form-input" placeholder="username" value={formData.username} onChange={e => setFormData({...formData, username: e.target.value })}  />
      <input type='password' className="form-input" placeholder="password" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value })}  />
      <button className="btn" type='submit'>{name}</button>
    </form>
  )
}

export default Form