import Link from 'next/link'
import React from 'react'

const signout = () => {
    return (<div className='grid h-screen place-items-center'>
        <div className='mx-auto my-2  justify-items-center'>Thanks for Coming
            <br />
            Hope to see you soon
            <br />
            <Link href="/auth/login">Click here to login again</Link>
        </div>
    </div>
    )
}

export default signout