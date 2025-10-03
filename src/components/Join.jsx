import joinbg from '../assets/images/joinbg.png'
import { FaClock, FaMapMarkerAlt } from "react-icons/fa";
import Button from '../UI/Button';

function Join() {
    return ( 
        <section className="py-16 sm:py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
                <div className="container-responsive">
                  <div className='text-center mb-8 sm:mb-12 animate-fade-in'>
                    <p className="text-sm sm:text-base font-semibold text-gray-700 dark:text-gray-300">UPCOMING SERMONS</p>
                    <h2 className="text-xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4 sm:mb-6">JOIN US AND BECOME A PART OF SOMETHING GREAT</h2>
                  </div>
                  <div className="flex flex-col lg:flex-row w-full rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 animate-slide-up">
        
                    {/* Text Section */}
                    <div className="bg-paam-secondary/20 dark:bg-paam-secondary/30 p-6 sm:p-8 flex-1 flex flex-col justify-between lg:rounded-l-xl animate-slide-in-left">
                      <div className="space-y-3 sm:space-y-4 text-black dark:text-gray-100">
                        <p className="text-xs sm:text-sm font-semibold text-end">20 JULY</p>
                        <p className="font-medium text-sm sm:text-base">Upcoming Event</p>
                        <h3 className="text-lg sm:text-2xl font-bold">WATCH AND LISTEN TO OUR SERMONS</h3>
                        <p className="text-sm sm:text-base">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
                        <p className="flex items-center gap-2 text-xs sm:text-sm">
                          <FaClock className="text-gray-700 dark:text-gray-400" /> Friday 23:39 IST Saturday 11:20 ISD
                        </p>
                        <p className="flex items-center gap-2 text-xs sm:text-sm">
                          <FaMapMarkerAlt className="text-gray-700 dark:text-gray-400" /> No 233 Main St. New York, United States
                        </p>
                      </div>
        
                      <div className="mt-4 sm:mt-6 flex justify-center">
                        <Button title="Learn More" />
                      </div>
                    </div>
        
                    {/* Image Section */}
                    <div className="flex-1 lg:flex-2 h-64 sm:h-80 lg:h-auto animate-slide-in-right">
                      <img
                        src={joinbg}
                        alt="Join Background"
                        className="w-full h-full object-cover lg:rounded-r-xl hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>
        
                  {/* Last button, justified end */}
                  <div className="mt-4 sm:mt-6 flex justify-center sm:justify-end animate-bounce-in" style={{ animationDelay: '0.5s' }}>
                    <Button title="View All Events →" />
                  </div>
                </div>
              </section>
        
        
        
     );
}

export default Join;