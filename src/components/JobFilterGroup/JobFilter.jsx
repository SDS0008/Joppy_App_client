import React from 'react'
import './JobFilter.css';
import ProfileDetails from '../ProfileDetails/ProfileDetails';


export default function JobFilter(props) {

    const getEmploymentTypeList = () => {

        const { employmentTypesList } = props;

        return employmentTypesList.map(employ => {
            const { ChangeEmploymentType } = props;
            const onChangeEmployType = event => ChangeEmploymentType(event.target.value);
            return (
                <li className='checkbox-list-items'
                    key={ employ.employmentTypeId }
                    onChange={ onChangeEmployType }>

                    <input
                        type='checkbox'
                        className='check-radio'
                        id={ employ.employmentTypeId }
                        value={ employ.employmentTypeId }
                    />
                    <label htmlFor={ employ.employmentTypeId }
                        className='check-label'>
                        { employ.label }
                    </label>

                </li>
            )
        })
    }




    return (
        <div className='job-filter-group'>

            <ProfileDetails />

            <hr className='horizontal-line' />

            <div className='salary-container'>
                <h3>Type of employment</h3>
                <ul className='salary-range-container'>{ getEmploymentTypeList() }</ul>

            </div>

            <hr className='horizontal-line' />
            Job Filters Group
        </div>
    )
}
