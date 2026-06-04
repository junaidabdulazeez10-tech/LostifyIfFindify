import { Link } from 'react-router-dom'

function Comments({ mode, comments, setCommentId }) {

  return (
    <>
      {comments.map((value) => (
        <div key={value._id} className=' border card-body fs-5'>
          <div className={`border mt-2 mb-2 p-3 ${mode ? "border-light text-light" : "border-dark text-dark"}`}>
            <div className='d-flex'>
              <Link style={{ textDecoration: "none" }} to={`/profile/${value.user}`}>
                <img className={`user-img-comment border border-2 ${mode ? "border-light" : "border-dark"}`}
                  style={{ objectFit: "cover", height: "50px", width: "50px", borderRadius: "25px" }} src={value.profilePicture} />
              </Link>
              <div className='d-flex flex-column '>
                <Link style={{ textDecoration: "none" }} to={`/profile/${value.user}`}>
                  <div className={`${mode ? "text-light" : "text-dark"}`} style={{ fontSize: "17px" }}>@{value.user}</div>
                </Link>
                <div style={{ fontSize: "16px", marginLeft: "3px", width: "100%", wordBreak: "break-word" }}>{value.text}</div>
              </div>
              {localStorage.getItem("username") === value.user && <div style={{marginLeft: "auto"}}>
                <button className="btn btn-warning p-1" type='button' data-bs-toggle="modal" data-bs-target="#edit-comment-form" onClick={() => { setCommentId(value._id) }} >edit</button>
              </div>}
            </div>
          </div>
        </div>
      ))}
    </>
  )
}
export default Comments