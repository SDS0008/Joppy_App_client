import { AiFillStar } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { HiLocationMarker, HiMail } from 'react-icons/hi'
import './JobCard.css'

const JobCard = props => {
    const { jobDetails } = props

    const {
        title,
        company_logo_url,
        rating,
        employment_type,
        location,
        _id,
        package_per_annum,
        job_description,
    } = jobDetails

    return (
        <Link to={ `/job/${_id}` } className="link-item">
            <li className="job-list-items">
                <div className="company-container">
                    <div>
                        <img src={ company_logo_url } alt="company logo" className="logo-url" />
                    </div>
                    <div>
                        <h1 className="company-title">{ title }</h1>
                        <div className="star-icon-container">
                            <AiFillStar className="star-icon" />
                            <p className="rating-count">{ rating }</p>
                        </div>
                    </div>
                </div>
                <div className="location-container-flex-content">
                    <div className="location-desc">
                        <div className="star-icon-container">
                            <HiLocationMarker className="location-icon" />
                            <p className="location-desc description">{ location }</p>
                        </div>
                        <div className="star-icon-container">
                            <HiMail className="location-icon left-icon" />
                            <p className="emp-type description">{ employment_type }</p>
                        </div>
                    </div>
                    <div className="star-icon-container">
                        <p className="package-desc description">{ package_per_annum }</p>
                    </div>
                </div>
                <hr className="line" />
                <h1 className="desc-heading">Description</h1>
                <p className="job-description">{ job_description }</p>
            </li>
        </Link>
    )
}

export default JobCard;