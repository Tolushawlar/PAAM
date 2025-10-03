import React from 'react';
import { Link } from 'react-router-dom';
import LandingFooter from '../../components/LandingFooter';
import LandingNavbar from '../../components/LandingNavbar';
import Button from '../../UI/Button';
import landing1 from '../../assets/landing1.svg'
import landing2 from '../../assets/landing2.svg'
import landing3 from '../../assets/landing3.svg'
import hero from '../../assets/images/hero.png'
import love1 from '../../assets/images/love1.png'
import love2 from '../../assets/images/love2.png'
import love3 from '../../assets/images/love3.png'
import benefits1 from '../../assets/images/benefits1.png'
import benefits2 from '../../assets/images/benefits2.png'
import benefits3 from '../../assets/images/benefits3.png'
import benefits4 from '../../assets/images/benefits4.png'

import servebg from '../../assets/images/servebg.png'
import Hero from '../../components/hero';
import Join from '../../components/Join';


function LandingPage() {
  const benefits = [
    { img: benefits1, text: "Watch and Listen To Our Sermons" },
    { img: benefits2, text: "Join Our Digital Community" },
    { img: benefits3, text: "Access Learning Resources" },
    { img: benefits4, text: "Grow Spiritually and Mentally" },
  ];

  const features = [
    {
      img: landing1,
      title: "About us",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      img: landing2,
      title: "Get involved",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      img: landing3,
      title: "Giving back",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
  ];

  const sermons = [
    {
      title: "WATCH AND LISTEN TO OUR SERMONS",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      author: "By Mathew Johnson",
      date: "Tuesday 13 May, 2021",
      bgColor: "bg-red-100",
    },
    {
      title: "SHARE AND GROW WITH OTHERS",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      author: "By Sarah Williams",
      date: "Wednesday 14 May, 2021",
      bgColor: "bg-green-100",
    },
    {
      title: "INSPIRE THROUGH FAITH",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      author: "By John Doe",
      date: "Thursday 15 May, 2021",
      bgColor: "bg-blue-100",
    },
    {
      title: "CONNECT AND SERVE",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      author: "By Emily Clark",
      date: "Friday 16 May, 2021",
      bgColor: "bg-yellow-100",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* Header */}
      <LandingNavbar />

      {/* Hero Section */}
      <div className="pt-16 sm:pt-20">
        <Hero
          image={hero}
          text1="WELCOME TO OUR PLATFORM"
          text2="BECOME A PART OF OUR COMMUNITY"
          btn="LEARN MORE"
        />
      </div>

      {/* Features Section */}
      <section id="features" className="py-16 sm:py-28 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="container-responsive">
          <div className="text-center mb-12 sm:mb-20 animate-fade-in">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">
              A DIGITAL HUB THAT'S RELEVANT
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-10">
            {features.map((item, i) => (
              <div
                key={i}
                className="bg-paam-secondary/50 dark:bg-paam-secondary/30 border-b-8 border-paam-secondary/70 dark:border-paam-secondary/50 rounded-xl p-4 sm:p-8 text-center shadow-sm hover:shadow-md hover:-translate-y-2 transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="mx-auto mb-3 sm:mb-6 w-12 h-12 sm:w-20 sm:h-20 object-contain hover:scale-110 transition-transform duration-300"
                />
                <h3 className="text-base sm:text-xl font-semibold mb-2 sm:mb-4 text-gray-900 dark:text-gray-100">
                  {item.title}
                </h3>
                <p className="text-sm sm:text-lg text-gray-600 dark:text-gray-300">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Love and compassion Section */}
      <section className="py-16 sm:py-24 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="container-responsive">
          {/* Top content */}
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 animate-slide-up">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4 sm:mb-6">
              LOVE AND COMPASSION
            </h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-6 sm:mb-8">
              PAAM Global Digital Hub is a comprehensive learning management system
              designed to facilitate professional development, training, and community
              building across various industries and sectors.
            </p>
          </div>

          <div className="flex justify-center mb-8 animate-bounce-in">
            <Button title="Learn More" />
          </div>

          <div className="flex justify-center items-end gap-3 sm:gap-6 mb-12 sm:mb-20 overflow-hidden">
            <img src={love1} alt="" className="w-24 sm:w-40 md:w-48 lg:w-56 -translate-y-20 sm:-translate-y-40 animate-slide-in-left hover:scale-105 transition-transform duration-300" />
            <img src={love2} alt="" className="w-32 sm:w-56 md:w-72 lg:w-80 translate-y-4 sm:translate-y-8 shadow-xl animate-scale-in hover:scale-105 transition-transform duration-300" />
            <img src={love3} alt="" className="w-24 sm:w-40 md:w-48 lg:w-56 -translate-y-20 sm:-translate-y-40 animate-slide-in-right hover:scale-105 transition-transform duration-300" />
          </div>

          {/* Bottom content */}
          <div className="text-center max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <p className="uppercase text-gray-900 dark:text-gray-100 font-semibold mb-2 text-sm sm:text-base">
              our mission & vision
            </p>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4">GROW WITH US</h3>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-6 sm:mb-8">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <div className='flex justify-center'>
              <Button title="Read More" />
            </div>
          </div>
        </div>
      </section>


      {/* Benefits Section */}
      <section className="py-16 sm:py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
        <div className="container-responsive">
          <div className="text-center mb-8 sm:mb-10 animate-slide-up">
            <p className="font-semibold text-gray-700 dark:text-gray-300 text-sm sm:text-base">LEARN AND GROW</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">
              BENEFITS OF JOINING OUR DIGITAL HUB
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {benefits.map((item, i) => (
              <div
                key={i}
                className="relative h-40 sm:h-64 rounded-xl overflow-hidden shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 animate-scale-in group"
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                {/* Full image */}
                <img
                  src={item.img}
                  alt={item.text}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Text at the bottom */}
                <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 p-2 sm:p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white text-xs sm:text-lg font-semibold text-center">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Join Us Section */}
      <Join />


      {/* Serve The World Section */}
      <section className="py-16 sm:py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
        <div
          className="relative w-full h-[400px] sm:h-[600px] bg-cover bg-center"
          style={{ backgroundImage: `url(${servebg})` }}
        >
          {/* Centered white text box */}
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="relative bg-white dark:bg-gray-900 p-6 sm:p-10 rounded-xl border-b-8 border-red-500 max-w-3xl w-full text-black dark:text-white text-center shadow-xl">
              <h2 className="text-xl sm:text-3xl font-bold mb-3 sm:mb-4">
                WE WANT TO SERVE THE WORLD AROUND US
              </h2>
              <p className="mb-4 sm:mb-6 text-sm sm:text-base">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.
              </p>
              <div className='flex justify-center'>
                <Button title="Start Now" />
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Inspire Section */}
      <section className="py-16 sm:py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
        <div className="container-responsive">
          <div>
            <p className="font-semibold text-gray-700 dark:text-gray-300 text-center text-sm sm:text-base">UPCOMING SERMONS</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4 sm:mb-6 text-center">
              SHARE, INSPIRE, INNOVATE
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {sermons.map((item, index) => (
                <div
                  key={index}
                  className="bg-paam-secondary/50 dark:bg-paam-secondary/30 p-4 sm:p-6 rounded-xl hover:shadow-lg transition-shadow duration-300"
                >
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">{item.title}</h3>
                  <p className="mb-3 sm:mb-4 text-sm sm:text-base text-gray-700 dark:text-gray-300">{item.description}</p>
                  <p className="font-medium text-sm sm:text-base text-gray-800 dark:text-gray-200">{item.author}</p>
                  <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">{item.date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* Footer */}
      <LandingFooter />
    </div>
  );
}

export default LandingPage;