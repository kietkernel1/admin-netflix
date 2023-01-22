
import { useLoaderData } from "react-router-dom"
import "../scss/userDetail.scss"

const UserDetail = () => {
  const data = useLoaderData()
  const { username, email, avatar, numberPhone, address ,country, createdAt} = data
  return (
        <div className="userDetail-container">
            <div className='userDetail-editButton'>Edit</div>
            <div className="userDetail-left">

              <h1 className='userDetail-info'>Information</h1>
              
              <div className="userDetail-img">
                <img src= {avatar} alt="" />
              </div>
            </div>
          

            <div className="userDetail-right">
                <div className="userDetail-items">
                  <h1 className='userDetail-title'>{username}</h1>
                  <div className="userDetail-item">
                    <span>Email: </span>
                    <span>{email}</span>
                  </div>

                  <div className="userDetail-item">
                    <span className='userDetail-item-phone'>Phone: </span>
                    <span>{numberPhone}</span>
                  </div>

                  <div className="userDetail-item">
                    <span className='userDetail-item-address'>Address: </span>
                    <span>{address}</span>
                  </div>

                  <div className="userDetail-item">
                    <span className='userDetail-item-country'>Country: </span>
                    <span>{country}</span>
                  </div>

                  <div className="userDetail-item">
                    <span className='userDetail-item-creatAt'>Date created: </span>
                    <span>{createdAt.split("T")[0]}</span>
                  </div>
                </div>

            </div>
          </div>
  )
}

export default UserDetail