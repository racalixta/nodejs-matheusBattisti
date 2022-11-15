import api from "../utils/api";
// import { useState, useEffect } from "react";
// import { useHistory } from 'react-router-dom';

export default function useAuth() {
  async function register(user) {

    try{
      const data = await api.post('/users/register', user).then((response) => {
        return response.data
      })
      
      console.log(data)

    } catch(error) {
      // tratar error - dps será melhorado alem de um console.log
      console.log(error)
    }
  }

  return { register }
}





