"use server"

import { getServerSession } from "next-auth"

const SessionServer = async () => {
    const session = await getServerSession();
    return (
        <div>
            <h3>
                Server Component next auth session
                {JSON.stringify(session)}
            </h3>
        </div>
    )
}

export default SessionServer