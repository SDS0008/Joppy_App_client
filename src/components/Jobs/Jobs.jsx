import React, { useEffect } from 'react'
import Header from '../Header/Header';
import './Jobs.css';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import JobProfileSection from '../JobProfileSection';


function Jobs() {

    let navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get('jwt_token');
        if (token === undefined) {
            navigate('/Auth')
        }
    }, []);

    return (
        <>
            <Header />
            <div className='job-profile-container'>

                <JobProfileSection />

            </div>
        </>
    )
}

export default Jobs
