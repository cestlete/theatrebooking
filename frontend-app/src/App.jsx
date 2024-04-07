import React from "react"
import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import MovieDetail from "./pages/MovieDetail"
import Header from "./pages/Header"
import "./App.css"

export default function App() {
  return (

    <>
      <Header />
      <div className="page-body">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
        </Routes>
      </div>
    </>
  )
}
