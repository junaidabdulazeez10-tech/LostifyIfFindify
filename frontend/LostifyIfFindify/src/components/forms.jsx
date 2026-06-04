import axios from "axios"
import { useState, useRef } from "react"
import alertBootstrap from "../utils/utils"
import "./forms.css"

function Forms({ mode, setToken, token, id, title, setTitle, category, setCategory, location, setLocation, date, setDate, description, setDescription, image, setImage, condition, setCondition, commentId, postId, getPosts }) {
  const [username, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [profilePicture, setProfilePicture] = useState('')
  const [editedText, setEditedText] = useState('')


  // Errors handling for Log-in
  const [emailErrorLogin, setEmailErrorLogin] = useState('')
  const [passwordErrorLogin, setPasswordErrorLogin] = useState('')
  const [generalErrorLogin, setGeneralErrorLogin] = useState('')

  // Errors handling for sign-up
  const [usernameErrorSignUp, setUsernameErrorSignUp] = useState('')
  const [emailErrorSignUp, setEmailErrorSignUp] = useState('')
  const [passwordErrorSignUp, setPasswordErrorSignUp] = useState('')
  const [generalErrorSignUp, setGeneralErrorSignUp] = useState('')
  const [pictureErrorSignUp, setPictureErrorSignUp] = useState('')

  // Errors handling for adding a post
  const [conditionErrorAddPost, setConditionErrorAddPost] = useState('')
  const [titleErrorAddPost, setTitleErrorAddPost] = useState('')
  const [categoryErrorAddPost, setCategoryErrorAddPost] = useState('')
  const [locationErrorAddPost, setLocationErrorAddPost] = useState('')
  const [dateErrorAddPost, setDateErrorAddPost] = useState('')
  const [descriptionErrorAddPost, setDescriptionErrorAddPost] = useState('')
  const [imageErrorAddPost, setImageErrorAddPost] = useState('')
  const [generalErrorAddPost, setGeneralErrorAddPost] = useState('')

  // Errors handling for editing a post
  const [conditionErrorEditPost, setConditionErrorEditPost] = useState('')
  const [titleErrorEditPost, setTitleErrorEditPost] = useState('')
  const [categoryErrorEditPost, setCategoryErrorEditPost] = useState('')
  const [locationErrorEditPost, setLocationErrorEditPost] = useState('')
  const [dateErrorEditPost, setDateErrorEditPost] = useState('')
  const [descriptionErrorEditPost, setDescriptionErrorEditPost] = useState('')
  const [imageErrorEditPost, setImageErrorEditPost] = useState('')
  const [generalErrorEditPost, setGeneralErrorEditPost] = useState('')

   // Errors handling for editing a comment
  const [textErrorEditComment, setTextErrorEditComment] = useState('')
  const [generalErrorEditComment, setGeneralErrorEditComment] = useState('')


  const closeSignUpModal = useRef(null)
  const closeLogInModal = useRef(null)
  const closeCreatePostModal = useRef(null)
  const closeEditPostModal = useRef(null)
  const deletePostModal = useRef(null)
  const editCommentModal = useRef(null)


  async function signingUp() {
    try {
      const formDataSP = new FormData();
      formDataSP.append("username", username)
      formDataSP.append("email", email)
      formDataSP.append("password", password)
      formDataSP.append("profilePicture", profilePicture)
      const response = await axios.post("http://localhost:5000/signup", formDataSP);
      alertBootstrap(response.data.message, 'success')
      closeSignUpModal.current.click()
      localStorage.setItem("token", response.data.token)
      localStorage.setItem("username", response.data.username)
      localStorage.setItem("profilePicture", response.data.profilePicture)
      setToken(localStorage.getItem("token"))
    } catch (error) {
      const errors = error.response?.data?.errors || []
      setGeneralErrorSignUp(error.response?.data?.message || "")
      setUsernameErrorSignUp(errors.filter((v) => v.path === "username").map((v) => v.msg).join("\n"))
      setEmailErrorSignUp(errors.filter((v) => v.path === "email").map((v) => v.msg).join("\n"))
      setPasswordErrorSignUp(errors.filter((v) => v.path === "password").map((v) => v.msg).join("\n"))
      setPictureErrorSignUp(error.response?.data?.errors.filter((v) => v.path === "image").map((v) => v.msg).join("\n"))
    }
  }

  async function loggingIn() {
    try {
      const bodyForLogIn = { email, password }
      const response = await axios.post("http://localhost:5000/login", bodyForLogIn)
      alertBootstrap(response.data.message, 'success')
      closeLogInModal.current.click()
      localStorage.setItem("token", response.data.token)
      localStorage.setItem("username", response.data.username)
      localStorage.setItem("profilePicture", response.data.profilePicture)
      setToken(localStorage.getItem("token"))
      setEmail('')
      setPassword('')
    } catch (error) {
      const errors = error.response?.data?.errors || []
      setGeneralErrorLogin(error.response?.data?.message || "")
      setEmailErrorLogin(errors.filter((v) => v.path === "email").map((v) => v.msg).join("\n"))
      setPasswordErrorLogin(errors.filter((v) => v.path === "password").map((v) => v.msg).join("\n"))
    }
  }

  async function loggingOut() {
    localStorage.removeItem("token")
    localStorage.removeItem("username")
    localStorage.removeItem("profilePicture")
    alertBootstrap("Logged out successfully", 'danger')
    setToken("")
  }

  async function addPost() {
    try {
      const formData = new FormData();
      formData.append("username", localStorage.getItem("username"))
      formData.append("profilePicture", localStorage.getItem("profilePicture"))
      formData.append("condition", condition)
      formData.append("title", title)
      formData.append("category", category)
      formData.append("location", location)
      formData.append("date", date)
      formData.append("description", description)
      formData.append("image", image)
      const response = await axios.post("http://localhost:5000/post", formData, {
        headers:
        {
          authorization: `Bearer ${token}`
        }
      })
      setCategory('')
      setCondition('')
      setDate('')
      setImage('')
      setTitle('')
      setLocation('')
      setDescription('')
      alertBootstrap(response.data.message, 'success')
      closeCreatePostModal.current.click()
      getPosts()
      console.log(response.data)
    } catch (error) {
      const errors = error.response?.data?.errors || []
      setGeneralErrorAddPost(error.response?.data?.message || "")
      setConditionErrorAddPost(errors.filter((v) => v.path === "condition").map((v) => v.msg).join("\n"))
      setTitleErrorAddPost(errors.filter((v) => v.path === "title").map((v) => v.msg).join("\n"))
      setCategoryErrorAddPost(errors.filter((v) => v.path === "category").map((v) => v.msg).join("\n"))
      setLocationErrorAddPost(errors.filter((v) => v.path === "location").map((v) => v.msg).join("\n"))
      setDateErrorAddPost(errors.filter((v) => v.path === "date").map((v) => v.msg).join("\n"))
      setDescriptionErrorAddPost(errors.filter((v) => v.path === "description").map((v) => v.msg).join("\n"))
      setImageErrorAddPost(error.response?.data?.errors.filter((v) => v.path === "image").map((v) => v.msg).join("\n"))
    }
  }

  async function editPost() {
    try {
      const editFormData = new FormData();
      editFormData.append("username", localStorage.getItem("username"))
      editFormData.append("profilePicture", localStorage.getItem("profilePicture"))
      if (condition) editFormData.append("condition", condition);
      if (title) editFormData.append("title", title);
      if (category) editFormData.append("category", category);
      if (location) editFormData.append("location", location);
      if (date) editFormData.append("date", date);
      if (description) editFormData.append("description", description);
      if (image) editFormData.append("image", image);
      const response = await axios.patch(`http://localhost:5000/post/${id}`, editFormData, {
        headers:
        {
          authorization: `Bearer ${token}`
        }
      })
      closeEditPostModal.current.click()
      alertBootstrap(response.data.message, 'warning')
      getPosts()
      console.log(response.data)
    } catch (error) {
      const errors = error.response?.data?.errors || []
      setGeneralErrorEditPost(error.response?.data?.message || "")
      setConditionErrorEditPost(errors.filter((v) => v.path === "condition").map((v) => v.msg).join("\n"))
      setTitleErrorEditPost(errors.filter((v) => v.path === "title").map((v) => v.msg).join("\n"))
      setCategoryErrorEditPost(errors.filter((v) => v.path === "category").map((v) => v.msg).join("\n"))
      setLocationErrorEditPost(errors.filter((v) => v.path === "location").map((v) => v.msg).join("\n"))
      setDateErrorEditPost(errors.filter((v) => v.path === "date").map((v) => v.msg).join("\n"))
      setDescriptionErrorEditPost(errors.filter((v) => v.path === "description").map((v) => v.msg).join("\n"))
      setImageErrorEditPost(error.response?.data?.errors.filter((v) => v.path === "image").map((v) => v.msg).join("\n"))
    }
  }

  async function deletePost() {
    try {
      const response = await axios.delete(`http://localhost:5000/post/${id}`, {
        headers:
        {
          authorization: `Bearer ${token}`
        }
      })
      console.log(response.data)
      alertBootstrap(response.data.message, 'danger')
      getPosts()
    } catch (error) {
      console.log(error.response?.data || error)
    }

  }

  async function editComment() {
    try {
      const bodyForComment = {
        user: localStorage.getItem("username"),
        text: editedText,
        profilePicture: localStorage.getItem("profilePicture")
      }
      const response = await axios.patch(`http://localhost:5000/post/${postId}/comment/${commentId}`, bodyForComment, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log(response.data)
      setEditedText('')
      editCommentModal.current.click()
      alertBootstrap(response.data.message, 'warning')
      getPosts()
    } catch (error) {
      const errors = error.response?.data?.errors || []
      setGeneralErrorEditComment(error.response?.data?.message || "")
      setTextErrorEditComment(errors.filter((v) => v.path === "text").map((v) => v.msg).join("\n"))
    }
  }

  return (
    <>
      {/* sign up Form */}
      <div className="modal fade" id="sign-up-form" tabIndex="-1" aria-labelledby="signupModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className={`modal-content ${mode ? "bg-dark text-light" : "light-form text-dark"}`}>
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="signupModalLabel">Sign-up Form</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label className="col-form-label">User-Name</label>
                  <input type="text" autoComplete="username" className="form-control" value={username} onChange={(e) => setUserName(e.target.value)} />
                  <div className="text-danger" style={{ whiteSpace: "pre-line" }} >{usernameErrorSignUp}</div>
                </div>
                <div className="mb-3">
                  <label className="col-form-label">E-mail:</label>
                  <input type="email" autoComplete="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                  <div className="text-danger" style={{ whiteSpace: "pre-line" }} >{emailErrorSignUp}</div>
                </div>
                <div className="mb-3">
                  <label className="col-form-label">Password</label>
                  <input type="password" autoComplete="current-password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                  <div className="text-danger" style={{ whiteSpace: "pre-line" }} >{passwordErrorSignUp}</div>
                </div>
                <div className="mb-3">
                  <label className="col-form-label">Upload Profile Picture</label>
                  <input type="file" className="form-control" accept="image/*" onChange={(e) => setProfilePicture(e.target.files[0])} />
                  <div className="text-danger" style={{ whiteSpace: "pre-line" }} >{pictureErrorSignUp}</div>
                  <div className="text-danger" style={{ whiteSpace: "pre-line" }} >{generalErrorSignUp}</div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-outline-danger" data-bs-dismiss="modal" ref={closeSignUpModal}>Close</button>
              <button type="button" className="btn btn-outline-success" onClick={signingUp}>Sign up</button>
            </div>
          </div>
        </div>
      </div>

      {/* log out Form */}
      <div className="modal fade" id="log-out-form" tabIndex="-1" aria-labelledby="logoutModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className={`modal-content ${mode ? "bg-dark text-light" : "light-form text-dark"}`}>
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="logoutModalLabel">Log-out Form</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div>Do you really want to Log out?</div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-outline-success" data-bs-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-outline-danger" data-bs-dismiss="modal" onClick={loggingOut}>Log out</button>
            </div>
          </div>
        </div>
      </div>

      {/* log in Form */}
      <div className="modal fade" id="log-in-form" tabIndex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className={`modal-content ${mode ? "bg-dark text-light" : "light-form text-dark"}`}>
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="loginModalLabel">Log-in Form</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label className="col-form-label">E-mail:</label>
                  <input type="email" autoComplete="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                  <div className="text-danger" style={{ whiteSpace: "pre-line" }} >{emailErrorLogin}</div>
                </div>
                <div className="mb-3">
                  <label className="col-form-label">Password</label>
                  <input type="password" autoComplete="current-password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                  <div className="text-danger" style={{ whiteSpace: "pre-line" }}>{passwordErrorLogin}</div>
                  <div className="text-danger" style={{ textAlign: "center" }}>{generalErrorLogin}</div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-outline-danger" data-bs-dismiss="modal" ref={closeLogInModal}>Close</button>
              <button type="button" className="btn btn-outline-success" onClick={loggingIn}>Log in</button>
            </div>
          </div>
        </div>
      </div>

      {/* add post Form */}
      <div className="modal fade" id="add-post-form" tabIndex="-1" aria-labelledby="addPostModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className={`modal-content ${mode ? "bg-dark text-light" : "light-form text-dark"}`}>
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="addPostModalLabel">Add Post</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3 d-flex justify-content-center gap-3">
                  <button type="button" className={`btn ${mode ? "btn-outline-light" : "btn-outline-dark"}`} onClick={() => { setCondition('Lost') }}>Lost</button>
                  <button type="button" className={`btn ${mode ? "btn-outline-light" : "btn-outline-dark"}`} onClick={() => { setCondition('Found') }}>Found</button>
                  <div className="text-danger" style={{ whiteSpace: "pre-line" }} >{conditionErrorAddPost}</div>
                </div>
                <div className="mb-3">
                  <label className="col-form-label">Title</label>
                  <input type="text" autoComplete="off" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
                  <div className="text-danger" style={{ whiteSpace: "pre-line" }} >{titleErrorAddPost}</div>
                </div>
                <div className="mb-3">
                  <label className="col-form-label">Category</label>
                  <input type="text" autoComplete="off" className="form-control" value={category} onChange={(e) => setCategory(e.target.value)} />
                  <div className="text-danger" style={{ whiteSpace: "pre-line" }} >{categoryErrorAddPost}</div>
                </div>
                <div className="mb-3">
                  <label className="col-form-label">Location</label>
                  <input type="text" autoComplete="off" className="form-control" value={location} onChange={(e) => setLocation(e.target.value)} />
                  <div className="text-danger" style={{ whiteSpace: "pre-line" }} >{locationErrorAddPost}</div>
                </div>
                <div className="mb-3">
                  <label className="col-form-label">Date</label>
                  <input type="date" className="form-control" value={date} onChange={(e) => setDate(e.target.value)} />
                  <div className="text-danger" style={{ whiteSpace: "pre-line" }} >{dateErrorAddPost}</div>
                </div>
                <div className="mb-3">
                  <label className="col-form-label">Description</label>
                  <textarea className="form-control" rows="3" value={description} onChange={(e) => setDescription(e.target.value)} />
                  <div className="text-danger" style={{ whiteSpace: "pre-line" }} >{descriptionErrorAddPost}</div>
                </div>
                <div className="mb-3">
                  <label className="col-form-label">Upload Image</label>
                  <input type="file" className="form-control" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
                  <div className="text-danger" style={{ whiteSpace: "pre-line" }} >{imageErrorAddPost}</div>
                  <div className="text-danger" style={{ whiteSpace: "pre-line" }} >{generalErrorAddPost}</div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-outline-danger" data-bs-dismiss="modal" ref={closeCreatePostModal}>Close</button>
              <button type="button" className="btn btn-outline-success" onClick={addPost}>Add Post</button>
            </div>
          </div>
        </div>
      </div>

      {/* edit post Form */}
      <div className="modal fade" id="edit-post-form" tabIndex="-1" aria-labelledby="editPostModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className={`modal-content ${mode ? "bg-dark text-light" : "light-form text-dark"}`}>
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="addPostModalLabel">Edit Post</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3 d-flex justify-content-center gap-3">
                  <button type="button" className={`btn ${mode ? "btn-outline-light" : "btn-outline-dark"}`} onClick={() => { setCondition('Lost') }}>Lost</button>
                  <button type="button" className={`btn ${mode ? "btn-outline-light" : "btn-outline-dark"}`} onClick={() => { setCondition('Found') }}>Found</button>
                  <div className="text-danger" style={{ whiteSpace: "pre-line" }} >{conditionErrorEditPost}</div>
                </div>
                <div className="mb-3">
                  <label className="col-form-label">Title</label>
                  <input type="text" autoComplete="off" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
                  <div className="text-danger" style={{ whiteSpace: "pre-line" }} >{titleErrorEditPost}</div>
                </div>
                <div className="mb-3">
                  <label className="col-form-label">Category</label>
                  <input type="text" autoComplete="off" className="form-control" value={category} onChange={(e) => setCategory(e.target.value)} />
                  <div className="text-danger" style={{ whiteSpace: "pre-line" }} >{categoryErrorEditPost}</div>
                </div>
                <div className="mb-3">
                  <label className="col-form-label">Location</label>
                  <input type="text" autoComplete="off" className="form-control" value={location} onChange={(e) => setLocation(e.target.value)} />
                  <div className="text-danger" style={{ whiteSpace: "pre-line" }} >{locationErrorEditPost}</div>
                </div>
                <div className="mb-3">
                  <label className="col-form-label">Date</label>
                  <input type="date" className="form-control" value={date} onChange={(e) => setDate(e.target.value)} />
                  <div className="text-danger" style={{ whiteSpace: "pre-line" }} >{dateErrorEditPost}</div>
                </div>
                <div className="mb-3">
                  <label className="col-form-label">Description</label>
                  <textarea className="form-control" rows="3" value={description} onChange={(e) => setDescription(e.target.value)} />
                  <div className="text-danger" style={{ whiteSpace: "pre-line" }} >{descriptionErrorEditPost}</div>
                </div>
                <div className="mb-3">
                  <label className="col-form-label">Upload Image</label>
                  <input type="file" className="form-control" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
                  <div className="text-danger" style={{ whiteSpace: "pre-line" }} >{imageErrorEditPost}</div>
                  <div className="text-danger" style={{ whiteSpace: "pre-line" }} >{generalErrorEditPost}</div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-outline-danger" data-bs-dismiss="modal" ref={closeEditPostModal}>Close</button>
              <button type="button" className="btn btn-outline-success" onClick={editPost}>Edit Post</button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Post Form */}
      <div className="modal fade" id="Delete-post-form" tabIndex="-1" aria-labelledby="DeleteModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className={`modal-content ${mode ? "bg-dark text-light" : "light-form text-dark"}`}>
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="logoutModalLabel">Delete Form</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div>Do you really want to delete this Post?!</div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-outline-success" data-bs-dismiss="modal" ref={deletePostModal}>Cancel</button>
              <button type="button" className="btn btn-outline-danger" data-bs-dismiss="modal" onClick={deletePost}>Delete</button>
            </div>
          </div>
        </div>
      </div>

      {/* edit comment Form */}
      <div className="modal fade" id="edit-comment-form" tabIndex="-1" aria-labelledby="EditModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-sm">
          <div className={`modal-content ${mode ? "bg-dark text-light" : "light-form text-dark"}`}>
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="logoutModalLabel">Edit Comment Form</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <textarea className={`modal-content ${mode ? "bg-dark text-light" : "light-form text-dark"}`}
                placeholder="Enter Your New Text: " type="text" style={{ width: "100%" }} value={editedText} onChange={(e) => { setEditedText(e.target.value) }}>
              </textarea>
              <div className="text-danger" style={{ whiteSpace: "pre-line" }} >{textErrorEditComment}</div>
              <div className="text-danger" style={{ whiteSpace: "pre-line" }} >{generalErrorEditComment}</div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-outline-danger" data-bs-dismiss="modal" ref={editCommentModal}>Cancel</button>
              <button type="button" className="btn btn-outline-success" onClick={editComment}>Edit</button>
            </div>
          </div>
        </div>
      </div>


    </>
  )
}
export default Forms