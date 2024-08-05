import Reactc, { useState, useEffect } from 'react'
import './index.css'
import { apiList } from '../../services/apiList';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Auth = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");
    const [phnNumber, setPhnNumber] = useState("");
    const [password, setPassword] = useState("");
    const [loginBtn, setLoginBtn] = useState("login");
    const [showSubmitError, setShowSubmitError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    let navigate = useNavigate();


    const renderUserName = () => {
        return (
            <>
                <label className='label' htmlFor='name'>Name :</label>
                <input
                    className='user-input'
                    type='text'
                    id='name'
                    placeholder='Enter Your Name'
                    value={ name }
                    onChange={ (e) => setName(e.target.value) }
                />

            </>
        )
    }

    const renderEmail = () => {
        return (
            <>
                <label className='label' htmlFor='email'>Email :</label>
                <input
                    className='user-input'
                    type='text'
                    id='email'
                    placeholder='Enter Your email'
                    value={ email }
                    onChange={ (e) => setEmail(e.target.value) }
                />
            </>
        )
    }

    const renderPhnNumber = () => {
        return (
            <>
                <label className='label' htmlFor='phone'>Phone Number :</label>
                <input
                    className='user-input'
                    type='text'
                    id='phone'
                    placeholder='Enter Your phone Number'
                    value={ phnNumber }
                    onChange={ (e) => setPhnNumber(e.target.value) }
                />
            </>
        )
    }

    const renderGender = () => {
        return (
            <>
                <label className='label' htmlFor='gender'> Gender :</label>
                <input
                    className='user-input'
                    type='text'
                    id='gender'
                    placeholder='Enter Your gender'
                    value={ gender }
                    onChange={ (e) => setGender(e.target.value) }
                />
            </>
        )
    }

    const renderPassword = () => {
        return (
            <>
                <label className='label' htmlFor='password'> Password :</label>
                <input
                    className='user-input'
                    type='password'
                    id='password'
                    placeholder='Enter Your password'
                    value={ password }
                    onChange={ (e) => setPassword(e.target.value) }
                />
            </>
        )
    }



    // console.log(`Email: ${email}`);
    // console.log(`Password: ${password}`);


    const onSubmitForm = async (e) => {

        e.preventDefault();

        if (loginBtn === 'login') {
            //call login Api

            if (email !== "" || password !== "") {

                const options = {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        email,
                        password
                    })
                }

                const response = await fetch(apiList.login, options);
                const data = await response.json();

                if (response.status === 400 || response.status === 401) {
                    setShowSubmitError(true);
                    setErrorMsg(data.message);
                }
                if (response.status === 200) {
                    setShowSubmitError(false);
                    Cookies.set("jwt_token", data.token)
                    alert(data.message);
                    navigate('/');

                }


            } else {
                setShowSubmitError(true);
                setErrorMsg("Please Enter All Fields");
            }
        }
        else {
            //call signin api
            if (name !== "" || email !== "" || phnNumber !== "" || gender !== "" & password !== "") {
                if (password.length >= 8) {

                    const options = {
                        method: 'POST',
                        headers: {
                            'Content-type': 'application/json'
                        },
                        body: JSON.stringify({
                            name,
                            email,
                            phoneNumber: phnNumber,
                            gender,
                            password,
                            confirmPassword: password

                        })
                    }

                    const response = await fetch(apiList.signup, options);
                    const data = await response.json();


                    if (response.status === 201) {
                        setShowSubmitError(true);
                        setErrorMsg(data.message);
                        setLoginBtn('login')
                        setName("")
                        setEmail("")
                        setPassword("")
                        setGender("")
                        setPhnNumber("")
                    }


                    if (response.status === 400) {
                        setShowSubmitError(true);
                        setErrorMsg(data.message);
                    }

                }
                else {
                    setShowSubmitError(true);
                    setErrorMsg('password length should be 8 and above')
                }


            }

            else {
                setShowSubmitError(true)
                setErrorMsg("Enter all Fields ")
            }

        }
    }


    useEffect(() => {
        const token = Cookies.get('jwt_token');
        if (token) {
            navigate('/')
        }
    }, [])

    return (
        <div className='jobby-app-container'>
            <div className='card-container'>

                <img
                    src='https://assets.ccbp.in/frontend/react-js/logo-img.png'
                    alt='Website Logo'
                    className='website-logo'
                />
                <div>
                    <button className={ loginBtn === 'login' ? 'login-button' : 'login-button btn-off' } onDoubleClick={ () => setLoginBtn('login') } type='submit'> Login</button>
                    <button className={ loginBtn === 'signup' ? 'login-button' : 'login-button btn-off' } onDoubleClick={ () => setLoginBtn('signup') } type='submit' > Sign-Up</button>
                </div>


                <form className='form-container' onSubmit={ onSubmitForm }>
                    <div className='input-container'>{ loginBtn === 'signup' ? renderUserName() : '' }</div>
                    <div className='input-container'>{ renderEmail() }</div>
                    <div className='input-container'>{ loginBtn === 'signup' ? renderPhnNumber() : '' }</div>
                    <div className='input-container'>{ loginBtn === 'signup' ? renderGender() : '' }</div>
                    <div className='input-container'>{ renderPassword() }</div>

                    <button className='login-button' type='submit'>{ loginBtn === 'login' ? 'Login' : 'Sign-Up' }</button>

                    { showSubmitError && <p className='error-msg'> { errorMsg } </p> }


                </form>


            </div>

        </div>
    )
}

export default Auth;
