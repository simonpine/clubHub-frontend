import { createBrowserRouter } from "react-router-dom";
import App from '../App.js'
import LogIn from '../views/loginPage.js'
import Home from "../views/home.js";
import Bg from "../components/bg.js";
import { CustomProvider } from "../context/userContext.js";
import { ContextUser } from "../context/userContext.js";
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
        path: '/home',
        element:
            <CustomProvider>
                <Home />
            </CustomProvider>,

    },

])