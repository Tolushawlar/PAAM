import React from "react";
import { FaClock, FaMapMarkerAlt } from "react-icons/fa";
import LandingFooter from "../../components/LandingFooter";
import LandingNavbar from "../../components/LandingNavbar";
import blog from "../../assets/images/blog.png";
import Button from "../../UI/Button";
import { Link } from "react-router-dom";

function Blog() {
    const blogs = [
        {
            title: "THE BEST WAY TO INSPIRE PEOPLE",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            author: "By Mathew Johnson",
            date: "Tuesday 13 May, 2021",
        },
        {
            title: "HOW TO SHOW COMPASSION",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            author: "By Sarah Williams",
            date: "Wednesday 14 May, 2021",
        },
        {
            title: "THE BIBLICAL PURPOSE OF MONEY",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            author: "By John Doe",
            date: "Thursday 15 May, 2021",
        },
        {
            title: "THE BEST WAY TO INSPIRE PEOPLE",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            author: "By Emily Clark",
            date: "Friday 16 May, 2021",
        },
        {
            title: "WHAT IT MEANS TO BE A DISCIPLE",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            author: "By Emily Clark",
            date: "Friday 16 May, 2021",
        },
        {
            title: "WHAT IT MEANS TO BELIEVE",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            author: "By Emily Clark",
            date: "Friday 16 May, 2021",
        },
        {
            title: "THE MODERN CHURCH IN 2022",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            author: "By Emily Clark",
            date: "Friday 16 May, 2021",
        },
        {
            title: "CONNECT AND SERVE",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            author: "By Emily Clark",
            date: "Friday 16 May, 2021",
        },
    ];

    return (
        <div className="min-h-screen bg-gray-100">
            <LandingNavbar />
            {/* Featured Blog */}
            <section className="py-12">
                <p className="font-semibold text-gray-700 text-center">OUR BLOG</p>
                <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                    MOST RECENT POST
                </h2>
                <div className="max-w-6xl mx-auto p-10 flex flex-col md:flex-row bg-white rounded-lg overflow-hidden">
                    <img
                        src={blog}
                        alt="featured blog"
                    />
                    <div className="p-6 flex flex-col justify-center md:w-1/2">
                        <div className="flex justify-between text-sm text-gray-600 mb-2">
                            <p>Tuesday 13 May, 2022</p>
                            <p> By John Hunau Deo</p>
                        </div>
                        <h4 className="text-lg font-bold mb-2">
                            CHURCH WAS DOING WHAT HE OFTEN DID WHEN DROPPED AN ORACLE
                        </h4>
                        <p className="text-gray-700 mb-4">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                            aliquip ex ea commodo consequat. Duis aute irure dolor.
                        </p>
                        <Button title="Read more" />
                    </div>
                </div>
            </section>

            {/* All Blog Posts */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                        ALL BLOG POSTS
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {blogs.map((item, index) => (
                            <Link
                                to="/blogpost"
                                key={index}
                                className="bg-[#ff383c]/50 p-6 rounded-xl flex flex-col hover:shadow-lg transition-shadow duration-300"
                            >
                                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                                <p className="mb-4 text-gray-700">{item.description}</p>
                                <p className="font-medium">{item.author}</p>
                                <p className="text-gray-600">{item.date}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>


            <LandingFooter />
        </div>
    );
}

export default Blog;
