import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Todo from '../components/Todo/Todo';
import TopNews from '../components/TopNews/TopNews';
import MouseFollower from "../components/MouseFollower/MouseFollower";
import MouseFollowerFunctional from "../components/MouseFollower/MouseFollowerFunctional";


function AppRouter() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Tareas</Link>
            </li>
             <li>
              <Link to="/noticias/">TopNews</Link>
            </li>
            <li>
              <Link to="/mouse/">Mouse Follower</Link>
            </li>
            <li>
              <Link to="/mouse2/">Mouse Follower Funcional</Link>
            </li>
          </ul>
        </nav>

        <Route path="/" exact component={Todo} />
        <Route path="/noticias/" component={TopNews} />
        <Route path="/mouse/" component={MouseFollower} />
        <Route path="/mouse2/" component={MouseFollowerFunctional} />
      </div>
    </Router>
  );
}

export default AppRouter;