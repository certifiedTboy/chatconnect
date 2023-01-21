import React, { Suspense } from "react"
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";
import RegForm from "../Auth/RegForm";
import LoginForm from "../Auth/Login";
import { useSelector } from "react-redux";
const HomePage = React.lazy(() => import("../../pages/HomePage.js"));
const Rooms = React.lazy(() => import("../../pages/Rooms.js"));
const ChatPage = React.lazy(() => import("../../pages/ChatPage.js"));
const ProfileUpload = React.lazy(() => import("../../pages/ProfileUpload.js"));
const UserProfilePage = React.lazy(() => import("../../pages/UserProfilePage.js"));
const NotFoundPage = React.lazy(() => import("../Errors/NotFoundPage.js"));


const AppRoutes = () => {
    const { user } = useSelector((state) => state.login);
    return (
        <Routes>
            <Route
                path="*"
                element={
                    <Suspense fallback={<div></div>}>
                        {" "}
                        <NotFoundPage />{" "}
                    </Suspense>
                }
            />
            <Route
                path="/"
                element={<Navigate to="/login" replace={true} />}
                exact
            />
            <Route path="/" element={
                <Suspense fallback={<div></div>}>
                    <HomePage />
                </Suspense>
            }>
                <Route path="register" element={<RegForm />} />
                <Route path="login" element={<LoginForm />} />
            </Route>

            <Route
                path={`/rooms`}
                element={
                    <Suspense fallback={<div></div>}>
                        <ProtectedRoutes user={user}>
                            <Rooms />
                        </ProtectedRoutes>
                    </Suspense>
                }
            />
            <Route
                path="/rooms/:topic"
                element={
                    <Suspense fallback={<div></div>}>
                        <ProtectedRoutes user={user}>
                            <ChatPage />
                        </ProtectedRoutes>
                    </Suspense>
                }
            />
            <Route
                path={"/profile-picture"}
                element={
                    <Suspense fallback={<div></div>}>
                        <ProtectedRoutes user={user}>
                            <ProfileUpload />
                        </ProtectedRoutes>
                    </Suspense>
                }
            />
            <Route
                path={"/user/userprofile/:username"}
                element={
                    <Suspense fallback={<div></div>}>
                        <ProtectedRoutes user={user}>
                            <UserProfilePage />
                        </ProtectedRoutes>
                    </Suspense>
                }
            />
        </Routes>
    );
}

export default AppRoutes;
