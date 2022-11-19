import React from 'react'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google'
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import shareVideo from '../assets/share.mp4';
import logo from '../assets/logowhite.png';
import jwt_decode from "jwt-decode";
import { client } from '../client'


const Login = () => {

  const navigate = useNavigate();
  const googleResponse = (response) => {
    console.log(response)
    var userObject = jwt_decode(response.credential)
    console.log(userObject)
    localStorage.setItem('user',JSON.stringify(userObject))

    const { name, sub, picture } = userObject
    console.log(name + sub + picture)

    //forming the fileds for sanity db
    const doc ={
      _id: sub,
      _type: 'user',
      userName: name,
      image: picture,
    }
    
    // here we are creating a new user if he does not already exist in the database using google info
    client.createIfNotExists(doc)
      .then((res)=>{
        navigate('/', {replace: true})
        console.log(`${name} as a user, and his unique id is ${sub} `)
      })    
  }
  const googleResponsefail=(response)=>{
    console.log(response);
  }
  return (
    
      <div className='flex justify-start items-center flex-col h-screen'>
        <div className='relative w-full h-full'>
          <video
            src={shareVideo}
            type='video/mp4'
            loop
            controls={false}
            muted
            autoPlay
            className='w-full h-full object-cover'
          />

          <div className='absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay' >
            <div className="p-5">
              <img src={logo} width='130px' alt='logo' />
            </div>
            <div className="shadow-2x1">
            <GoogleOAuthProvider clientId={`${process.env.REACT_APP_GOOGLE_API_TOKEN}`}>
              <GoogleLogin
                
                render={(renderProps) => (
                  <button
                    type="button"
                    className="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none"
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                  >
                    <FcGoogle className="mr-4" /> Sign in with google
                  </button>
                )}
                onSuccess={googleResponse}
                onFailure={googleResponse}
                cookiePolicy="single_host_origin"
              />
              </GoogleOAuthProvider>
            </div>
          </div>
        </div>
      </div>
    
  )
}

export default Login