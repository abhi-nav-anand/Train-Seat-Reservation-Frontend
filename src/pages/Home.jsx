import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleBookingRedirect = () => {
    if (isLoggedIn) {
      navigate("/booking");
    } else {
      navigate("/register");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 md:px-10 py-4 bg-white shadow-md">
        <div className="text-2xl font-bold text-rose-500">TrainSeatRes</div>
        <ul className="hidden md:flex space-x-6 text-gray-700 font-medium">
          <li><Link to="/" className="hover:text-rose-500">Home</Link></li>
          <li><button onClick={handleBookingRedirect} className="hover:text-rose-500">Booking</button></li>
          {isLoggedIn ? (
            <>
              <li><Link to="/my-bookings" className="hover:text-rose-500">My Bookings</Link></li>
              <li><button onClick={handleLogout} className="hover:text-red-600">Logout</button></li>
            </>
          ) : (
            <>
              <li><Link to="/login" className="hover:text-rose-500">Login</Link></li>
              <li><Link to="/register" className="hover:text-rose-500">Register</Link></li>
            </>
          )}
        </ul>
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-2xl text-gray-700 focus:outline-none">
            ☰
          </button>
        </div>
      </nav>

      {isOpen && (
        <div className="md:hidden bg-white shadow-md px-4 py-2">
          <ul className="space-y-3 text-gray-700 font-medium">
            <li><Link to="/" className="block" onClick={() => setIsOpen(false)}>Home</Link></li>
            <li>
              <button 
                onClick={() => { handleBookingRedirect(); setIsOpen(false); }} 
                className="block w-full text-left"
              >
                Booking
              </button>
            </li>
            {isLoggedIn ? (
              <>
                <li><Link to="/my-bookings" className="block w-full text-left">My Bookings</Link></li>
                <li><button onClick={handleLogout} className="block w-full text-left text-red-600">Logout</button></li>
              </>
            ) : (
              <>
                <li><Link to="/login" className="block" onClick={() => setIsOpen(false)}>Login</Link></li>
                <li><Link to="/register" className="block" onClick={() => setIsOpen(false)}>Register</Link></li>
              </>
            )}
          </ul>
        </div>
      )}

      <section className="mt-20 flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-16">
        <div className="w-full md:w-1/2 text-center md:text-left mb-10 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-snug">
            Book Train Seats <br className="hidden md:block" /> Instantly & Easily
          </h1>
          <p className="mt-6 text-gray-600 text-lg md:text-xl">
            Hassle-free reservations for your train journey, anytime.
          </p>
          <button onClick={handleBookingRedirect} className="mt-8 px-6 py-3 bg-rose-500 text-white rounded-lg shadow hover:bg-rose-600 transition duration-300">
            Book Now
          </button>
        </div>
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4463/4463470.png"
            alt="Train"
            className="w-72 md:w-96"
          />
        </div>
      </section>

      <section className="px-6 md:px-20 py-12 grid gap-8 grid-cols-1 md:grid-cols-3">
        <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1524/1524850.png"
            alt="Booking"
            className="w-16 mb-4"
          />
          <h3 className="text-xl font-semibold mb-2 text-rose-600">Easy Booking</h3>
          <p className="text-gray-600">
            Simple and intuitive interface to reserve your train seats in minutes.
          </p>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1086/1086933.png"
            alt="Real-time"
            className="w-16 mb-4"
          />
          <h3 className="text-xl font-semibold mb-2 text-rose-600">Real-time Availability</h3>
          <p className="text-gray-600">
            Stay updated with live seat availability and train statuses.
          </p>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1049/1049853.png"
            alt="Support"
            className="w-16 mb-4"
          />
          <h3 className="text-xl font-semibold mb-2 text-rose-600">24/7 Support</h3>
          <p className="text-gray-600">
            Our support team is always ready to assist you on your journey.
          </p>
        </div>
      </section>

      <footer className="bg-white text-center py-6 text-gray-600 text-sm">
        © {new Date().getFullYear()} Train Seat Reservation | All Rights Reserved
      </footer>
    </div>
  );
};

export default Home;
