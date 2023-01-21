import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../../pages/HomePage";
import RegForm from "../Auth/RegForm";
import LoginForm from "../Auth/Login";
import Rooms from "../../pages/Rooms";
import ChatPage from "../../pages/ChatPage";
import ProfileUpload from "../../pages/ProfileUpload";
import UserProfilePage from "../../pages/UserProfilePage";
import ProtectedRoutes from "./ProtectedRoutes";
import { useSelector } from "react-redux";


const AppRoutes = () => {
    const { user } = useSelector((state) => state.login);
    return (
        <Routes>
            <Route
                path="/"
                element={<Navigate to="/login" replace={true} />}
                exact
            />
            <Route path="/" element={<HomePage />}>
                <Route path="register" element={<RegForm />} />
                <Route path="login" element={<LoginForm />} />
            </Route>

            <Route
                path={`/rooms`}
                element={
                    <ProtectedRoutes user={user}>
                        <Rooms />
                    </ProtectedRoutes>
                }
            />
            <Route
                path="/rooms/:topic"
                element={
                    <ProtectedRoutes user={user}>
                        <ChatPage />
                    </ProtectedRoutes>
                }
            />
            <Route
                path={"/profile-picture"}
                element={
                    <ProtectedRoutes user={user}>
                        <ProfileUpload />
                    </ProtectedRoutes>
                }
            />
            <Route
                path={"/user/userprofile/:username"}
                element={
                    <ProtectedRoutes user={user}>
                        <UserProfilePage />
                    </ProtectedRoutes>
                }
            />
        </Routes>
    );
}

export default AppRoutes;
