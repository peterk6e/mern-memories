import React from "react"
import { Container } from "@material-ui/core"
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import { GoogleOAuthProvider } from "@react-oauth/google"
import { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar/Navbar"
import Home from "./components/Home/Home"
import Auth from "./components/Auth/Auth"
import PostDetails from "./components/Posts/PostDetails/PostDetails"

const App = () => {
  const user = JSON.parse(localStorage.getItem("profile"))

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <BrowserRouter>
        <Container maxwidth='xl'>
          <Toaster />
          <Navbar />
          <Routes>
            <Route path='/' element={<Navigate to='/posts' />} />
            <Route path='/posts' element={<Home />} />
            <Route path='/posts/search' element={<Home />} />
            <Route path='/posts/:id' element={<PostDetails />} />
            <Route
              path='/auth'
              element={!user ? <Auth /> : <Navigate to='/posts' replace />}
            />
          </Routes>
        </Container>
      </BrowserRouter>
    </GoogleOAuthProvider>
  )
}

export default App
