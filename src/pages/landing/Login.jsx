import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LandingFooter from "../../components/LandingFooter";
import LandingNavbar from "../../components/LandingNavbar";
import login from "../../assets/images/login.png";
import Button from "../../UI/Button";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
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
      const response = await fetch("/api/v1/admin?endpoint=loginuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer fsdgsdfsdfgv4vwewetvwev"
        },
        body: JSON.stringify(formData)
      });
      
      const result = await response.json();
      
      if (result.status === "success") {
        localStorage.setItem("user", JSON.stringify(result.data));
        
        // Redirect based on user role
        const userRole = result.data.user_roles;
        switch (userRole) {
          case 1:
            navigate("/admin");
            break;
          case 2:
            navigate("/user-dashboard");
            break;
          case 3:
            navigate("/moderator-dashboard");
            break;
          default:
            navigate("/dashboard");
        }
      } else {
        setError(result.message || "Login failed");
      }
    } catch (error) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen flex flex-col transition-colors duration-300 mt-10">
      <LandingNavbar />

      <section className="flex flex-col lg:flex-row flex-1 container-responsive py-8 sm:py-16 gap-8 sm:gap-12">
        {/* Left side - image and text */}
        <div className="lg:w-1/2 flex flex-col justify-center items-center lg:items-start text-center lg:text-left">
          <img
            src={login}
            alt="Login Illustration"
            className="w-full max-w-md lg:max-w-full mb-6 rounded-xl"
          />
          <h3 className="text-xl sm:text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            HOW TO TRULY TRUST SOMEONE
          </h3>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm sm:text-base">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Dui
            faucibus in ornare quam viverra orci sagittis eu volutpat. Pharetra
            sit amet aliquam id diam maecenas ultricies.
          </p>
        </div>

        {/* Right side - login form */}
        <div className="lg:w-1/2 flex flex-col justify-center">
          <div className="card-base p-6 sm:p-8 max-w-md mx-auto w-full">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
              LOGIN
            </h3>
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-paam-primary transition-colors duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-paam-primary transition-colors duration-200"
                />
              </div>

              <Button 
                title={loading ? "LOGGING IN..." : "Login"} 
                className="w-full mt-2" 
                type="submit"
                disabled={loading}
              />
            </form>
          </div>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
}

export default Login;
