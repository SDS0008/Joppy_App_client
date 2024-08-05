import { Component, useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { AiFillStar } from 'react-icons/ai'
import { GoLocation } from 'react-icons/go'
import { BsBriefcaseFill } from 'react-icons/bs'
import { BiLinkExternal } from 'react-icons/bi'
import { Audio } from 'react-loader-spinner';


import Header from '../Header/Header'


import SkillCard from '../SkillCard/Skills'
import './index.css'
import { apiList } from '../../services/apiList'
import { useNavigate, useParams } from 'react-router-dom'
import SimilarJobs from '../SimilarJob/SimilarJobs'

const apiStatusConstants = {
    initial: 'INITIAL',
    inProgress: 'INPROGRESS',
    success: 'SUCCESS',
    failure: 'FAILURE'
};

const JobItemDetails = () => {
    let navigate = useNavigate();

    const { id } = useParams();

    const [jobItemDetails, setJobItemDetails] = useState({});
    const [similarJobs, setSimilarJobs] = useState([]);
    const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);


    useEffect(() => {
        const token = Cookies.get('jwt_token')
        if (token === undefined) {
            navigate("/Auth");
        }
        getJobDetails()
    }, []);



    const getJobDetails = async () => {
        setApiStatus(apiStatusConstants.inProgress);

        const url = `${apiList.jobDetails}/${id}`;
        const options = {
            headers: {
                token: `Bearer ${Cookies.get('jwt_token')}`,
            },
            method: 'GET'
        }


        const response = await fetch(url, options)

        if (response.ok === true) {
            const data = await response.json();
            console.log(data);
            setJobItemDetails(data.data);
            setSimilarJobs(data.similarJobs);
            setApiStatus(apiStatusConstants.success);
        }
        else {
            setApiStatus(apiStatusConstants.failure);
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
    );

    const renderFailureView = () => {
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
                onClick={ getJobDetails }
            >
                Retry
            </button>
        </div>
    };

    console.log(jobItemDetails)

    const renderJobItemDetails = () => {

        const {
            company_logo_url,
            company_website_url,
            employment_type,
            job_description,
            location,
            title,
            rating,
            package_per_annum,
            life_at_company,
            skills,
        } = jobItemDetails;
        const { description, imageUrl } = life_at_company;

        return (
            <div className="full-job-item-container">
                <div className="job-items-container">
                    <div className="logo-image-container">
                        <img
                            src={ company_logo_url }
                            alt="job details company logo"
                            className="company-logo-justify"
                        />
                        <div className="title-container">
                            <h1 className="company-title-head">{ title }</h1>
                            <div className="rating-container">
                                <AiFillStar className="star-icon" />
                                <p className="count-rating">{ rating }</p>
                            </div>
                        </div>
                    </div>
                    <div className="location-type-salary-container">
                        <div className="location-container">
                            <div className="responsive">
                                <GoLocation className="location-logo" />
                                <p className="location-desc">{ location }</p>
                            </div>
                            <div className="responsive">
                                <BsBriefcaseFill className="location-logo-brief" />
                                <p className="location-desc">{ employment_type }</p>
                            </div>
                        </div>
                        <p className="package-desc">{ package_per_annum }</p>
                    </div>
                    <hr className="line" />
                    <div className="description-container">
                        <h1 className="desc-heading">Description</h1>
                        <a className="visit-link" href={ company_website_url }>
                            Visit
                            <BiLinkExternal className="bi-link" />
                        </a>
                    </div>
                    <p className="job-story-desc">{ job_description }</p>
                    <h1 className="skill-heading">Skills</h1>
                    <ul className="skill-container">
                        { skills.map(eachSkill => (
                            <SkillCard key={ eachSkill.id } skillDetails={ eachSkill } />
                        )) }
                    </ul>
                    <h1 className="life-company-heading">Life at company</h1>
                    <div className="life-at-company-container">
                        <p className="life-company-desc">{ description }</p>
                        <img
                            src={ imageUrl }
                            alt="life at company"
                            className="company-logo"
                        />
                    </div>
                </div>
                <h1 className="similar-job-heading">Similar Jobs</h1>
                <ul className="similar-cards">
                    { similarJobs.map(eachItem => (
                        <SimilarJobs key={ eachItem.id } jobDetails={ eachItem } />
                    )) }
                </ul>
            </div>
        )
    }

    const renderJobViews = () => {

        switch (apiStatus) {
            case apiStatusConstants.success:
                return renderJobItemDetails()
            case apiStatusConstants.inProgress:
                return renderLoaderView()
            case apiStatusConstants.failure:
                return renderFailureView()

            default:
                return null;
        }
    }


    return (
        <>
            <Header />
            <div className="get-products-details-container">
                { renderJobViews() }
            </div>
        </>
    )
}


export default JobItemDetails;

///2:13:00