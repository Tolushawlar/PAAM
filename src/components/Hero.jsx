import Button from "../UI/Button";

function Hero({ image, text1, text2, btn, textColor = "text-white", text2Width = "max-w-xl" }) {
  return (
    <section
      className="h-screen w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <div className={`${textColor} ${text2Width}`}>
          {/* text1 */}
          {text1 && (
            <h1 className="text-xl mb-6">
              {text1}
            </h1>
          )}

          {/* text2 */}
          {text2 && (
            <p className="text-4xl md:text-6xl font-bold mb-6">
              {text2}
            </p>
          )}

          {/* Button (only shown if btn is passed) */}
          {btn && (
            <div className="flex gap-4">
              <Button title={btn} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Hero;
