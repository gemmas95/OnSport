import React, { useEffect, useState } from 'react';
import centerStore from '../../store/centerStore';
import { loadCenters } from '../../actions/centerActions';
import { NavLink } from 'react-router-dom';
import './centerListComponent.scss';
import LoadingComponent from '../loadingComponent/loadingComponent';

function CentersListComponent(props) {
    const [centers, setCenters] = useState(centerStore.getCenters());

    window.scrollTo(0, 0);

    useEffect(() => {
        centerStore.addChangeListener(onChange);
        loadCenters();
        if (centers.length === 0) {
            loadCenters();
            return () => centerStore.removeChangeListener(onChange);
        } /* else if (sportId) {
            setCenter(centerStore.getCenterById(centerId));
            return () => centerStore.removeChangeListener(onChange);
        } */
    }, [centers.length, props.match.params.sportId]);
    function onChange() {
        setCenters(centerStore.getCenters());
    }
    return (
        <>
            {centers.length <= 0 && <LoadingComponent />}
            {centers.length > 0 && (
                <div className="centerContainer">
                    <div className="bannerContainerDetails">
                        <img
                            src="https://checkyeti.imgix.net/images/optimized/diver-min14.jpg"
                            alt="logo_img"
                        ></img>
                        <h1>Scuba diving</h1>
                    </div>
                    <div>
                        <section className="mainContainer__cards">
                            {centers &&
                                centers.map((center) => {
                                    return (
                                        <NavLink
                                            key={center._id}
                                            to={`/centers/${center._id}`}
                                        >
                                            <div className="center__container">
                                                <img
                                                    src={center.logo}
                                                    alt={`logo_${center.name}`}
                                                    title={center.name}
                                                ></img>
                                                <p>{center.name}</p>
                                            </div>
                                        </NavLink>
                                    );
                                })}
                        </section>
                        <section className="mainContainer__cards"></section>
                    </div>
                </div>
            )}
        </>
    );
}

export default CentersListComponent;
