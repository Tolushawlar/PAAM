import LandingFooter from "../../components/LandingFooter";
import LandingNavbar from "../../components/LandingNavbar";
import login from "../../assets/images/login.png";
import Button from "../../UI/Button";
import { useNavigate } from "react-router-dom";

function OTP() {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <LandingNavbar />

      <section className="flex flex-col md:flex-row flex-1 px-6 lg:px-20 py-10 gap-12">
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

        {/* Right side - OTP form */}
        <div className="md:w-1/2 flex flex-col justify-center bg-white p-8 m-8 rounded-xl shadow-lg max-h-[350px]">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">
            ENTER VERIFICATION CODE
          </h3>

          <form className="flex flex-col gap-6">
            {/* OTP input fields */}
            <div className="flex justify-between gap-3">
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    className="w-12 h-12 text-center border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ))}
            </div>

            <Button
              title="Verify"
              className="w-full mt-4"
              onClick={() => navigate("/login")}
            />
          </form>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
}

export default OTP;
