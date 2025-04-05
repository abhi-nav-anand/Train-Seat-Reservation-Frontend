import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import React from "react";
import { toast, ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 
const BASE_URL = import.meta.env.VITE_BASE_URL;

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
    else fetchBookings();
  }, [navigate]);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${BASE_URL}/api/seats/bookings`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBookings(res.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      toast.error("Failed to fetch bookings.");
    }
  };

  const handleCancel = async (seatNumber) => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(
        `${BASE_URL}/api/seats/cancel`,
        { seatNumber },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(res.data.message);
      fetchBookings();
    } catch (error) {
      const errMsg = error.response?.data?.error || "Cancellation failed";
      toast.error(errMsg); 
    }
  };

  return (
    <div className="p-4 flex flex-col items-center min-h-screen bg-gray-200">
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 md:px-10 py-4 bg-white shadow-md">
        <div className="text-2xl font-bold text-rose-500">TrainSeatRes</div>
        <ul className="hidden md:flex space-x-6 text-gray-700 font-medium">
          <li><Link to="/" className="hover:text-rose-500">Home</Link></li>
          <li><Link to="/booking" className="hover:text-rose-500">Booking</Link></li>
          <li><Link to="/my-bookings" className="hover:text-rose-500">My Bookings</Link></li>
          <li><button onClick={() => { localStorage.removeItem("token"); navigate("/"); }} className="hover:text-red-600">Logout</button></li>
        </ul>
      </nav>

      <h3 className="text-2xl font-bold text-center my-18">My Bookings</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-screen-lg">
        {bookings.length === 0 ? (
          <p className="text-center text-lg font-semibold text-gray-600">You have no bookings yet.</p>
        ) : (
          bookings.map((booking) => (
            <div key={booking.seatNumber} className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex justify-between items-center">
                <span className="font-bold text-xl">Seat {booking.seatNumber}</span>
                <span className="text-sm text-gray-500">Booked by you</span>
              </div>
              <div className="mt-4 flex justify-center">
                <button
                  onClick={() => handleCancel(booking.seatNumber)}
                  className="bg-red-500 hover:bg-red-700 text-white px-6 py-2 rounded shadow-md"
                >
                  Cancel Booking
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <ToastContainer />
    </div>
  );
}

export default MyBookings;
