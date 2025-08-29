import joinbg from '../assets/images/joinbg.png'
import { FaClock, FaMapMarkerAlt } from "react-icons/fa";
import Button from '../UI/Button';

function Join() {
    return ( 
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
                          <FaClock className="text-gray-700" /> Friday 23:39 IST Saturday 11:20 ISD
                        </p>
                        <p className="flex items-center gap-2">
                          <FaMapMarkerAlt className="text-gray-700" /> No 233 Main St. New York, United States
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
        
        
        
     );
}

export default Join;