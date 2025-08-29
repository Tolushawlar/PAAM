import blogpost from "../../assets/images/blogpost.png";
import LandingFooter from "../../components/LandingFooter";
import LandingNavbar from "../../components/LandingNavbar";

function BlogPost() {
    return (
        <div className="min-h-screen bg-white">
            <LandingNavbar />

            <img
                src={blogpost}
                alt="Blog"
                className="float-start h-72 object-cover p-8"
            />

            <div className="p-8 space-y-10">

                {/* Section 1 */}
                <section>
                    <h2 className="text-2xl font-bold mb-3">The Power of Kindness in Everyday Life</h2>
                    <h5 className="text-sm text-gray-500 mb-4">13 May, 2018 · By Mathew Johnson</h5>
                    <p className="text-gray-700 leading-relaxed mb-4">
                        In a world that often feels fast-paced and disconnected, small acts
                        of kindness can make a big difference. Whether it's offering a smile,
                        helping someone carry their groceries, or simply listening when
                        someone needs to talk, compassion creates ripples that spread far
                        beyond what we can see.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                        True compassion isn't about grand gestures, but about being present
                        and willing to extend warmth in the little moments. It's these
                        everyday actions that build stronger communities and bring us closer
                        together.
                    </p>
                </section>

                {/* Section 2 */}
                <section>
                    <h2 className="text-xl font-semibold mb-2">Faith and Daily Practice</h2>
                    <p className="text-gray-700 leading-relaxed mb-3">
                        Faith is not confined to a church building or a Sunday service. It is a guiding light that shapes our thoughts, words, and deeds every day. By integrating prayer, reflection, and Scripture study into our routines, we can cultivate a heart that is sensitive to the needs of others.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                        Daily acts of faith can include forgiving someone who wronged us, offering encouragement to a struggling friend, or simply maintaining a mindset of gratitude. These seemingly small practices strengthen our spiritual resilience and deepen our connection with God.
                    </p>
                </section>

                {/* Section 3 */}
                <section>
                    <h2 className="text-xl font-semibold mb-2">Serving Others as Worship</h2>
                    <p className="text-gray-700 leading-relaxed mb-3">
                        The Bible teaches us that serving others is a form of worship. By giving of our time, resources, and energy, we honor God through our actions. Service can take many forms: volunteering at a local shelter, mentoring youth, or even providing emotional support to those in need.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                        Remember, the most impactful acts of service often come from listening and understanding what people truly need rather than imposing what we think is best.
                    </p>
                </section>

                {/* Section 4 */}
                <section>
                    <h2 className="text-xl font-semibold mb-2">Building a Community of Love</h2>
                    <p className="text-gray-700 leading-relaxed mb-3">
                        Community is a vital part of spiritual growth. By joining together with others who share our values, we create a support system that encourages accountability, compassion, and shared joy. Acts of kindness within a community multiply and inspire others to do the same.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                        Whether through church gatherings, study groups, or informal meetups, nurturing meaningful relationships strengthens both our faith and our ability to impact the world positively.
                    </p>
                </section>

                {/* Section 5 */}
                <section>
                    <h2 className="text-xl font-semibold mb-2">The Power of Prayer</h2>
                    <p className="text-gray-700 leading-relaxed mb-3">
                        Prayer is a powerful tool that connects us directly with God. Through prayer, we express gratitude, seek guidance, and intercede for others. It strengthens our faith and brings peace to our hearts in times of uncertainty.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                        Consistent prayer cultivates patience, humility, and a deeper understanding of God's plan. Remember, prayer is not only about asking but also listening and reflecting.
                    </p>
                </section>

                {/* Section 6 */}
                <section>
                    <h2 className="text-xl font-semibold mb-2">The Joy of Giving and Charity</h2>
                    <p className="text-gray-700 leading-relaxed mb-3">
                        Giving to those in need is a cornerstone of Christian living. Charity can be financial, emotional, or practical support. By giving selflessly, we reflect God’s love and create a positive impact in the lives of others.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                        Remember, it is not the size of the gift but the love behind it that matters. Acts of kindness, whether big or small, build bridges of hope and demonstrate faith in action.
                    </p>
                </section>

                {/* Section 7 */}
                <section>
                    <h2 className="text-xl font-semibold mb-2">Maintaining Hope in Difficult Times</h2>
                    <p className="text-gray-700 leading-relaxed mb-3">
                        Life is filled with challenges, but hope sustains us during hardships. By placing trust in God’s plan, we can navigate difficulties with courage and faith. Hope inspires resilience and strengthens our spiritual journey.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                        Sharing words of encouragement and uplifting others in their struggles also spreads hope throughout our communities. Hope is contagious, and by living as a beacon of light, we inspire others to persevere.
                    </p>
                </section>

                {/* Section 8 */}
                <section>
                    <h2 className="text-xl font-semibold mb-2">Reflecting on Spiritual Growth</h2>
                    <p className="text-gray-700 leading-relaxed mb-3">
                        Regular reflection allows us to evaluate our spiritual journey and recognize God’s work in our lives. Journaling, meditation, and scripture study help us understand our strengths, weaknesses, and areas for growth.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                        By taking time to reflect, we become more mindful of our actions, more compassionate toward others, and more connected to our faith. Spiritual reflection is the foundation for intentional living and meaningful relationships.
                    </p>
                </section>
            </div>
            <LandingFooter />
        </div>
    );
}

export default BlogPost;
