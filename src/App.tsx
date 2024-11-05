import { BrowserRouter, Route, Routes } from "react-router-dom";

import { SignIn } from "@pages/auth/SignIn/SignIn.tsx";
import { Profile } from "@pages/profile/Profile/Profile.tsx";

export const App = () => (
  <BrowserRouter basename="/">
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  </BrowserRouter>
);
