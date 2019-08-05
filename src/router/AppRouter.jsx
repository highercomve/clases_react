import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import List from "../components/List/List";
import Login from "../components/Login/Login";
import {
    FullPageLayout,
    NoMenuLayout,
} from "../components/layouts/Layouts";

function AppRouter() {
    return (
        <Router>
            <Route path="/mantenedor/" component={FullPageLayout(List)} />
            <Route path="/login" component={NoMenuLayout(Login)} />
        </Router>
    );
}
export default AppRouter;