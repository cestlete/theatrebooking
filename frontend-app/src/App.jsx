import React from "react"
import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import MovieDetail from "./pages/MovieDetail"
import Header from "./pages/Header"
import Booking from "./pages/Booking"
import BookingConfirmation from "./pages/BookingConfirmation"
import "./App.css"

export default function App() {
  return (

    <>
      <Header />
      <div className="page-body">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/booking/:id" element={<Booking />} />
          <Route path="/booking-confirmation" element={<BookingConfirmation />} />
        </Routes>
      </div>
    </>
  )
}
