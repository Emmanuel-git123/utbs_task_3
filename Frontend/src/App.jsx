import "./App.css";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Concerts from "./Pages/Concerts";
import Trains from "./Pages/Trains";
import Movies from "./Pages/Movies";
import Movies_Details from "./Pages/Movies_Details";
import ErrorPage from "./Pages/ErrorPage";
import Register from "./Pages/Register";
import Login from "./Pages/Login"
import Footer from "./Components/Footer";
import Booking from "./Pages/Booking";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Profile from "./Pages/Profile";
import ForgotPass from "./Pages/ForgotPass";
import UpdatePass from "./Pages/UpdatePass";
import ChangePass from "./Pages/ChangePass";
import ProtectedRoute from "./Components/ProtectedRoute";
import ConfirmBooking from "./Pages/ConfirmBooking";
import BookingHistory from "./Pages/BookingHistory";
import Concert_Details from "./Pages/Concert_Details";
import Vendor_Dashboard from "./Pages/Vendor/Vendor_Dashboard";
import Vendor_Movie_Create from "./Pages/Vendor/Vendor_Movie_Create";
import Vendor_Movie_View from "./Pages/Vendor/Vendor_Movie_View";
import Vendor_Movies_Edit from "./Pages/Vendor/Vendor_Movies_Edit";
import Vendor_Concert_Create from "./Pages/Vendor/Vendor_Concert_Create";
import Vendor_Concert_View from "./Pages/Vendor/Vendor_Concert_View";
import Vendor_Concert_Edit from "./Pages/Vendor/Vendor_Concerts_Edit";
import Train_Booking from "./Pages/Train_Booking";
import Vendor_Trains_Create from "./Pages/Vendor/Vendor_Trains_Create";
import Vendor_Trains_View from "./Pages/Vendor/Vendor_Trains_View";
import Vendor_Trains_Edit from "./Pages/Vendor/Vendor_Trains_Edit";
import ConfirmTrain from "./Pages/ConfirmTrain";

function App() {
  return (
    <div className="min-h-screen bg-[#CFFDF8] bg-repeat bg-top">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/movies" element={<ProtectedRoute><Movies /></ProtectedRoute>} />
          <Route path="/concerts" element={<ProtectedRoute><Concerts /></ProtectedRoute>} />
          <Route path="/concerts/:id" element={<ProtectedRoute><Concert_Details /></ProtectedRoute>} />
          <Route path="/trains" element={<ProtectedRoute><Trains /></ProtectedRoute>} />
          <Route path="/trains/booking" element={<ProtectedRoute><Train_Booking/></ProtectedRoute>} />
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/movies/:id" element={<ProtectedRoute><Movies_Details /></ProtectedRoute>}></Route>
          <Route path="/movies/:id/booking" element={<ProtectedRoute><Booking /></ProtectedRoute>}></Route>
          <Route path="/myBookings" element={<ProtectedRoute><BookingHistory /></ProtectedRoute>}></Route>
          <Route path="/movies/:id/confirm" element={<ProtectedRoute><ConfirmBooking /></ProtectedRoute>}></Route>
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/forgotPassword" element={<ForgotPass />}></Route>
          <Route path="/updatePassword" element={<UpdatePass />}></Route>
          <Route path="/vendor/dashboard" element={<ProtectedRoute><Vendor_Dashboard/></ProtectedRoute>}></Route>
          <Route path="/vendor/movies/view" element={<ProtectedRoute><Vendor_Movie_View/></ProtectedRoute>}></Route>
          <Route path="/vendor/concerts/view" element={<ProtectedRoute><Vendor_Concert_View/></ProtectedRoute>}></Route>
          <Route path="/vendor/trains/view" element={<ProtectedRoute><Vendor_Trains_View/></ProtectedRoute>}></Route>
          <Route path="/vendor/movies/create" element={<ProtectedRoute><Vendor_Movie_Create/></ProtectedRoute>}></Route>
          <Route path="/vendor/concerts/create" element={<ProtectedRoute><Vendor_Concert_Create/></ProtectedRoute>}></Route>
          <Route path="/vendor/trains/create" element={<ProtectedRoute><Vendor_Trains_Create/></ProtectedRoute>}></Route>
          <Route path="/vendor/movies/edit/:id" element={<ProtectedRoute><Vendor_Movies_Edit/></ProtectedRoute>}></Route>
          <Route path="/vendor/concerts/edit/:id" element={<ProtectedRoute><Vendor_Concert_Edit/></ProtectedRoute>}></Route>
          <Route path="/vendor/trains/edit/:id" element={<ProtectedRoute><Vendor_Trains_Edit/></ProtectedRoute>}></Route>
          <Route path="/changePassword" element={<ProtectedRoute><ChangePass /></ProtectedRoute>}></Route>
          <Route path="/confirmTrainBooking" element={<ProtectedRoute><ConfirmTrain/></ProtectedRoute>}></Route>
          <Route path="/*" element={<ErrorPage />} />
        </Routes>
        <Footer></Footer>
      </Router>
    </div>
  );
}

export default App;
