
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'


export default function ModalAll({ onClose, token, products }) {

    const [allUsers, setAllUsers] = useState([]);


    useEffect(() => {
        async function getAllUsers() {
            try {
                const response = await fetch(`https://odev-l26v.onrender.com/users`, {
                    headers: {
                        "Content-Type": "application/json",
                    }
                })
                const data = await response.json();
                console.log(data)
                setAllUsers(data)
            } catch (error) {

            }

        }
        getAllUsers()
    }, [token])

    console.log(allUsers)

    return (
        <div className='all-users'>
            <div className='all-users-header'>
                <button className='singeprod-button' onClick={onClose}>Go Back</button>
            </div>
            {allUsers && allUsers.map((user) => {
                return (<div className="all-users-view" key={user.id}>
                    <p className='all-users-title'>Account Information</p>
                    <br></br>
                    <div className='all-users-details'>
                        <p><b>First Name:</b> {user.first_name}</p>
                        <p><b>Last Name:</b> {user.last_name}</p>
                        <p><b>Email Address:</b> {user.email}</p>
                        <p><b>Phone Number:</b> {user.phone_number}</p>
                    </div>
                </div>
                )
            })
            }
        </div>
    )


}