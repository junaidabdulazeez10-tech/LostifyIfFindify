import MainBar from "../components/mainbar"
import Post from "../components/post"
import Forms from "../components/forms"
import { useParams } from 'react-router-dom'



function ProfilePage({ mode, setMode, posts, token, setToken, id, setId, title, setTitle, category, setCategory, location, setLocation, date, setDate, description, setDescription, image, setImage, condition, setCondition, getPosts, showDescription, setShowDescription }) {
  const { profileName } = useParams()

  return (
    <>
      <div className="container-xl fixed-top position-relative">
        <MainBar mode={mode} setMode={setMode} token={token} setToken={setToken} />
        <div className={`border d-flex flex-column ${mode ? "border-light bg-dark text-light" : "border-dark bg-body-secondary  text-dark"}`}
          style={{ height: 'calc(100vh - 130px)', overflowY: 'scroll'  }}>
          <div className="d-flex flex-wrap justify-content-around mt-4 gap-3 px-3" style={{ fontSize: "clamp(18px, 3vw, 35px)" }}>
            <div className={`${mode ? "border-light bg-dark text-light" : "border-dark bg-body-secondary  text-dark"}`} style={{ borderStyle: "solid", borderRadius: "25px", padding: "10px 20px", textAlign: "center" }}>
              Found Items <span className="d-flex justify-content-center">{posts.filter(post => post.username === profileName).filter(v => v.condition === "Found").length}</span>
            </div>
            <div className={`${mode ? "border-light bg-dark text-light" : "border-dark bg-body-secondary  text-dark"}`} style={{ borderStyle: "solid", borderRadius: "25px", padding: "10px 20px", textAlign: "center" }}>
              Lost Items <span className="d-flex justify-content-center">{posts.filter(post => post.username === profileName).filter(v => v.condition === "Lost").length}</span>
            </div>
          </div>
          <div className={`card ${mode ? "bg-dark text-light" : "bg-body-secondary text-dark"}`} style={{
            fontSize: "35px", border: "none", marginBottom: "-10px"
          }}>User Posts:</div>
          <Post mode={mode} posts={posts.filter(post => post.username === profileName)} id={id} setId={setId}
            title={title}
            setTitle={setTitle} category={category} setCategory={setCategory}
            location={location} setLocation={setLocation} date={date} setDate={setDate}
            description={description} setDescription={setDescription} image={image}
            setImage={setImage} condition={condition} setCondition={setCondition} getPosts={getPosts} 
            showDescription={showDescription} setShowDescription={setShowDescription} />
        </div>
      </div>
      <Forms mode={mode} setToken={setToken} token={token} id={id} setId={setId} title={title}
        setTitle={setTitle} category={category} setCategory={setCategory}
        location={location} setLocation={setLocation} date={date} setDate={setDate}
        description={description} setDescription={setDescription} image={image}
        setImage={setImage} condition={condition} setCondition={setCondition} getPosts={getPosts} />
        <div id="bootstrap-alert" style={{width: "fit-content", position: "fixed", right: "10px", bottom: "0"}}></div>
    </>
  )
}


export default ProfilePage