import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import React from "react";
import { toast, ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 
const BASE_URL = import.meta.env.VITE_BASE_URL;

function Booking() {
  const [seats, setSeats] = useState([]);
  const [numSeats, setNumSeats] = useState();
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
    else fetchSeats();
  }, [navigate]);

  const fetchSeats = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/seats`);
      setSeats(res.data);

      const available = res.data.filter((s) => !s.bookedBy);
      if (available.length === 0) {
        setMessage("All seats are currently reserved.");
      } else {
        setMessage(""); 
      }
    } catch (error) {
      console.error("Error fetching seats:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleReserve = async () => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    if (numSeats < 1 || numSeats > 7) {
      toast.error("You can reserve between 1 and 7 seats.");
      return;
    }

    try {
      const res = await axios.post(
        `${BASE_URL}/api/seats/reserve`,
        { count: Number(numSeats) },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(res.data.message);
      setNumSeats(""); 
      fetchSeats();
    } catch (error) {
      const errMsg = error.response?.data?.error || "Reservation failed";
      toast.error(errMsg); 
    }
  };

  const bookedSeats = seats.filter((seat) => seat.bookedBy).length;
  const availableSeats = 80 - bookedSeats;

  return (
    <div className="p-4 flex flex-col items-center min-h-screen bg-gray-200">
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 md:px-10 py-4 bg-white shadow-md">
        <div className="text-2xl font-bold text-rose-500">TrainSeatRes</div>
        <ul className="hidden md:flex space-x-6 text-gray-700 font-medium">
          <li><Link to="/" className="hover:text-rose-500">Home</Link></li>
          <li><Link to="/booking" className="hover:text-rose-500">Booking</Link></li>
          <li><Link to="/my-bookings" className="hover:text-rose-500">My Bookings</Link></li>
          <li><button onClick={handleLogout} className="hover:text-red-600">Logout</button></li>
        </ul>
      </nav>

      <div className="my-20 flex items-center gap-3">
        <input
          type="number"
          min="1"
          max="7"
          value={numSeats}
          onChange={(e) => setNumSeats(e.target.value)}
          className="border p-2 rounded w-50 text-center"
          placeholder="Enter no. of seats"
        />
        <button
          onClick={handleReserve}
          className="bg-rose-500 hover:bg-rose-600 text-white px-6 py-2 rounded shadow-md"
        >
          Reserve
        </button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md ">
        <h3 className="text-lg font-bold mb-2 text-center">Seat Availability</h3>
        <div className="grid grid-cols-7 gap-2 max-w-lg p-4 border rounded-lg bg-gray-100">
          {Array.from({ length: 80 }, (_, i) => {
  const seat = seats.find((s) => s.seatNumber === i + 1);
  const isBooked = seat && seat.bookedBy;

  return (
    <div
  key={i}
  className={`w-12 h-12 flex items-center justify-center relative rounded-md font-bold `}
    >
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1024 1024"
    className="w-10 h-10"
    style={{ fill: isBooked ? "oklch(85.2% 0.199 91.936)" : "oklch(72.3% 0.219 149.579)" }}
  >
    <path d="M921.809455 928.395636h-102.423273v18.059637c0 30.045091-22.970182 54.272-51.2 54.272-28.253091 0-51.223273-24.343273-51.223273-54.272v-18.059637H307.269818v18.059637c0 30.045091-22.970182 54.272-51.2 54.272-28.253091 0-51.223273-24.343273-51.223273-54.272v-18.059637H102.423273C64.721455 928.395636 0 859.810909 0 819.758545v-398.196363c0-39.936 30.510545-72.424727 68.235636-72.424727h68.258909c37.701818 0 68.235636 32.349091 68.235637 72.424727V711.214545h614.539636V421.562182c0-39.936 30.510545-72.424727 68.235637-72.424727h68.258909c37.701818 0 68.235636 32.349091 68.235636 72.424727V819.898182c0.232727 39.936-64.465455 108.520727-102.190545 108.520727zM853.550545 276.712727c-56.552727 0-102.4 48.686545-102.4 108.660364v253.416727H273.058909V385.349818c0-59.973818-45.847273-108.660364-102.4-108.660363-12.008727 0-23.458909-4.072727-34.210909 0V131.956364C136.494545 71.959273 182.341818 23.272727 238.941091 23.272727h546.280727c56.599273 0 102.423273 48.686545 102.423273 108.660364v144.872727c-10.752-4.189091-22.062545-0.116364-34.071273-0.116363z" />
  </svg>
  
  <div className="absolute inset-0 flex items-center justify-center mb-5 text-white font-bold text-xs">
    {i + 1}
  </div>
</div>

  );
})}

        </div>
        <div className="mt-4 flex flex-col items-center text-sm space-y-2">
          <div className="flex justify-center space-x-6">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-yellow-400 mr-2 rounded-sm"></div>
              <span>Booked</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-green-500 mr-2 rounded-sm"></div>
              <span>Available</span>
            </div>
          </div>

          <div className="flex justify-center gap-8 font-medium text-gray-700">
            <p>Total Booked: <span className="font-bold text-yellow-400">{bookedSeats}</span></p>
            <p>Total Available: <span className="font-bold text-green-500">{availableSeats}</span></p>
          </div>
        </div>
      </div>

      <ToastContainer /> 
    </div>
  );
}

export default Booking;
