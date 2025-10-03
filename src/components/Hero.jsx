import Button from "../UI/Button";

function Hero({ image, text1, text2, btn, textColor = "text-white dark:text-gray-100", text2Width = "max-w-xl" }) {
  return (
    <section
      className="h-screen w-full bg-cover bg-center relative  bottom-2"
      style={{ backgroundImage: `url(${image})` }}
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      
      <div className="relative h-full container-responsive flex items-center">
        <div className={`${textColor} ${text2Width} z-10`}>
          {/* text1 */}
          {text1 && (
            <h1 className="text-base sm:text-xl mb-4 sm:mb-6 font-medium animate-slide-in-left">
              {text1}
            </h1>
          )}

          {/* text2 */}
          {text2 && (
            <p className="text-2xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6 leading-tight animate-slide-up" style={{ animationDelay: '0.3s' }}>
              {text2}
            </p>
          )}

          {/* Button (only shown if btn is passed) */}
          {btn && (
            <div className="flex gap-4 animate-bounce-in" style={{ animationDelay: '0.6s' }}>
              <Button title={btn} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Hero;
