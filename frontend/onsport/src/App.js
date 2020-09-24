import React from 'react';
import './App.scss';
import PageNotFound from './components/pageNotFound/PageNotFound';
import NavComponent from './components/navComponent/NavComponent';
import CenterDetailsComponent from './components/centerDetailsComponent/CenterDetailsComponent';
import DashboardComponent from './components/dashboardComponent/DashboardComponent';
import activityDetailsComponent from './components/activityDetailsComponent/activityDetailsComponent';
import { Route, Switch } from 'react-router-dom';
import CentersListComponent from './components/centersList/CentersListComponent';
import ProfileComponent from './components/auth/profileComponent/ProfileComponent';
import FooterComponent from './components/footerComponent/FooterComponent';
import FormCreateActivity from './components/formNewActivity/formCreateActivity';

function App() {
    return (
        <div>
            <NavComponent />
            <Switch>
                <Route path="/" exact component={DashboardComponent} />
                <Route
                    path="/:sportId"
                    exact
                    component={CentersListComponent}
                />
                <Route
                    path="/centers/:centerId"
                    exact
                    component={CenterDetailsComponent}
                />
                <Route
                    path="/activities/formactivity/:activityId"
                    component={FormCreateActivity}
                />
                <Route
                    path="/activities/:activityId"
                    exact
                    component={activityDetailsComponent}
                />
                <Route path="/centers" exact component={PageNotFound} />
                <Route
                    path="/auth/profile"
                    exact
                    component={ProfileComponent}
                />
                <Route component={PageNotFound} />
            </Switch>
            <FooterComponent />
        </div>
    );
}

export default App;
