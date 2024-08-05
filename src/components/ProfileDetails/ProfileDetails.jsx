import React, { useState, useEffect } from 'react'
import { apiList } from '../../services/apiList';
import axios from 'axios';
import Cookies from 'js-cookie'
import './ProfileDetails.css'

export default function ProfileDetails() {
    const [user, setUser] = useState({});

    useEffect(() => {
        getUserDetails();
    }, []);


    const getUserDetails = async () => {
        const response = await axios.get(apiList.profile, {
            headers: {
                token: `Bearer ${Cookies.get('jwt_token')}`

            }

        })

        const data = await response.data;
        setUser(data.user)
    }

    return (
        <div className='profile-container'>
            <img src='https://tse3.mm.bing.net/th?id=OIP.abbHwUGf7cWF1KrClYxa5AHaHa&pid=Api&P=0&h=220'
                className='profile-logo'
            />
            <h1 className='name-heading'>{ user.name }</h1>
            <p className='bio'>{ user.email }</p>

        </div>
    )
}
