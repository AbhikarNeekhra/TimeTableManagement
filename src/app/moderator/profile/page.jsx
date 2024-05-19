"use client"

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import axios from "axios"

const ModeratorProfile = () => {
    const { data: session } = useSession();
    const email = session?.user?.email;
    const [moderatorInfo, setModeratorInfo] = useState(null);

    const fetchModeratorInfo = async () => {
        await axios
            .get("/api/database/faculty")
            .then((response) => {
                setModeratorInfo(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        fetchModeratorInfo();
    }, []);

    const moderator = moderatorInfo?.find((moderator) => moderator.faculty_email === email);

    return (
        <div className="container mx-auto p-4">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="text-xl font-semibold mb-4">Profile</div>
                <div className="mb-4">
                    <div className="flex items-center mb-2">
                        <strong className="mr-2">Name:</strong> {moderator?.faculty_name}
                    </div>
                    <div className="flex items-center mb-2">
                        <strong className="mr-2">Email:</strong> {moderator?.faculty_email}
                    </div>
                    <div className="flex items-center mb-2">
                        <strong className="mr-2">Department:</strong> {moderator?.department_id}
                    </div>
                    <div className="flex items-center">
                        <strong className="mr-2">Designation:</strong> {moderator?.designation}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModeratorProfile;
