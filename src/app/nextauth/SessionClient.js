"use client"
import { useSession, getSession } from "next-auth/react"
import { useEffect, useState } from "react";
const SessionClient = () => {
    const [sessionValue, setSessionValue] = useState({});
    const { data: session, status } = useSession();
    useEffect(() => {
        const getSessionInfo = async () => {
            const session = await getSession();
            setSessionValue(session);
        }
        getSessionInfo();
    },
        [session]);
    return (
        <div><h3>Client side Component for next auth</h3>
            {JSON.stringify(session)}<br />
            {JSON.stringify(sessionValue)}


        </div>
    )
}

export default SessionClient