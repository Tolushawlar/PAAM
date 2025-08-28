import React from "react";
import { FaClock, FaMapMarkerAlt } from "react-icons/fa";
import LandingFooter from "../../components/LandingFooter";
import LandingNavbar from "../../components/LandingNavbar";
import Hero from "../../components/hero";
import Join from "../../components/Join";

import eventsbg from "../../assets/images/eventsbg.png";

function Events() {
  const events = [
    {
      date: "20 JULY",
      tag: "Upcoming Event",
      title: "100 RANDOM ACTS OF KINDNESS",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
      time: "Friday 23:39 IST Saturday 11:20 ISD",
      location: "No 233 Main St. New York, United States",
    },
    {
      date: "20 JULY",
      tag: "Upcoming Event",
      title: "FAITH IS A PROCESS NOT A DESTINATION",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
      time: "Friday 23:39 IST Saturday 11:20 ISD",
      location: "No 233 Main St. New York, United States",
    },
    {
      date: "20 JULY",
      tag: "Upcoming Event",
      title: "THERE IS NOTHING IMPOSSIBLE",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
      time: "Friday 23:39 IST Saturday 11:20 ISD",
      location: "No 233 Main St. New York, United States",
    },
    {
      date: "20 JULY",
      tag: "Upcoming Event",
      title: "WATCH AND LISTEN TO OUR SERMONS",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
      time: "Friday 23:39 IST Saturday 11:20 ISD",
      location: "No 233 Main St. New York, United States",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <LandingNavbar />

      <Hero
        image={eventsbg}
        text1="SERMON"
        text2="TAKE PART IN OUR SERMON"
        textColor="text-black"
        text2Width="max-w-5xl"
      />

      <Join />

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            VIEW ALL EVENTS
          </h2>
          <div className="flex justify-between gap-8 ">
            {events.map((event, i) => (
              <div
                key={i}
                className="bg-[#ff383c]/50 p-8 flex flex-col justify-between rounded-xl"
              >
                <div className="space-y-4 text-black">
                  <p className="text-sm font-semibold text-end">{event.date}</p>
                  <p className="font-medium">{event.tag}</p>
                  <h3 className="text-2xl font-bold">{event.title}</h3>
                  <p>{event.desc}</p>
                  <p className="flex items-center gap-2">
                    <FaClock className="text-gray-700" /> {event.time}
                  </p>
                  <p className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-gray-700" /> {event.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
}

export default Events;
