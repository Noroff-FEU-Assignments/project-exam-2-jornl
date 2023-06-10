import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Posts from "./pages/Posts/List";
import ShowPost from "./pages/Posts/Show";
import EditPost from "./pages/Posts/Edit";
import CreatePost from "./pages/Posts/Create";
import ShowProfile from "./pages/Profiles/Show";
import Profiles from "./pages/Profiles/List";

import "./scss/main.scss";
import { AuthProvider } from "./contexts/AuthContext";
import Home from "./pages/Home";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/posts/:postId" element={<ShowPost />} />
            <Route path="/posts/:postId/edit" element={<EditPost />} />
            <Route path="/posts/create" element={<CreatePost />} />
            <Route path="/profile" element={<ShowProfile />} />
            <Route path="/profile/:user" element={<ShowProfile />} />
            <Route path="/profiles" element={<Profiles />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
