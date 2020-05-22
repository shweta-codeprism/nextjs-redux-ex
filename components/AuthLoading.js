import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";

/** Other Components */
import Loader from "./Loader";

/** firebase */
// import { fetchCarTypes } from "../actions/cartypeactions";
// import { fetchBookings } from "../actions/bookingactions";
// import { fetchPromos } from "../actions/promoactions";
// import { fetchDriver } from "../actions/driverearningaction";
// import { fetchUsers } from "../actions/usersactions";
// import { fetchBonus } from "../actions/referralactions";
// import { fetchNotifications } from "../actions/notificationactions";
// import { fetchEarningreports } from "../actions/earningreportsaction"

function AuthLoading(props) {
    const dispatch = useDispatch();
    const Auth = useSelector(state => state.Auth);
    useEffect(() => {
        if (Auth.info) {
            dispatch(fetchUsers());
            // dispatch(fetchBookings());
            // dispatch(fetchCarTypes());
            // dispatch(fetchPromos());
            // dispatch(fetchDriver());
            // dispatch(fetchBonus());
            // dispatch(fetchNotifications());
            // dispatch(fetchEarningreports())
        }

    }, [Auth.info, dispatch]);

    return (
        Auth.loggedIn ?  props.children : <div></div>
    )
}

export default AuthLoading;