import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import { useAppContext } from '../context/appContext';
import { isAnon } from '../utils';

function LogOut() {
    const navigate = useNavigate();
    const { logoutUser, user } = useAppContext();

    console.log(isAnon())
    if (isAnon()) {
        // console.log(navigate);
        navigate('/');
    }

    useEffect(() => {
        async function logoutThisUser() {

            await logoutUser()
        }

        if (user)
            logoutThisUser();
    }, [logoutUser, user])

    return (
        <Loading />
    )
}

export default LogOut