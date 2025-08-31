import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
    const [user, setUser] = useState(null);
    const userEmail = "user@example.com"; // Replace with actual logged-in user's email

    // Fetch user details from the backend
    useEffect(() => {
        axios.get(`http://localhost:3001/user/${userEmail}`)
            .then(response => setUser(response.data))
            .catch(error => console.log("Error fetching user data:", error));
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-cyan-400 to-indigo-500 text-white">
            <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg w-96 text-center">
                <h1 className="text-2xl font-bold text-indigo-600">Welcome, {user?.name || "User"}!</h1>
                <p className="text-gray-600">Role: <span className="font-semibold">{user?.role || "N/A"}</span></p>
                
                {/* Profile Image */}
                <div className="mt-4">
                    <img 
                        src={user?.profileImage || "https://via.placeholder.com/100"} 
                        alt="Profile" 
                        className="w-24 h-24 mx-auto rounded-full border border-gray-300"
                    />
                </div>
            </div>
        </div>
    );
};

export default Home;
