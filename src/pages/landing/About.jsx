import React from "react";
import LandingFooter from "../../components/LandingFooter";
import LandingNavbar from "../../components/LandingNavbar";
import Hero from "../../components/hero";

import about1 from "../../assets/images/about1.png";
import about2 from "../../assets/images/about2.png";
import about3 from "../../assets/images/about3.png";
import about4 from "../../assets/images/about4.png";

import team1 from "../../assets/images/team1.png";
import team2 from "../../assets/images/team2.png";
import team3 from "../../assets/images/team3.png";
import team4 from "../../assets/images/team4.png";

import aboutbg from "../../assets/images/aboutbg.png";
import love1 from "../../assets/images/love1.png";
import love2 from "../../assets/images/love2.png";
import love3 from "../../assets/images/love3.png";

import twitterb from "../../assets/twitterb.svg";
import facebookb from "../../assets/facebookb.svg";
import linkedinb from "../../assets/linkedinb.svg";

function About() {
    const benefits = [
        {
            title: "FIND FULFILMENT AND JOY",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.",
            img: about1,
            reverse: true,
        },
        {
            title: "SHARED VALUES",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.",
            img: about2,
            reverse: false,
        },
        {
            title: "CHARITY EVENTS",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.",
            img: about3,
            reverse: true,
        },
        {
            title: "ALL ARE WELCOME",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.",
            img: about4,
            reverse: false,
        },
    ];

    const team = [
        { name: "KIM BOWEN", role: "Pastor, Church", img: team1 },
        { name: "DARNELL WATKINS", role: "Pastor, Church", img: team2 },
        { name: "NAOMI CRAIG", role: "Pastor, Church", img: team3 },
        { name: "SANTOS PAYNE", role: "Pastor, Church", img: team4 },
    ];

    const socials = [
        { icon: twitterb, alt: "Twitter" },
        { icon: facebookb, alt: "Facebook" },
        { icon: linkedinb, alt: "LinkedIn" },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            {/* Header */}
            <LandingNavbar />

            {/* Hero Section */}
            <Hero
                image={aboutbg}
                text1="ABOUT US"
                text2="SERVING THE WORLD AROUND US"
                textColor="text-black"
                text2Width="max-w-5xl"
            />

            {/* Love and compassion Section */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h3 className="text-xl font-semibold mb-4">
                        WELCOME TO PAAM GLOBAL DIGITAL HUB
                    </h3>
                    <h2 className="text-3xl font-bold mb-6">LOVE AND COMPASSION</h2>
                    <p className="text-lg text-gray-600 mb-12">
                        PAAM Global Digital Hub is a comprehensive learning management
                        system designed to facilitate professional development, training,
                        and community building.
                    </p>

                    <div className="flex justify-center items-end gap-6 mb-20">
                        <img src={love1} alt="" className="w-40 md:w-48 lg:w-56 -translate-y-40" />
                        <img src={love2} alt="" className="w-56 md:w-72 lg:w-80 translate-y-8 shadow-xl" />
                        <img src={love3} alt="" className="w-40 md:w-48 lg:w-56 -translate-y-40" />
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 text-left">
                        <div>
                            <h5 className="text-sm font-bold text-gray-700">
                                OUR MISSION & VISION
                            </h5>
                            <h4 className="text-xl font-semibold mb-4">
                                STRIVING FOR A BETTER TOMORROW
                            </h4>
                            <p className="text-gray-600">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.
                            </p>
                        </div>
                        <div>
                            <h5 className="text-sm font-bold text-gray-700">WHAT WE DO</h5>
                            <h4 className="text-xl font-semibold mb-4">
                                BRINGING PEACE AND JOY TO THE WORLD
                            </h4>
                            <p className="text-gray-600">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h5 className="text-sm font-bold text-gray-700">BENEFITS</h5>
                        <h4 className="text-3xl font-bold">THE BENEFITS OF JOINING OUR PLATFORM</h4>
                    </div>

                    <div className="space-y-24">
                        {benefits.map((b, i) => (
                            <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                {/* Image column */}
                                <div className={`flex justify-center ${b.reverse ? "md:order-2" : ""}`}>
                                    <img
                                        src={b.img}
                                        alt={b.title}
                                        className="h-64 w-full max-w-sm object-contain rounded-lg shadow-md"
                                    />
                                </div>

                                {/* Text column */}
                                <div className={`flex items-center ${b.reverse ? "md:order-1" : ""}`}>
                                    <div className="text-left">
                                        <h5 className="text-lg font-semibold mb-4">{b.title}</h5>
                                        <p className="text-gray-600">{b.text}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>



            {/* Team Section */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h5 className="text-sm font-bold text-gray-700">CHURCH MEMBERS</h5>
                    <h4 className="text-3xl font-bold mb-12">
                        MEET OUR INSPIRATIONAL TEAM
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                        {team.map((member, i) => (
                            <div key={i} className="flex flex-col items-center text-center bg-[#ff383c]/50 p-6 rounded-xl flex-1">
                                <img
                                    src={member.img}
                                    alt={member.name}
                                    className="w-40 h-40 rounded-full object-cover mb-4"
                                />
                                <p className="font-semibold">{member.name}</p>
                                <p className="text-gray-600 mb-4">{member.role}</p>
                                <div className="flex space-x-3">
                                    {socials.map((s, j) => (
                                        <a key={j} href="#" className="hover:opacity-80">
                                            <img src={s.icon} alt={s.alt} className="h-6 w-6" />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <LandingFooter />
        </div>
    );
}

export default About;
