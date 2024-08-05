import React, { useEffect, useState } from 'react';
import './index.css';
import { BsSearch } from 'react-icons/bs';
import { Audio } from 'react-loader-spinner';
import Cookies from 'js-cookie';

import axios from 'axios';
import JobCard from '../JobCard/JobCard'
import JobFilter from '../JobFilterGroup/JobFilter';
import { apiList } from '../../services/apiList';





const employmentTypesList = [
    {
        label: 'Full Time',
        employmentTypeId: 'FULL TIME',
    },
    {
        label: 'Part Time',
        employmentTypeId: 'PART TIME',
    },
    {
        label: 'Freelance',
        employmentTypeId: 'FREELANCE',
    },
    {
        label: 'Internship',
        employmentTypeId: 'INTERNSHIP',
    },
];

const salaryRangesList = [
    {
        salaryRangeId: '1000000',
        label: '10 LPA and above',
    },
    {
        salaryRangeId: '2000000',
        label: '20 LPA and above',
    },
    {
        salaryRangeId: '3000000',
        label: '30 LPA and above',
    },
    {
        salaryRangeId: '4000000',
        label: '40 LPA and above',
    },
];

const apiStatusConstants = {
    initial: 'INITIAL',
    inProgress: 'INPROGRESS',
    success: 'SUCCESS',
    failure: 'FAILURE'
};

export default function JobProfileSection() {
    const [jobs, setJobs] = useState([]);
    const [search, setSearch] = useState("");
    const [employmentType, setEmploymentType] = useState([]);
    const [salaryRange, setSalaryRange] = useState(0);
    const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);


    useEffect(() => {
        getJobs()
    }, []);


    const getJobs = async () => {
        let token = Cookies.get('jwt_token');

        setApiStatus(apiStatusConstants.inProgress);
        try {
            //(`${apiList.filterJobs}?employment_type=${employmentType.join()}&minimum_package=${salaryRange}&search=${search}`
            const response = await axios.get(`${apiList.filterJobs}?employment_type=${employmentType.join()}&search=${search}`, {
                headers: {
                    token: `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                const data = await response.data;
                console.log(data.jobs)
                setJobs(data.jobs);
                setApiStatus(apiStatusConstants.success);
            }
            else {
                setApiStatus(apiStatusConstants.failure)
            }
        } catch (e) {
            console.log(e);
            setApiStatus(apiStatusConstants.failure);
        }
    }


    const onChangeSearch = (e) => {
        setSearch(e.target.value)
    }

    const onChangeSalary = (salary) => {
        setSalaryRange(salary)
    }

    const onChangeEmploymentType = (type) => {
        setEmploymentType((prev) => [...prev, type])
    }

    const onKeyDown = (e) => {
        if (e.key === 'Enter') {
            getJobs()
        }

    }

    const renderLoaderView = () => (
        <div className='profile-loader-container'>
            <Audio
                height="50"
                width="50"
                radius="9"
                color='red'
                ariaLabel='loading'
                type="ThreeDots"
            />

        </div>
    )


    const renderFailureView = () => (
        <div className="failure-container">
            <img
                src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
                alt="failure view"
                className="failure-view"
            />
            <h1 className="failure-heading">Oops! Something Went Wrong</h1>
            <p className="failure-desc">
                we cannot seem to find the page you are looking for
            </p>
            <button
                type="button"
                testid="button"
                className="jobs-failure-button"
                onClick={ getJobs }
            >
                Retry
            </button>
        </div>
    )

    const renderSuccessView = () => {
        const jobsDisplay = jobs.length > 0
        return jobsDisplay ? (

            <div className='details-container'>

                <div className="search-input-content">
                    <input
                        type="search"
                        className="search"
                        placeholder="Search"

                        onChange={ onChangeSearch }
                        onKeyDown={ onKeyDown }
                    />
                    <button
                        type="button"
                        testid="searchButton"
                        className="search-button"
                        onClick={ getJobs }
                    >
                        <BsSearch className="search-icon" />
                    </button>
                </div >
                <ul className='job-details-item-container'>
                    { jobs.map(job => (
                        <JobCard key={ job._id } jobDetails={ job } />
                    )) }
                </ul>

            </div>

        ) : (<div className="no-jobs-container">
            <div className="search-input-content">
                <input
                    type="search"
                    className="search"
                    placeholder="Search"
                    value={ searchInput }
                    onChange={ onChangeSearch }
                    onKeyDown={ onKeyDown }
                />
                <button
                    type="button"
                    testid="searchButton"
                    className="search-button"
                    onClick={ getJobs }
                >
                    <BsSearch className="search-icon" />
                </button>
            </div >
            <img
                src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
                alt="no jobs"
                className="no-jobs"
            />
            <h1 className="no-jobs-heading">No Jobs Found</h1>
            <p className="no-jobs-desc">
                We could not find any jobs. Try other filters.
            </p>
        </div >
        )
    };

    const JobProfileSection = () => {
        switch (apiStatus) {
            case apiStatusConstants.success:
                return renderSuccessView()
            case apiStatusConstants.inProgress:
                return renderLoaderView()
            case apiStatusConstants.failure:
                return renderFailureView()
            default:
                return null
        }
    }


    return (
        <div className='job-details-item-container'>
            <div className='render-group-items'>
                <JobFilter
                    employmentTypesList={ employmentTypesList }
                    salaryRangesList={ salaryRangesList }
                    ChangeEmploymentType={ onChangeEmploymentType }
                    ChangeSalary={ onChangeSalary }
                    searchInput={ search }
                    getJobDetails={ getJobs }
                />
            </div>
            <div className='responsive-items'>
                { JobProfileSection() }
            </div>
        </div>
    )
}