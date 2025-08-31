// import { useState } from 'react';
// import { Link, useNavigate } from "react-router-dom";
// import axios from 'axios';

// const Login = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const navigate = useNavigate();

//     const handleSubmit = (event) => {
//         event.preventDefault();
        
//         axios.post('http://localhost:3001/login', { email, password })
//         .then(result => {
//             console.log(result);
//             if (result.data === "Success") {
//                 console.log("Login Success");
//                 alert('Login successful!');
//                 navigate('/home');
//             } else {
//                 alert('Incorrect password! Please try again.');
//             }
//         })
//         .catch(err => console.log(err));
//     }

//     return (
//         <div className="flex justify-center items-center h-screen bg-gradient-to-br from-cyan-400 to-indigo-500">
//             <div className="bg-white shadow-lg rounded-lg p-6 w-96">
//                 <h2 className="text-2xl font-bold text-indigo-600 text-center mb-4">Login</h2>
//                 <form onSubmit={handleSubmit}>
//                     <div className="mb-4">
//                         <label className="block text-gray-700 font-semibold mb-1">
//                             Email Id
//                         </label>
//                         <input 
//                             type="email" 
//                             placeholder="Enter Email"
//                             className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400" 
//                             onChange={(event) => setEmail(event.target.value)}
//                             required
//                         /> 
//                     </div>
//                     <div className="mb-4">
//                         <label className="block text-gray-700 font-semibold mb-1">
//                             Password
//                         </label>
//                         <input 
//                             type="password" 
//                             placeholder="Enter Password"
//                             className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400" 
//                             onChange={(event) => setPassword(event.target.value)}
//                             required
//                         />
//                     </div>
//                     <button 
//                         type="submit" 
//                         className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition duration-300"
//                     >
//                         Login
//                     </button>
//                 </form>

//                 <p className="text-center mt-4 text-gray-600">
//                     Don&apos;t have an account? 
//                 </p>
//                 <Link 
//                     to='/register' 
//                     className="block text-center mt-2 text-indigo-600 font-semibold hover:underline"
//                 >
//                     Register
//                 </Link>
//             </div>
//         </div>
//     );
// }

// export default Login;











import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            const response = await axios.post('http://localhost:3001/login', { email, password });

            if (response.data.message === "Success") {
                const { token, role } = response.data;

                // ✅ Store token & role in localStorage
                localStorage.setItem("token", token);
                localStorage.setItem("userRole", role);

                alert('Login successful!');

                navigate('/home');
            } else {
                setError(response.data.message); // Display error message
            }
        } catch (err) {
            console.error(err);
            setError("Server error, please try again later.");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-br from-cyan-400 to-indigo-500">
            <div className="bg-white shadow-lg rounded-lg p-6 w-96">
                <h2 className="text-2xl font-bold text-indigo-600 text-center mb-4">Login</h2>
                
                {error && <p className="text-red-500 text-center mb-2">{error}</p>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-1">Email Id</label>
                        <input 
                            type="email" 
                            placeholder="Enter Email"
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400" 
                            onChange={(event) => setEmail(event.target.value)}
                            required
                        /> 
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-1">Password</label>
                        <input 
                            type="password" 
                            placeholder="Enter Password"
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400" 
                            onChange={(event) => setPassword(event.target.value)}
                            required
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition duration-300"
                    >
                        Login
                    </button>
                </form>

                <p className="text-center mt-4 text-gray-600">Don&apos;t have an account?</p>
                <Link to='/register' className="block text-center mt-2 text-indigo-600 font-semibold hover:underline">
                    Register
                </Link>
            </div>
        </div>
    );
}

export default Login;
