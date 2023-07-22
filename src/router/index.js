import { createBrowserRouter } from "react-router-dom";
import { CustomProvider } from "../context/userContext.js";
import { CustomProviderClub } from "../context/clubContext.js";
import App from '../App.js'
import LogIn from '../views/loginPage.js'
import Home from "../views/home.js";
import Bg from "../components/bg.js";
import NewAccount from "../views/newAccount.js";
import ForgotPassword from "../views/forgotPassword.js";
import ForgotPasswordRecover from "../views/ForgotPasswordRecover.js";
import UserSettings from "../views/userSettings.js";
import CreateClub from "../views/createClub.js";
import JoinClub from "../views/joinClub.js";
import ClubEvent from "../views/clubEvent.js";
import ClubSettings from "../views/clubSettings.js";
import ClubGrades from "../views/grades.js";
import Chat from "../views/chat.js";
import Schedule from "../views/schedule.js"; 
import Leaderboard from "../views/leaderboard.js";
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
    {
        path: '/joinClub',
        element:
            <CustomProvider>
                <Bg rot={false} />
                <JoinClub />
            </CustomProvider>,

    },
    {
        path: '/club/:id',
        element:
            <CustomProvider>
                <CustomProviderClub>
                    <Bg rot={true} />
                    <ClubEvent />
                </CustomProviderClub>
            </CustomProvider>,

    },
    {
        path: '/settings/:id',
        element:
            <CustomProvider>
                <CustomProviderClub>
                    <Bg rot={true} />
                    <ClubSettings />
                </CustomProviderClub>
            </CustomProvider>,

    },
    {
        path: '/gardes/:id',
        element:
            <CustomProvider>
                <CustomProviderClub>
                    <Bg rot={true} />
                    <ClubGrades />
                </CustomProviderClub>
            </CustomProvider>,

    },
    {
        path: '/chat/:id',
        element:
            <CustomProvider>
                <CustomProviderClub>
                    <Bg rot={true} />
                    <Chat />
                </CustomProviderClub>
            </CustomProvider>,

    },
    {
        path: '/schedule/:id',
        element:
            <CustomProvider>
                <CustomProviderClub>
                    <Bg rot={true} />
                    <Schedule />
                </CustomProviderClub>
            </CustomProvider>,

    },
    {
        path: '/leaderboard/:id',
        element:
            <CustomProvider>
                <CustomProviderClub>
                    <Bg rot={true} />
                    <Leaderboard />
                </CustomProviderClub>
            </CustomProvider>,

    },
])