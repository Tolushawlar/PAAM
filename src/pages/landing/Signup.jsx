import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LandingFooter from "../../components/LandingFooter";
import LandingNavbar from "../../components/LandingNavbar";
import login from "../../assets/images/login.png";
import Button from "../../UI/Button";

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
    password2: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const response = await fetch("/api/v1/user?endpoint=register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer fsdgsdfsdfgv4vwewetvwev"
        },
        body: JSON.stringify(formData)
      });
      
      const result = await response.json();
      
      if (response.ok && result.status === "success") {
        navigate("/otp");
      } else {
        setError(result.message || "Registration failed");
      }
    } catch (error) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <LandingNavbar />

      <section className="flex flex-col items-start md:flex-row flex-1 px-6 lg:px-20 py-10 gap-12 mt-20">
        {/* Left side - image and text */}
        <div className="md:w-1/2 flex flex-col justify-center items-center md:items-start text-center md:text-left p-8">
          <img
            src={login}
            alt="Login Illustration"
            className="w-3/4 md:w-full mb-6 rounded-xl"
          />
          <h3 className="text-2xl font-bold mb-4">
            HOW TO TRULY TRUST SOMEONE
          </h3>
          <p className="text-gray-600 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Dui
            faucibus in ornare quam viverra orci sagittis eu volutpat. Pharetra
            sit amet aliquam id diam maecenas ultricies.
          </p>
        </div>

        {/* Right side - login form */}
        <div className="md:w-1/2 flex flex-col justify-center h-[600px] bg-white p-8 m-8 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold text-gray-800 text-left mb-6">
             Join PAAM Global Digital Hub
          </h3>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          <form className="flex flex-col gap-4 flex-1" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                type="text"
                name="firstname"
                placeholder="First Name"
                value={formData.firstname}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
               Last Name
              </label>
              <input
                type="text"
                name="lastname"
                placeholder="Last Name"
                value={formData.lastname}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

                 <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                name="password2"
                placeholder="Enter confirm your password"
                value={formData.password2}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <Button 
              title={loading ? "SIGNING UP..." : "SIGN UP"} 
              className="w-full mt-2" 
              type="submit"
              disabled={loading}
            />
          </form>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
}

export default Signup;
