import {
    createBrowserRouter,
} from "react-router-dom";
import MoviePage from "./components/MoviePage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MoviePage />,
    },
]);

export default router;