import { AiFillStar } from 'react-icons/ai'
import { BsBriefcaseFill } from 'react-icons/bs'
import { GoLocation } from 'react-icons/go'
import './SmiliarJobs.css'

const SimilarJobs = props => {
    const { jobDetails } = props
    const {
        company_logo_url,
        employment_type,
        job_description,
        location,
        title,
        rating,
    } = jobDetails

    return (

        <li className="similar-list-docs">
            <div className="logo-container">
                <img
                    src={ company_logo_url }
                    alt="similar job company logo"
                    className="company-logo-url"
                />
                <div>
                    <h1 className="company-logo-title">{ title }</h1>
                    <div className="rating-container">
                        <AiFillStar className="star-icon" />
                        <p className="count-rating">{ rating }</p>
                    </div>
                </div>
            </div>
            <h1 className="similar-desc-heading">Description</h1>
            <p className="similar-desc">{ job_description }</p>

            <div className="location-container-flex-justify">
                <div className="responsive">
                    <GoLocation className="location-logo" />
                    <p className="location-desc">{ location }</p>
                </div>
                <div className="responsive">

                    <BsBriefcaseFill className="location-logo-brief" />
                    <p className="location-desc">{ employment_type }</p>
                </div>
            </div>
        </li>

    )
}

export default SimilarJobs;