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
    <div className="min-h-screen bg-gray-300">
  
  {/* Navbar */}
  <nav className="bg-green-600/90 backdrop-blur-md shadow-md">
    <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-extrabold text-white tracking-wide">
        Admin Dashboard
      </h1>

      <div className="flex items-center gap-4">
        <span className="text-white text-sm">
          Welcome, <span className="font-semibold">{user?.name}</span>
        </span>
        <button
          onClick={handleLogout}
          className="bg-red-500 px-4 py-2 rounded-lg text-white text-sm font-medium hover:bg-red-600 active:scale-95 transition"
        >
          Logout
        </button>
      </div>
    </div>
  </nav>

  {/* Content */}
  <div className="max-w-7xl mx-auto px-6 py-8">

    {/* Alerts */}
    {error && (
      <div className="mb-6 rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-red-700 text-sm">
        {error}
      </div>
    )}

    {success && (
      <div className="mb-6 rounded-lg border border-green-300 bg-green-50 px-4 py-3 text-green-700 text-sm">
        {success}
      </div>
    )}

    {/* Filter Card */}
    <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
      <h2 className="text-lg font-bold text-gray-800 mb-4">
        Filter Reservations
      </h2>

      <div className="flex flex-wrap gap-4 items-center">
        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg "
        />

        <button
          onClick={fetchByDate}
          className="bg-green-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-gray-700 transition"
        >
          Filter
        </button>

        <button
          onClick={() => {
            setFilterDate("");
            fetchAllReservations();
          }}
          className="bg-gray-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-gray-700 transition"
        >
          Show All
        </button>
      </div>
    </div>

    {/* Reservations Table */}
    <div className="bg-white rounded-2xl shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-gray-800">
          All Reservations
        </h2>
        <span className="text-sm text-gray-500">
          Total: {reservations.length}
        </span>
      </div>

      {reservations.length === 0 ? (
        <p className="text-gray-600 text-sm">No reservations found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100 sticky top-0">
              <tr>
                {[
                  "Customer",
                  "Email",
                  "Table",
                  "Date",
                  "Time",
                  "Guests",
                  "Status",
                  "Actions",
                ].map((head) => (
                  <th
                    key={head}
                    className="text-left text-sm font-semibold text-gray-700 px-3 py-3"
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {reservations.map((reservation, index) => (
                <tr
                  key={reservation._id}
                  className={`border-b text-sm ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-gray-300 transition`}
                >
                  <td className="px-3 py-2 font-medium">
                    {reservation.user?.name || "N/A"}
                  </td>
                  <td className="px-3 py-2 text-gray-600">
                    {reservation.user?.email || "N/A"}
                  </td>
                  <td className="px-3 py-2">
                    Table {reservation.table?.tableNumber || "N/A"}
                  </td>
                  <td className="px-3 py-2">
                    {new Date(reservation.date).toLocaleDateString()}
                  </td>
                  <td className="px-3 py-2">{reservation.timeSlot}</td>
                  <td className="px-3 py-2">{reservation.guests}</td>
                  <td className="px-3 py-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        reservation.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {reservation.status}
                    </span>
                  </td>
                  <td className="px-3 py-2">
                    {reservation.status === "active" && (
                      <button
                        onClick={() =>
                          cancelReservation(reservation._id)
                        }
                        className="bg-red-500 text-white px-3 py-1 rounded-lg text-xs hover:bg-red-600 transition"
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
