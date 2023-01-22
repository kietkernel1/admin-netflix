import { useLoaderData } from "react-router-dom"
import "../scss/movieDetail.scss"

const MovieDetail = () => {
  const data = useLoaderData()
  const { title, description, img, imgSm, imgTitle, limit, trailer, video, year, createdAt, genre, briefDes, updatedAt } = data
  return (
        <div className="movieDetail-container">
          <h1 className='movieDetail-info'>Movie Detail</h1>
          <div className="movieDetail-content">

            <div className="movieDetail-left">

              <h1 className='movieDetail-title'>{title}</h1>
                  <div className="movieDetail-item">
                    <span>Description: </span>
                    <span>{description}</span>
                  </div>

                  <div className="movieDetail-item">
                    <span>Brief Description: </span>
                    <span>{briefDes}</span>
                  </div>

                  <div className="movieDetail-item">
                    <span>Year: </span>
                    <span>{year}</span>
                  </div>

                  <div className="movieDetail-item">
                    <span>Limit: </span>
                    <span>{limit}</span>
                  </div>

                  <div className="movieDetail-item">
                    <span>Genre: </span>
                    <span>{genre}</span>
                  </div>

                  <div className="movieDetail-item">
                    <span>Date created: </span>
                    <span>{createdAt.split("T")[0]}</span>
                  </div>

                  <div className="movieDetail-item">
                    <span>Date latest update: </span>
                    <span>{updatedAt.split("T")[0]}</span>
                  </div>

                <div className="movieDetail-img">
                  <img src= {img} alt="" />
                  <h2 >Background Image</h2>
                </div>

                <div className="movieDetail-img">
                  <img src= {imgTitle} alt="" />
                  <h2 >Title Image</h2>
                </div>

                <div className="movieDetail-img">
                  <img src= {imgSm} alt="" />
                  <h2>Poster Image</h2>
                </div>

            </div>  

            <div className="movieDetail-right">

                <div className="movieDetail-item">
                  <h1>Trailer: </h1>
                  <video src= {trailer} controls></video>
                </div>

                <div className="movieDetail-item">
                  <h1>Video: </h1>
                  <video src= {video} controls></video>
                </div>
            </div>
          </div>
        </div>
  )
}

export default MovieDetail