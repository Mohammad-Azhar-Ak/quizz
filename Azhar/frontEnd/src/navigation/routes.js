import Home from "../screens/home";
import SignIn from "../screens/signIn";
import SignUp from "../screens/signUp";
import QuizPage from "../screens/quizPage";
import Profile from "../screens/profile";

export const privateRoutes = [
    {
        path: "/home",
        component: Home
    },
    {
        path: "/quizpage",
        component: QuizPage
    },
    {
        path: "/profile",
        component: Profile
    }
];

export const publicRoutes = [
    {
        path: "/",
        component: SignIn
    },
    {
        path:"/signup",
        component: SignUp
    },
  
]