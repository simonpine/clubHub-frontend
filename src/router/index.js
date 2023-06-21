import { createBrowserRouter } from "react-router-dom";
import App from '../App.js'
import LogIn from '../views/loginPage.js'
import Home from "../views/home.js";
import Bg from "../components/bg.js";
import NewAccount from "../views/newAccount.js";
import { CustomProvider } from "../context/userContext.js";
import ForgotPassword from "../views/forgotPassword.js";
import ForgotPasswordRecover from "../views/ForgotPasswordRecover.js";
import UserSettings from "../views/userSettings.js";
import CreateClub from "../views/createClub.js";
export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,

    },
    {
        path: '/login',
        element:
            <CustomProvider>
                <Bg />
                <LogIn />
            </CustomProvider>,

    },
    {
        path: '/newAccount',
        element:
            <CustomProvider>
                <Bg rot={true} />
                <NewAccount />
            </CustomProvider>,

    },
    {
        path: '/forgotPassword',
        element:
            <CustomProvider>
                <Bg rot={true} />
                <ForgotPassword />
            </CustomProvider>,

    },
    {
        path: '/forgotPassword/:id',
        element:
            <CustomProvider>
                <Bg rot={true} />
                <ForgotPasswordRecover />
            </CustomProvider>,

    },
    {
        path: '/home',
        element:
            <CustomProvider>
                <Bg rot={true} />
                <Home />
            </CustomProvider>,

    },
    {
        path: '/userSettings',
        element:
            <CustomProvider>
                <Bg rot={true} />
                <UserSettings />
            </CustomProvider>,

    },
    {
        path: '/createClub',
        element:
            <CustomProvider>
                <Bg rot={false} />
                <CreateClub />
            </CustomProvider>,

    },

])