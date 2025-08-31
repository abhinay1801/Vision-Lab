import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('student'); // Default role: student
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        
        axios.post('http://localhost:3001/register', { name, email, password, role })
        .then(result => {
            console.log(result);
            if (result.data === "Already registered") {
                alert("E-mail already registered! Please Login to proceed.");
                navigate('/login');
            } else {
                alert("Registered successfully! Please Login to proceed.");
                navigate('/login');
            }
        })
        .catch(err => console.log(err));
    }

    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-br from-cyan-400 to-indigo-500">
            <div className="bg-white shadow-lg rounded-lg p-6 w-96">
                <h2 className="text-2xl font-bold text-indigo-600 text-center mb-4">Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-1">
                            Name
                        </label>
                        <input 
                            type="text"
                            placeholder="Enter Name"
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400" 
                            onChange={(event) => setName(event.target.value)}
                            required
                        /> 
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-1">
                            Email Id
                        </label>
                        <input 
                            type="email" 
                            placeholder="Enter Email"
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400" 
                            onChange={(event) => setEmail(event.target.value)}
                            required
                        /> 
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-1">
                            Password
                        </label>
                        <input 
                            type="password" 
                            placeholder="Enter Password"
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400" 
                            onChange={(event) => setPassword(event.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-1">
                            Role
                        </label>
                        <select 
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400" 
                            value={role} 
                            onChange={(event) => setRole(event.target.value)}
                            required
                        >
                            <option value="student">Student</option>
                            <option value="mentor">Mentor</option>
                        </select>
                    </div>
                    <button 
                        type="submit" 
                        className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition duration-300"
                    >
                        Register
                    </button>
                </form>

                <p className="text-center mt-4 text-gray-600">
                    Already have an account? 
                </p>
                <Link 
                    to='/login' 
                    className="block text-center mt-2 text-indigo-600 font-semibold hover:underline"
                >
                    Login
                </Link>
            </div>
        </div>
    );
}

export default Register;
