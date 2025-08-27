import LandingFooter from "../../components/LandingFooter";
import LandingNavbar from "../../components/LandingNavbar";
import login from "../../assets/images/login.png";
import Button from "../../UI/Button";

function Login() {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <LandingNavbar />

      <section className="flex flex-col items-start md:flex-row flex-1 px-6 lg:px-20 py-10 gap-12">
        {/* Left side - image and text */}
        <div className="md:w-1/2 flex flex-col justify-center items-center md:items-start text-center md:text-left p-8">
          <img
            src={login}
            alt="Login Illustration"
            className="w-3/4 md:w-full mb-6"
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
        <div className="md:w-1/2 flex flex-col justify-center h-[300px] bg-white p-8 m-8 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold text-gray-800 text-left mb-6">
            LOGIN
          </h3>
          <form className="flex flex-col gap-4 flex-1">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
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
                placeholder="Enter your password"
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <Button title="Login" className="w-full mt-2" />
          </form>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
}

export default Login;
