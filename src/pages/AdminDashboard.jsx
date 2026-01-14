// import { useEffect, useState } from "react";
// import API from "../api/api";
// import { useAuth } from "../context/AuthContext";

// const AdminDashboard = () => {
//   const { logout } = useAuth();
//   const [reservations, setReservations] = useState([]);

//   useEffect(() => {
//     API.get("/api/reservations").then((res) => setReservations(res.data));
//   }, []);

//   return (
//     <div className="p-6">
//       <div className="flex justify-between mb-6">
//         <h1 className="text-2xl font-bold">Admin Dashboard</h1>
//         <button onClick={logout} className="text-red-600">
//           Logout
//         </button>
//       </div>

//       {reservations.map((r) => (
//         <div key={r._id} className="bg-gray-100 p-3 rounded mb-2">
//           {r.user.name} | {r.date} | {r.timeSlot} | Table{" "}
//           {r.table.tableNumber}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default AdminDashboard;


import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import API from '../api/api'

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [reservations, setReservations] = useState([]);
  const [filterDate, setFilterDate] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAllReservations();
  }, []);

  const fetchAllReservations = async () => {
    try {
      const res = await API.get(
        "/api/admin/reservations"
      );
      setReservations(res.data);
    } catch (err) {
      setError("Error fetching reservations");
    }
  };

  const fetchByDate = async () => {
    if (!filterDate) {
      fetchAllReservations();
      return;
    }

    try {
      const res = await API.get(
        `/api/admin/reservations/date/${filterDate}`
      );
      setReservations(res.data);
    } catch (err) {
      setError("Error fetching reservations");
    }
  };

  const cancelReservation = async (id) => {
    if (window.confirm("Cancel this reservation?")) {
      try {
        await API.delete(
          `/api/admin/reservations/${id}`
        );
        setSuccess("Reservation cancelled");
        fetchAllReservations();
        setTimeout(() => setSuccess(""), 3000);
      } catch (err) {
        setError("Error cancelling reservation");
      }
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-green-600 shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-white">Admin: {user?.name}</span>
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

        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-bold mb-4">Filter Reservations</h2>
          <div className="flex gap-4">
            <input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="px-3 py-2 border rounded-lg"
            />
            <button
              onClick={fetchByDate}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Filter by Date
            </button>
            <button
              onClick={() => {
                setFilterDate("");
                fetchAllReservations();
              }}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Show All
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">
            All Reservations ({reservations.length})
          </h2>

          {reservations.length === 0 ? (
            <p className="text-gray-600">No reservations found</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Customer</th>
                    <th className="text-left p-2">Email</th>
                    <th className="text-left p-2">Table</th>
                    <th className="text-left p-2">Date</th>
                    <th className="text-left p-2">Time</th>
                    <th className="text-left p-2">Guests</th>
                    <th className="text-left p-2">Status</th>
                    <th className="text-left p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {reservations.map((reservation) => (
                    <tr
                      key={reservation._id}
                      className="border-b hover:bg-gray-50"
                    >
                      <td className="p-2">{reservation.user?.name || 'N/A'}</td>
                      <td className="p-2">{reservation.user?.email || 'N/A'}</td>
                      <td className="p-2">
                        Table {reservation.table?.tableNumber || 'N/A'}
                      </td>
                      <td className="p-2">
                        {new Date(reservation.date).toLocaleDateString()}
                      </td>
                      <td className="p-2">{reservation.timeSlot}</td>
                      <td className="p-2">{reservation.guests}</td>
                      <td className="p-2">
                        <span
                          className={`px-2 py-1 rounded text-sm ${
                            reservation.status === "active"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {reservation.status}
                        </span>
                      </td>
                      <td className="p-2">
                        {reservation.status === "active" && (
                          <button
                            onClick={() => cancelReservation(reservation._id)}
                            className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                          >
                            Cancel
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
