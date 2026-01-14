// // import { useEffect, useState } from "react";
// // import API from "../api/api";
// // import { useAuth } from "../context/AuthContext";

// // const UserDashboard = () => {
// //   const { logout } = useAuth();
// //   const [reservations, setReservations] = useState([]);
// //   const [form, setForm] = useState({
// //     date: "",
// //     timeSlot: "",
// //     guests: "",
// //   });

// //   const fetchReservations = async () => {
// //     const res = await API.get("/api/reservations/my");
// //     setReservations(res.data);
// //   };

// //   const createReservation = async () => {
// //   try {
// //     await API.post("/api/reservations", {
// //       date: form.date,
// //       timeSlot: form.timeSlot,
// //       guests: Number(form.guests), // 👈 VERY IMPORTANT
// //     });
// //     fetchReservations();
// //   } catch (err) {
// //     alert(err.response?.data?.message || "Reservation failed");
// //   }
// // };


// //   useEffect(() => {
// //     fetchReservations();
// //   }, []);

// //   return (
// //     <div className="p-6">
// //       <div className="flex justify-between mb-6">
// //         <h1 className="text-2xl font-bold">My Reservations</h1>
// //         <button onClick={logout} className="text-red-600">
// //           Logout
// //         </button>
// //       </div>

// //       <div className="bg-white p-4 rounded shadow mb-6 space-y-2">
// //   <input
// //     type="date"
// //     className="border p-2 w-full"
// //     value={form.date}
// //     onChange={(e) => setForm({ ...form, date: e.target.value })}
// //   />

// //   <input
// //     type="time"
// //     className="border p-2 w-full"
// //     value={form.timeSlot}
// //     onChange={(e) => setForm({ ...form, timeSlot: e.target.value })}
// //   />

// //   <input
// //     type="number"
// //     min="1"
// //     className="border p-2 w-full"
// //     placeholder="Guests"
// //     value={form.guests}
// //     onChange={(e) => setForm({ ...form, guests: e.target.value })}
// //   />

// //   <button
// //     onClick={createReservation}
// //     className="bg-green-600 text-white px-4 py-2 rounded"
// //   >
// //     Reserve
// //   </button>
// // </div>


// //       {reservations.map((r) => (
// //         <div key={r._id} className="bg-gray-100 p-3 rounded mb-2">
// //           {r.date} | {r.timeSlot} | Table {r.table.tableNumber}
// //         </div>
// //       ))}
// //     </div>
// //   );
// // };

// // export default UserDashboard;
// import { useEffect, useState } from "react";
// import API from "../api/api";
// import { useAuth } from "../context/AuthContext";

// const UserDashboard = () => {
//   const { logout } = useAuth();
//   const [reservations, setReservations] = useState([]);
//   const [tables, setTables] = useState([]);
//   const [availableTables, setAvailableTables] = useState([]);
//   const [form, setForm] = useState({
//     date: "",
//     timeSlot: "",
//     guests: "",
//     table: "", // selected table
//   });

//   // Fetch user's reservations
//   const fetchReservations = async () => {
//     const res = await API.get("/api/reservations/my");
//     setReservations(res.data);
//   };

//   // Fetch all tables from backend
//   const fetchTables = async () => {
//     const res = await API.get("/api/tables");
//     setTables(res.data);
//   };

//   // Update available tables whenever date/time/guests changes
//   const updateAvailableTables = async () => {
//     if (!form.date || !form.timeSlot || !form.guests) return;

//     try {
//       // Get reservations for this date and time
//       const res = await API.get(`/api/reservations/available`);
//       setAvailableTables(res.data); // only available tables
//     } catch (err) {
//       console.error(err);
//       setAvailableTables([]);
//     }
//   };

//   const createReservation = async () => {
//     if (!form.table) {
//       alert("Please select a table");
//       return;
//     }

//     try {
//       await API.post("/api/reservations", {
//         date: form.date,
//         timeSlot: form.timeSlot,
//         guests: Number(form.guests),
//         table: form.table,
//       });
//       fetchReservations();
//       alert("Reservation created!");
//     } catch (err) {
//       alert(err.response?.data?.message || "Reservation failed");
//     }
//   };

//   // Effect hooks
//   useEffect(() => {
//     fetchReservations();
//     fetchTables();
//   }, []);

//   useEffect(() => {
//     updateAvailableTables();
//   }, [form.date, form.timeSlot, form.guests]);

//   return (
//     <div className="p-6">
//       <div className="flex justify-between mb-6">
//         <h1 className="text-2xl font-bold">My Reservations</h1>
//         <button onClick={logout} className="text-red-600">Logout</button>
//       </div>

//       <div className="bg-white p-4 rounded shadow mb-6 space-y-2">
//         <input
//           type="date"
//           className="border p-2 w-full"
//           value={form.date}
//           onChange={(e) => setForm({ ...form, date: e.target.value, table: "" })}
//         />

//         <input
//           type="time"
//           className="border p-2 w-full"
//           value={form.timeSlot}
//           onChange={(e) => setForm({ ...form, timeSlot: e.target.value, table: "" })}
//         />

//         <input
//           type="number"
//           min="1"
//           className="border p-2 w-full"
//           placeholder="Guests"
//           value={form.guests}
//           onChange={(e) => setForm({ ...form, guests: e.target.value, table: "" })}
//         />

//         <select
//           className="border p-2 w-full"
//           value={form.table}
//           onChange={(e) => setForm({ ...form, table: e.target.value })}
//         >
//           <option value="">Select Table</option>
//           {availableTables.map((t) => (
//             <option key={t._id} value={t._id}>
//               Table {t.tableNumber} (Seats: {t.capacity})
//             </option>
//           ))}
//         </select>

//         <button
//           onClick={createReservation}
//           className="bg-green-600 text-white px-4 py-2 rounded"
//         >
//           Reserve
//         </button>
//       </div>

//       <h2 className="text-xl font-bold mb-2">Your Reservations</h2>
//       {reservations.map((r) => (
//         <div key={r._id} className="bg-gray-100 p-3 rounded mb-2">
//           {r.date} | {r.timeSlot} | Table {r.table.tableNumber} | Guests: {r.guests}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default UserDashboard;
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import API from '../api/api'

const Userdashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [reservations, setReservations] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [guests, setGuests] = useState('');
  const [availableTables, setAvailableTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

const timeSlots = [
  '12:00 PM - 2:00 PM',
  '2:00 PM - 4:00 PM',
  '4:00 PM - 6:00 PM',
  '6:00 PM - 8:00 PM',
  '8:00 PM - 10:00 PM',
  '10:00 PM - 12:00 AM'
];
// const timeSlots = [ '12:00-14:00', '14:00-16:00', '16:00-18:00', '18:00-20:00', '20:00-22:00', '22:00-00:00' ];

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const res = await API.get('/api/reservations/myres');
      setReservations(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const checkAvailability = async () => {
    if (!date || !timeSlot || !guests) {
      setError('Please fill all fields');
      return;
    }
    
    try {
      const res = await API.get('/api/reservations/available', {
        params: { date, timeSlot, guests }
      });
      setAvailableTables(res.data);
      if (res.data.length === 0) {
        setError('No tables available for this time slot');
      } else {
        setError('');
      }
    } catch (err) {
      setError('Error checking availability');
    }
  };

  const createReservation = async () => {
    if (!selectedTable) {
      setError('Please select a table');
      return;
    }
    
    try {
      await API.post('/api/reservations', {
        tableId: selectedTable,
        date,
        timeSlot,
        guests: parseInt(guests)
      });
      setSuccess('Reservation created successfully!');
      setShowForm(false);
      setDate('');
      setTimeSlot('');
      setGuests('');
      setAvailableTables([]);
      setSelectedTable('');
      fetchReservations();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.msg || 'Error creating reservation');
    }
  };

  const cancelReservation = async (id) => {
    if (window.confirm('Are you sure you want to cancel this reservation?')) {
      try {
        await API.delete(`/api/reservations/${id}`);
        setSuccess('Reservation cancelled');
        fetchReservations();
        setTimeout(() => setSuccess(''), 3000);
      } catch (err) {
        setError('Error cancelling reservation');
      }
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

//   const formatTimeSlot = (slot) => {
//   const [start, end] = slot.split("-");

//   const to12Hour = (time) => {
//     let [hour, minute] = time.split(":");
//     hour = parseInt(hour, 10);

//     const period = hour >= 12 ? "PM" : "AM";
//     hour = hour % 12 || 12;

//     return `${hour}:${minute} ${period}`;
//   };

//   return `${to12Hour(start)} - ${to12Hour(end)}`;
// };


  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Restaurant Reservations</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-700">Welcome, {user?.name}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto p-6">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {success}
          </div>
        )}

        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-green-600 text-white px-6 py-2 rounded mb-6 hover:bg-green-700"
        >
          {showForm ? 'Cancel' : 'New Reservation'}
        </button>

        {showForm && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-bold mb-4">Create Reservation</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 mb-2">Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">Time Slot</label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="">Select time</option>
                  {timeSlots.map(slot => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">Guests</label>
                <input
                  type="number"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  min="1"
                  max="10"
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
            </div>

            <button
              onClick={checkAvailability}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mr-2"
            >
              Check Availability
            </button>

            {availableTables.length > 0 && (
              <div className="mt-4">
                <label className="block text-gray-700 mb-2">Available Tables</label>
                <select
                  value={selectedTable}
                  onChange={(e) => setSelectedTable(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg mb-4"
                >
                  <option value="">Select a table</option>
                  {availableTables.map(table => (
                    <option key={table._id} value={table._id}>
                      Table {table.tableNumber} (Capacity: {table.capacity})
                    </option>
                  ))}
                </select>
                
                <button
                  onClick={createReservation}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Confirm Reservation
                </button>
              </div>
            )}
          </div>
        )}

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">My Reservations</h2>
          
          {reservations.length === 0 ? (
            <p className="text-gray-600">No reservations found</p>
          ) : (
            <div className="space-y-4">
              {reservations.map(reservation => (
                <div
                  key={reservation._id}
                  className={`border p-4 rounded-lg ${
                    reservation.status === 'cancelled' ? 'bg-gray-100' : 'bg-white'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold">
                        Table {reservation.table.tableNumber}
                      </p>
                      <p className="text-gray-600">
                        {new Date(reservation.date).toLocaleDateString()}
                      </p>
                      {/* <p className="text-gray-600">{formatTimeSlot(reservation.timeSlot)}</p> */}
                      <p className="text-gray-600">{reservation.timeSlot}</p>

                      <p className="text-gray-600">{reservation.guests} guests</p>
                      <p className={`mt-2 font-semibold ${
                        reservation.status === 'cancelled' ? 'text-red-700' : 'text-green-700'
                      }`}>
                        {reservation.status.toUpperCase()}
                      </p>
                    </div>
                    
                    {reservation.status === 'active' && (
                      <button
                        onClick={() => cancelReservation(reservation._id)}
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Userdashboard;