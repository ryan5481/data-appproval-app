import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { assignUserRole, setLoginDetails } from '../../redux/reducers/userSlice'
import toast from 'react-simple-toasts';
import 'react-simple-toasts/dist/theme/light.css';
const baseUrl = process.env.BASE_URL


export default function UserLogin() {
  const router = useRouter();
  //PASSWORD VISIBLITY
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState('admin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  // DISPATCH DATA FROM LOGIN
  const dispatch = useDispatch()

  //SUBMIT FORM
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      let endpoint;
      if (userType === 'admin') {
        endpoint = `http://localhost:8000/admin-login`;
      } else if (userType === 'superAdmin') {
        endpoint = `http://localhost:8000/super-admin-login`;
      }

      const response = await axios.post(endpoint, {
        email: email,
        password: password,
      });
      if (response.status === 200) {
        dispatch(assignUserRole(response.data.userRole));
        dispatch(
          setLoginDetails({
            id: response.data.id,
            token: response.data.token,
            email: response.data.email,
            fullName: response.data?.fullName,
            userRole: response.data?.userRole,
            department: response.data?.department,
            isLoggedIn: true,
          })
        );
        toast(`Logged into ${response.data?.userRole == "superAdmin" ? ("super admin") : ("admin")} account.`,{ position: 'top-center', theme: 'light' });
        if(response.data.userRole == "superAdmin"){
          setTimeout(() => {router.push('/super-admin-dashboard')}, 1000)
        }if(response.data.userRole == "admin"){
          setTimeout(() => {router.push('/admin-dashboard')}, 1000)
        }
      }
    } catch (error) {
      console.error('Error:', error);
      if (error.response && error.response.status == 401) {
        toast(`Invalid email or password.` ,{ position: 'top-center', theme: 'light' });
      }
      else if (error.response && error.response.status == 404) {
        toast(`User doesn't exist.` ,{ position: 'top-center', theme: 'light' });
      }
      else {
        toast(`Error logging in. Please contact administrator` ,{ position: 'top-center', theme: 'light' });
      }
    }
  };
  return (
    <main className="flex min-h-screen justify-center items-center p-24 w-full bg-blue-900">
      {/* LOGO */}
      <div className='flex flex-col w-80 items-center justify-center bg-white p-5 rounded-lg shadow-lg'>
        <div className='relative flex mb-2 h-14 w-80'>
          <Image
            src={`/uploads/logo/1.jpeg`}
            height={1000}
            width={1000}
            alt='logo'
            className='absolute rounded-lg h-full w-full object-contain'
          />
        </div>
        {/* TITLE */}
        <div className='font-bold text-blue-500 text-[20px] p-1' >Admin Login</div>
        <form
          onSubmit={handleSubmit}
          className="w-full mx-auto"
        >
          {/* USER TYPE */}
          <label htmlFor="userType" className="block mb-2 text-sm font-medium text-gray-900">Admin type</label>
          <select
            onChange={(e) => setUserType(e.target.value)}
            id="userType" className="bg-gray-50 border border-gray-300 text-gray-900 mb-3 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" >
            <option value="admin" >Admin</option>
            <option value="superAdmin">Super Admin</option>
          </select>
          {/* EMAIL */}
          <label htmlFor="email-address-icon" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
          <div className="relative  mb-3">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
              </svg>
            </div>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="text" id="email-address-icon" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 -5  " placeholder="xyz@radiantit.com" />
          </div>
          <div className="mb-5">
            {/* PASSWORD */}
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
            <div className="relative">
              <input
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? 'text' : 'password'}
                id="password"
                // value={password}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10"
                placeholder="••••••••••••"
                required
              />
              <div
                className="absolute inset-y-0 right-0 pr-2.5 flex items-center cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <svg className="w-4 h-4 text-gray-800 m-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="m2 13.587 3.055-3.055A4.913 4.913 0 0 1 5 10a5.006 5.006 0 0 1 5-5c.178.008.356.026.532.054l1.744-1.744A8.973 8.973 0 0 0 10 3C4.612 3 0 8.336 0 10a6.49 6.49 0 0 0 2 3.587Z" />
                    <path d="m12.7 8.714 6.007-6.007a1 1 0 1 0-1.414-1.414L11.286 7.3a2.98 2.98 0 0 0-.588-.21l-.035-.01a2.981 2.981 0 0 0-3.584 3.583c0 .012.008.022.01.033.05.204.12.401.211.59l-6.007 6.007a1 1 0 1 0 1.414 1.414L8.714 12.7c.189.091.386.162.59.211.011 0 .021.007.033.01a2.981 2.981 0 0 0 3.584-3.584c0-.012-.008-.023-.011-.035a3.05 3.05 0 0 0-.21-.588Z" />
                    <path d="M17.821 6.593 14.964 9.45a4.952 4.952 0 0 1-5.514 5.514L7.665 16.75c.767.165 1.55.25 2.335.251 6.453 0 10-5.258 10-7 0-1.166-1.637-2.874-2.179-3.407Z" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 text-gray-800 m-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 14">
                    <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
                  </svg>
                )}
              </div>
            </div>
          </div>
          {/* SUBMIT BUTTON */}
          <div className='flex items-center justify-center' >
            <button
              onClick={handleSubmit}
              type="submit"
              className="text-white bg-blue-800 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >Submit</button>
          </div>
        </form>
      </div>
    </main >
  )
}
