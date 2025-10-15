import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import LandingFooter from "../../components/LandingFooter";
import LandingNavbar from "../../components/LandingNavbar";
import login from "../../assets/images/login.png";
import Button from "../../UI/Button";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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
      const response = await fetch("/v1/admin?endpoint=loginuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer fsdgsdfsdfgv4vwewetvwev"
        },
        body: JSON.stringify(formData)
      });
      
      const result = await response.json();
      
      if (result.status === "success") {
        login(result.data);
        
        // Redirect based on user role
        const userRole = result.data.user_roles;
        switch (userRole) {
          case 1:
            navigate("/admin");
            break;
          case 2:
            navigate("/user");
            break;
          case 3:
            navigate("/coordinator");
            break;
          default:
            navigate("/user");
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
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 pr-10 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-paam-primary transition-colors duration-200"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
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
