import React, { useEffect, useState } from 'react';
import sportStore from './../../store/sportStore';
import { loadSports } from '../../actions/sportsActions';
import LoadingComponent from './../loadingComponent/loadingComponent';
import { NavLink } from 'react-router-dom';
import './dashboardComponent.scss';

function DashboardComponent(props) {
    const [sports, setSports] = useState(sportStore.getSports());

    window.scrollTo(0, 0);

    useEffect(() => {
        sportStore.addChangeListener(onChange);

        if (sports.length === 0) {
            loadSports();
            return () => sportStore.removeChangeListener(onChange);
        }
    }, sports);
    function onChange() {
        setSports(sportStore.getSports());
    }
    return (
        <>
            {sports.length <= 0 && <LoadingComponent />}
            {sports.length > 0 && (
                <div className="centerContainer">
                    {sports.map((sport) => {
                        return (
                            <NavLink
                                className="bannerContainerDashboard"
                                key={sport._id}
                                to={`/${sport.name}`}
                            >
                                <img src={`${sport.image}`}></img>
                                <h1>{sport.name}</h1>
                            </NavLink>
                        );
                    })}
                </div>
            )}
        </>
    );
}

export default DashboardComponent;
