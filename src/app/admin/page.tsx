"use client";

import { useState, useEffect } from "react";

type Booking = {
  id: number;
  date: string;
  name: string;
  email: string;
  phone: string;
  status: string;
};

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      setAuthed(true);
      fetchBookings();
    } else {
      setError("Wrong password");
    }
  };

  const fetchBookings = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/bookings");
    if (res.ok) {
      const data = await res.json();
      setBookings(data.bookings);
    }
    setLoading(false);
  };

  const updateStatus = async (rowIndex: number, status: string) => {
    await fetch("/api/admin/bookings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rowIndex, status }),
    });
    fetchBookings();
  };

  const statusColor = (status: string) => {
    if (status === "confirmed") return "#2d4a3e";
    if (status === "cancelled") return "#c0392b";
    return "#c4704f";
  };

  if (!authed) {
    return (
      <div style={{ minHeight: "100vh", background: "#f5f0e8", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ background: "#fffdf8", borderRadius: "1.5rem", padding: "3rem", width: "100%", maxWidth: "400px", boxShadow: "0 8px 32px rgba(0,0,0,0.08)" }}>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#2d4a3e", marginBottom: "0.5rem" }}>Admin Login</h1>
          <p style={{ color: "#7a6e62", fontSize: "0.9rem", marginBottom: "2rem" }}>PawsomeStay Dashboard</p>
          <form onSubmit={login} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={{ padding: "0.75rem 1rem", borderRadius: "0.75rem", border: "1px solid rgba(122,92,68,0.2)", background: "#f5f0e8", fontSize: "0.95rem", outline: "none" }}
            />
            {error && <p style={{ color: "#c0392b", fontSize: "0.85rem" }}>{error}</p>}
            <button type="submit" style={{ background: "#2d4a3e", color: "#fffdf8", padding: "0.85rem", borderRadius: "100px", fontSize: "0.95rem", fontWeight: 600, border: "none", cursor: "pointer", fontFamily: "inherit" }}>
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f5f0e8", padding: "3rem 4rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2.5rem" }}>
        <div>
          <h1 style={{ fontSize: "2rem", fontWeight: 700, color: "#2d4a3e" }}>PawsomeStay</h1>
          <p style={{ color: "#7a6e62", fontSize: "0.9rem" }}>Bookings Dashboard</p>
        </div>
        <div style={{ display: "flex", gap: "1rem" }}>
          <div style={{ background: "#fffdf8", borderRadius: "1rem", padding: "1rem 1.5rem", textAlign: "center", border: "1px solid rgba(122,92,68,0.1)" }}>
            <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "#2d4a3e" }}>{bookings.length}</div>
            <div style={{ fontSize: "0.72rem", color: "#7a6e62", textTransform: "uppercase", letterSpacing: "0.05em" }}>Total</div>
          </div>
          <div style={{ background: "#fffdf8", borderRadius: "1rem", padding: "1rem 1.5rem", textAlign: "center", border: "1px solid rgba(122,92,68,0.1)" }}>
            <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "#2d4a3e" }}>{bookings.filter(b => b.status === "confirmed").length}</div>
            <div style={{ fontSize: "0.72rem", color: "#7a6e62", textTransform: "uppercase", letterSpacing: "0.05em" }}>Confirmed</div>
          </div>
          <div style={{ background: "#fffdf8", borderRadius: "1rem", padding: "1rem 1.5rem", textAlign: "center", border: "1px solid rgba(122,92,68,0.1)" }}>
            <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "#c4704f" }}>{bookings.filter(b => b.status === "pending").length}</div>
            <div style={{ fontSize: "0.72rem", color: "#7a6e62", textTransform: "uppercase", letterSpacing: "0.05em" }}>Pending</div>
          </div>
        </div>
      </div>

      {loading ? (
        <p style={{ color: "#7a6e62" }}>Loading bookings...</p>
      ) : bookings.length === 0 ? (
        <div style={{ background: "#fffdf8", borderRadius: "1.5rem", padding: "4rem", textAlign: "center", border: "1px solid rgba(122,92,68,0.1)" }}>
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🐾</div>
          <p style={{ color: "#7a6e62" }}>No bookings yet.</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {bookings.map((b) => (
            <div key={b.id} style={{ background: "#fffdf8", borderRadius: "1.25rem", padding: "1.5rem 2rem", border: "1px solid rgba(122,92,68,0.1)", display: "grid", gridTemplateColumns: "1fr 1fr 1fr auto", gap: "1.5rem", alignItems: "center" }}>
              <div>
                <div style={{ fontWeight: 600, color: "#2a2018", marginBottom: "0.2rem" }}>{b.name}</div>
                <div style={{ fontSize: "0.8rem", color: "#7a6e62" }}>{b.email}</div>
                <div style={{ fontSize: "0.8rem", color: "#7a6e62" }}>{b.phone}</div>
              </div>
              <div style={{ fontSize: "0.8rem", color: "#7a6e62" }}>
                {new Date(b.date).toLocaleDateString()}
              </div>
              <div style={{ fontSize: "0.8rem", color: "#7a6e62" }}>
                {b.email}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <div style={{ fontSize: "0.75rem", fontWeight: 600, color: statusColor(b.status), textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.25rem" }}>
                  {b.status}
                </div>
                <select
                  value={b.status}
                  onChange={e => updateStatus(b.id, e.target.value)}
                  style={{ padding: "0.4rem 0.6rem", borderRadius: "0.5rem", border: "1px solid rgba(122,92,68,0.2)", background: "#f5f0e8", fontSize: "0.8rem", cursor: "pointer", fontFamily: "inherit" }}
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}