
import React from "react";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FrontendLayouts from "./Frontend/components/Layouts";
import Home from "./Frontend/pages/Home";
import About from "./Frontend/pages/About";
import Contact from "./Frontend/pages/Contact";
import PageNotFound from "./Frontend/pages/PageNotFound";

import LoginRouter from "./Frontend/components/auth/LoginRouter";
import ForgotPassword from "./Frontend/components/auth/ForgotPassword";
import ForgotPasswordLink from "./Frontend/components/auth/ForgotPasswordLink";
import ImpExpRegister from "./Frontend/components/auth/ImpExpRegister";
import ResetPassword from "./Frontend/components/auth/ResetPassword";

{
    /* Admin, imp-exp, icmr, committee dashboard*/
}
import BackendLayout from "./Backend/components/Layouts";
import Dashboard from "./Backend/admins/Dashboard";
import ChangePassword from "./Frontend/components/auth/ChangePassword";
import Users from "./Backend/components/admin/Users";
import AddUser from "./Backend/components/admin/AddUser";
import EditUser from "./Backend/components/admin/EditUser";
import Roles from "./Backend/components/admin/Roles";
import AddRole from "./Backend/components/admin/AddRole";
import EditRole from "./Backend/components/admin/EditRole";
import HomeSliders from "./Backend/components/admin/home_banner/HomeSliders";
import AddHomeSlider from "./Backend/components/admin/home_banner/AddHomeSlider";
import EditHomeSlider from "./Backend/components/admin/home_banner/EditHomeSlider";
import ProtectedRoute from "./Frontend/components/auth/ProtectedRoute";
import GeneratePassword from "./Frontend/components/auth/GeneratePassword";
import GeneratePasswordLinkMessage from "./Frontend/components/auth/GeneratePasswordLinkMessage";
import ApplyNocRequest from "./Backend/components/imp_exp/exporters/ApplyNocRequest";
import AppliCationList from "./Backend/components/imp_exp/exporters/AppliCationList";
import HsCodes from "./Backend/components/admin/hs_code/HsCodes";
import AddNewHsCode from "./Backend/components/admin/hs_code/AddNewHsCode";
import EditHsCode from "./Backend/components/admin/hs_code/EditHsCode";
import NaturalBiomaterials from "./Backend/components/admin/natural_biomaterials/NaturalBiomaterials";
import AddNaturalBiomaterial from "./Backend/components/admin/natural_biomaterials/AddNaturalBiomaterial";
import EditNaturalBiomaterial from "./Backend/components/admin/natural_biomaterials/EditNaturalBiomaterial";
import Volumes from "./Backend/components/admin/quantityof_volume/Volumes";
import AddVolume from "./Backend/components/admin/quantityof_volume/AddVolume";
import EditVolume from "./Backend/components/admin/quantityof_volume/EditVolume";
import SamplesCollected from "./Backend/components/admin/sampes_collected/SamplesCollected";
import AddSampeCollected from "./Backend/components/admin/sampes_collected/AddSampeCollected";
import EditSampleCollected from "./Backend/components/admin/sampes_collected/EditSampleCollected";

function App({ role }) {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<FrontendLayouts />}>
                        <Route index element={<Home />} />
                        <Route exact path="/about-us" element={<About />} />
                        <Route exact path="/contact-us" element={<Contact />} />
                        <Route exact path="/beneficiary/register" element={<ImpExpRegister />} />
                        <Route exact path="/beneficiary/login" element={<LoginRouter />}/>
                        <Route exact path="/forgot-password" element={<ForgotPassword />}/>
                        <Route exact path="/forgot-password-link" element={<ForgotPasswordLink />}/>
                        <Route exact path="/reset-password" element={<ResetPassword />} />
                        <Route exact path="/generate-password/:id" element={<GeneratePassword />}/>
                        <Route exact path="/generate-password-link-message/" element={<GeneratePasswordLinkMessage/>}/> 
                      
                    </Route>
                    
                    <Route path="/:role" element={<BackendLayout />}>
                        <Route path="dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                        <Route path="users" element={<Users />} />
                        <Route path="user/add_new" element={<AddUser />} />
                        <Route path="user/edit/:id" element={<EditUser />} />
                        <Route path="roles" element={<Roles />} />
                        <Route path="role/add_new" element={<AddRole />} />
                        <Route path="role/edit/:id" element={<EditRole />} />

                        <Route path="sliders" element={<HomeSliders />} />
                        <Route path="slider/add_new" element={<AddHomeSlider />} />
                        <Route path="slider/edit/:id" element={<EditHomeSlider />} />

                        <Route path="hs_codes" element={<HsCodes/>} />
                        <Route path="hs_code/add_new" element={<AddNewHsCode/>} />
                        <Route path="hs_code/edit/:id" element={<EditHsCode />} />

                        <Route path="natural_biomaterials" element={<NaturalBiomaterials/>} />
                        <Route path="natural_biomaterial/add_new" element={<AddNaturalBiomaterial/>} />
                        <Route path="natural_biomaterial/edit/:id" element={<EditNaturalBiomaterial />} />


                        <Route path="volumes" element={<Volumes/>} />
                        <Route path="volume/add_new" element={<AddVolume/>} />
                        <Route path="volume/edit/:id" element={<EditVolume />} />

                        <Route path="where_samples_collected" element={<SamplesCollected/>} />
                        <Route path="where_sample_collected/add_new" element={<AddSampeCollected/>} />
                        <Route path="where_sample_collected/edit/:id" element={<EditSampleCollected />} />

                        <Route path="exporter/apply-noc-application" element={<ApplyNocRequest/>}/>
                        <Route path="exporter/applications" element={<AppliCationList/>}/>

                        <Route path="change-password" element={<ChangePassword />}/>
                    </Route>

                    <Route exact path="*" element={<PageNotFound />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

// const root = ReactDOM.createRoot(document.getElementById("thbm"));
// root.render(<App />);
ReactDOM.createRoot(document.getElementById("thbm")).render(<App />);






// import React from "react";
// import ReactDOM from "react-dom/client";
// import { BrowserRouter, Routes, Route } from "react-router-dom";

// import Login from "./components/Login";
// import DashboardAdmin from "./components/DashboardAdmin";
// import DashboardICMR from "./components/DashboardICMR";
// import DashboardCommittee from "./components/DashboardCommittee";
// import ProtectedRoute from "./ProtectedRoute";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Login />} />

//         <Route
//           path="/admin/dashboard"
//           element={
//             <ProtectedRoute role="admin">
//               <DashboardAdmin />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/icmr/dashboard"
//           element={
//             <ProtectedRoute role="icmr">
//               <DashboardICMR />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/committee/dashboard"
//           element={
//             <ProtectedRoute role="committee">
//               <DashboardCommittee />
//             </ProtectedRoute>
//           }
//         />
//       </Routes>
//     </BrowserRouter>
//   );
// }
// ReactDOM.createRoot(document.getElementById("thbm")).render(<App />);

