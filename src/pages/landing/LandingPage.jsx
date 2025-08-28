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
import joinbg from '../../assets/images/joinbg.png'
import servebg from '../../assets/images/servebg.png'


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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <LandingNavbar />

      {/* Hero Section */}
      <section
        className="h-screen w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${hero})` }}
      >
        <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="text-white max-w-xl">
            <h1 className="text-xl mb-6">
              WELCOME TO OUR PLATFORM
            </h1>

            <p className="text-4xl md:text-6xl font-bold mb-6">
              BECOME A PART OF OUR COMMUNITY
            </p>

            <div className="flex gap-4">
              <Button title="Learn More" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl font-bold text-gray-900">
              A DIGITAL HUB THAT'S RELEVANT
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {features.map((item, i) => (
              <div
                key={i}
                className="bg-[#ff383c]/50 border-b-8 border-[#ff383c]/70 rounded-xl p-8 text-center shadow-sm hover:shadow-md transition"
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="mx-auto mb-6 w-20 h-20 object-contain"
                />
                <h3 className="text-xl font-semibold mb-4 text-gray-900">
                  {item.title}
                </h3>
                <p className="text-lg text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Love and compassion Section */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top content */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              LOVE AND COMPASSION
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              PAAM Global Digital Hub is a comprehensive learning management system
              designed to facilitate professional development, training, and community
              building across various industries and sectors.
            </p>
          </div>

          <div className="flex justify-center">
            <Button title="Learn More" />
          </div>

          {/* Images arrangement */}
          <div className="flex justify-center items-end gap-6 mb-20 relative">
            {/* Left image */}
            <img
              src={love1}
              alt=""
              className="w-40 md:w-48 lg:w-56 -translate-y-40"
            />

            {/* Middle image*/}
            <img
              src={love2}
              alt=""
              className="w-56 md:w-72 lg:w-80 translate-y-8 shadow-xl z-0"
            />

            {/* Right image */}
            <img
              src={love3}
              alt=""
              className="w-40 md:w-48 lg:w-56 -translate-y-40"
            />
          </div>

          {/* Bottom content */}
          <div className="text-center max-w-3xl mx-auto">
            <p className="uppercase text-gray-900 font-semibold mb-2">
              our mission & vision
            </p>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">GROW WITH US</h3>
            <p className="text-lg text-gray-600 mb-8">
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
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="font-semibold">LEARN AND GROW</p>
            <h2 className="text-3xl font-bold text-gray-900">
              BENEFITS OF JOINING OUR DIGITAL HUB
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((item, i) => (
              <div
                key={i}
                className="relative h-64 rounded-xl overflow-hidden shadow-lg"
              >
                {/* Full image */}
                <img
                  src={item.img}
                  alt={item.text}
                  className="w-full h-full object-cover"
                />

                {/* Text at the bottom */}
                <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 p-4">
                  <p className="text-white text-lg font-semibold text-center">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Join Us Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className='text-center'>
            <p>UPCOMING SERMONS</p>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">JOIN US AND BECOME A PART OF SOMETHING GREAT</h2>
          </div>
          <div className="flex flex-col lg:flex-row w-full h-full">

            {/* Text Section */}
            <div className="bg-[#ff383c]/20 p-8 flex-1 flex flex-col justify-between rounded-l-xl">
              <div className="space-y-4 text-black">
                <p className="text-sm font-semibold text-end">20 JULY</p>
                <p className="font-medium">Upcoming Event</p>
                <h3 className="text-2xl font-bold">WATCH AND LISTEN TO OUR SERMONS</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
                <p className="flex items-center gap-2">
                  <span>⏰</span> Friday 23:39 IST Saturday 11:20 ISD
                </p>
                <p className="flex items-center gap-2">
                  <span>📍</span> No 233 Main St. New York, United States
                </p>
              </div>

              <div className="mt-6 flex justify-center">
                <Button title="Learn More" />
              </div>
            </div>

            {/* Image Section */}
            <div className="flex-2 h-full">
              <img
                src={joinbg}
                alt="Join Background"
                className="w-full h-full object-cover rounded-r-xl"
              />
            </div>
          </div>

          {/* Last button, justified end */}
          <div className="mt-6 flex justify-end">
            <Button title="View All Events →" />
          </div>
        </div>
      </section>



      {/* Serve The World Section */}
      <section className="py-20 bg-gray-50">
        <div
          className="relative w-full h-[600px] bg-cover bg-center"
          style={{ backgroundImage: `url(${servebg})` }}
        >
          {/* Centered white text box */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative bg-white p-10 rounded-xl border-b-8 border-red-500 max-w-3xl w-full text-black text-center">
              <h2 className="text-3xl font-bold mb-4">
                WE WANT TO SERVE THE WORLD AROUND US
              </h2>
              <p className="mb-6">
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
      <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div>
          <p className="font-semibold text-gray-700 text-center">UPCOMING SERMONS</p>
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            SHARE, INSPIRE, INNOVATE
          </h2>
          <div className="flex flex-col sm:flex-row justify-between gap-5">
            {sermons.map((item, index) => (
              <div
                key={index}
                className= "bg-[#ff383c]/50 p-6 rounded-xl flex-1"
              >
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="mb-4">{item.description}</p>
                <p className="font-medium">{item.author}</p>
                <p className="text-gray-600">{item.date}</p>
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