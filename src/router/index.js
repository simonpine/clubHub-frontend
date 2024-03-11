import { createBrowserRouter } from "react-router-dom";
import { ContextUser, CustomProvider } from "../context/userContext.js";
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
import Surveys from "../views/surveys.js";
import Leaderboard from "../views/leaderboard.js";
import AddFriends from "../views/addFriends.js"
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
        path: '/addFriends',
        element:
            <CustomProvider>
                <Bg rot={false} />
                <AddFriends />
            </CustomProvider>,

    },
    {
        path: '/club/:id',
        element:
            <CustomProvider>
                <ContextUser.Consumer>
                    {({ user }) =>
                        user !== null && <CustomProviderClub userName={user.userName}>
                            {/* <Bg rot={true} /> */}
                            <ClubEvent />
                        </CustomProviderClub>
                    }
                </ContextUser.Consumer>
            </CustomProvider>,

    },
    {
        path: '/settings/:id',
        element:
            <CustomProvider>
                <ContextUser.Consumer>
                    {({ user }) =>
                        user !== null && <CustomProviderClub userName={user.userName}>
                            {/* <Bg rot={true} /> */}
                            <ClubSettings />
                        </CustomProviderClub>
                    }
                </ContextUser.Consumer>
            </CustomProvider>,

    },
    {
        path: '/gardes/:id',
        element:
            <CustomProvider>
                <ContextUser.Consumer>
                    {({ user }) =>
                        user !== null && <CustomProviderClub userName={user.userName}>
                            {/* <Bg rot={true} /> */}
                            <ClubGrades />
                        </CustomProviderClub>
                    }
                </ContextUser.Consumer>
            </CustomProvider>,

    },
    {
        path: '/chat/:id',
        element:
            <CustomProvider>
                <ContextUser.Consumer>
                    {({ user }) =>
                        user !== null && <CustomProviderClub userName={user.userName}>
                            {/* <Bg rot={true} /> */}
                            <Chat />
                        </CustomProviderClub>
                    }
                </ContextUser.Consumer>
            </CustomProvider>,

    },
    {
        path: '/schedule/:id',
        element:
            <CustomProvider>
                <ContextUser.Consumer>
                    {({ user }) =>
                        user !== null && <CustomProviderClub userName={user.userName}>
                            {/* <Bg rot={true} /> */}
                            <Schedule />
                        </CustomProviderClub>
                    }
                </ContextUser.Consumer>
            </CustomProvider>,

    },
    {
        path: '/leaderboard/:id',
        element:
            <CustomProvider>
                <ContextUser.Consumer>
                    {({ user }) =>
                        user !== null && <CustomProviderClub userName={user.userName}>
                            {/* <Bg rot={true} /> */}
                            <Leaderboard />
                        </CustomProviderClub>
                    }
                </ContextUser.Consumer>
            </CustomProvider>,

    },
    {
        path: '/surveys/:id',
        element:
            <CustomProvider>
                <ContextUser.Consumer>
                    {({ user }) =>
                        user !== null && <CustomProviderClub userName={user.userName}>
                            {/* <Bg rot={true} /> */}
                            <Surveys />
                        </CustomProviderClub>
                    }
                </ContextUser.Consumer>
            </CustomProvider>,

    },
])