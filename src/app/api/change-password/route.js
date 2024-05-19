// // pages/api/change-password.js

// import { getSession } from 'next-auth/react';
// import { hash } from 'bcryptjs';
// // import { connect } from '../../util/mysql'; // Adjust this import based on your MySQL connection setup
// import { query } from '@/lib/db';

// export default async function handler(req, res) {
//     if (req.method !== 'put') {
//         return res.status(405).json({ message: 'Method Not Allowed' });
//     }

//     const session = await getSession({ req });

//     if (!session) {
//         return res.status(401).json({ message: 'Unauthorized' });
//     }

//     const { email, newPassword } = req.body;

//     if (!email || !newPassword) {
//         return res.status(400).json({ message: 'Email and new password are required' });
//     }

//     //   const connection = await connect(); // Establish MySQL connection

//     try {
//         const hashedPassword = await hash(newPassword, 10);

//         // Update the user's password in the MySQL database
//         const updateQuery = `
//       UPDATE users
//       SET password = ?
//       WHERE email = ?
//     `;
//         await query(updateQuery, [hashedPassword, email]);

//         return res.status(200).json({ message: 'Password updated successfully' });
//     } catch (error) {
//         console.error('Error updating password:', error);
//         return res.status(500).json({ message: 'Internal Server Error' });
//     }
// }
// email,newPassword, session_id
import { query } from "@/lib/db";
import { getSession } from 'next-auth/react';
import { hash } from 'bcryptjs';
import { getServerSession } from "next-auth";


export async function PUT(request) {
    const session = await getServerSession();
    if (!session) {
        // return res.status(401).json({ message: 'Unauthorized' });
        console.log(session)
        return new Response(JSON.stringify({
            message: 'Unauthorized',
            status: 401,

        }));
    }

    try {
        const { email, newPassword } = await request.json();
        if (!email || !newPassword) {
            // return res.status(400).json({ message: 'Email and new password are required' });
            return new Response(JSON.stringify({
                message: 'Email and new password are required',
                status: 400,
            }));
        }
        const hashedPassword = await hash(newPassword, 3);
        console.log("hashedPassword", hashedPassword, "email", email, "newPassword", newPassword)
        const updatePassword = await query({
            query: "UPDATE authentication SET password=?  WHERE email = ?",
            values: [hashedPassword, email],
        });
        const result = updatePassword.affectedRows;
        let message = "";
        if (result) {
            message = "success";
        } else {
            message = "error";
        }
        const product = {
            email: email,
        };
        return new Response(JSON.stringify({
            message: message,
            status: 200,
            product: product
        }));
    } catch (error) {
        return new Response(JSON.stringify({
            status: 500,
            error: error.message,
            data: res
        }));
    }

}