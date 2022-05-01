import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

// import { Dialog, Transition } from '@headlessui/react'
import {
  CalendarIcon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  PlusCircleIcon,
  EyeIcon,
} from '@heroicons/react/outline'
import { useForm } from "react-hook-form";

import { AdminPrivateRoute, PrivateRoute, renderComponent, useAppContext } from './context/appContext';
import { isAdmin } from "./utils";
import './backgroudEffect.css';

import Navigation from "./components/Navigation";
import SideBar from "./components/adminDashboard/SideBar";
import Footer from "./components/Footer";
import Home from './pages/Home';
import LogOut from "./pages/LogOut";
import NoPage from "./pages/NoPage";
import Journey from './pages/Journey';
import ContactUs from './pages/ContactUs';
import Authentication from "./pages/Authentication";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CreatBlogPost from "./pages/admin/CreatBlogPost";
import CreateBlogCategory from "./pages/admin/CreateBlogCategory";
import EditBlogCategory from "./pages/admin/EditBlogCategory";
import ViewBlogPost from "./pages/admin/ViewBlogPost";
import EditBlogPost from "./pages/admin/EditBlogPost";
import UserViewPost from "./pages/UserViewPost";


const navigation = [
  { name: 'Dashboard', href: '/admin-dashboard', icon: HomeIcon, },
  { name: 'Add Blog-Category', href: '/create-blog-category', icon: PlusCircleIcon, },
  { name: 'View Blog-Category', href: '/view-blog-category', icon: EyeIcon, },
  { name: 'Blog', href: '#', icon: FolderIcon, },
  { name: 'Calendar', href: '#', icon: CalendarIcon, },
  { name: 'Documents', href: '#', icon: InboxIcon, },
  { name: 'Reports', href: '#', icon: ChartBarIcon, },
]

const subNavs = [
  { name: 'Create Blog-Post', href: '/create-blog-post', icon: PlusCircleIcon },
  { name: 'View Blog-Post', href: '/view-blog-post', icon: EyeIcon },
]


function App() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      query: '',
    }
  });
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [subNavOpen, setSubNavOpen] = useState(false)
  const { user } = useAppContext();

  const adminLogin = user ? isAdmin(user["user_type"]) : false;

  // console.log(adminLogin, 'Line 75');


  return (
    <Router>

      <Navigation user={user} />
      <div>
        <ul className="background">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      {adminLogin &&
        (<SideBar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          subNavOpen={subNavOpen}
          setSubNavOpen={setSubNavOpen}
          control={control}
          navigation={navigation}
          subNavs={subNavs}
        />)
      }
      <Routes>
        <Route path="/" element={renderComponent(Home)} />
        <Route path="/register" element={renderComponent(Authentication, { type: 'create' })} />
        <Route path="/login" element={renderComponent(Authentication)} />
        <Route path="/journey" element={<PrivateRoute>{renderComponent(Journey)}</PrivateRoute>} />
        <Route path="/journey/*" element={<PrivateRoute>{renderComponent(Journey)}</PrivateRoute>} />
        <Route path="/journey/:id/:slug" element={<PrivateRoute>{renderComponent(UserViewPost)}</PrivateRoute>} />
        <Route path="/admin-dashboard" element={<AdminPrivateRoute>{renderComponent(AdminDashboard)}</AdminPrivateRoute>} />
        <Route path="/create-blog-post" element={<AdminPrivateRoute>{renderComponent(CreatBlogPost)}</AdminPrivateRoute>} />
        <Route path="/view-blog-post" element={<AdminPrivateRoute>{renderComponent(ViewBlogPost)}</AdminPrivateRoute>} />
        <Route path="/edit-blog-post/:id/:slug" element={<AdminPrivateRoute>{renderComponent(EditBlogPost)}</AdminPrivateRoute>} />
        <Route path="/create-blog-category" element={<AdminPrivateRoute>{renderComponent(CreateBlogCategory)}</AdminPrivateRoute>} />
        <Route path="/edit-blog-category/:id/:name" element={<AdminPrivateRoute>{renderComponent(EditBlogCategory)}</AdminPrivateRoute>} />
        <Route path="/view-blog-category" element={<AdminPrivateRoute>{renderComponent(CreateBlogCategory)}</AdminPrivateRoute>} />
        <Route path="/contact-us" element={renderComponent(ContactUs)} />
        <Route path="/logout" element={renderComponent(LogOut)} />
        <Route path="*" element={renderComponent(NoPage)} />
        {/* <Route path="/journey/*" element={renderComponent(NoPage)} /> */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
