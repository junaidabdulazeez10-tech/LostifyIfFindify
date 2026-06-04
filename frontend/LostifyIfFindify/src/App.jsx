import MainPage from './pages/mainPage'
import ProfilePage from './pages/profilepage'
import CommentPage from './pages/commentPage'
import CategoryPage from './pages/categoryPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'


function App() {
  const [mode, setMode] = useState(true)
  const [posts, setPosts] = useState([])
  const [token, setToken] = useState("")
  const [id, setId] = useState('')
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [location, setLocation] = useState('')
  const [date, setDate] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const [condition, setCondition] = useState('')
  const [commentId, setCommentId] = useState('')
  const[showDescription, setShowDescription] = useState(false)

  async function getPosts() {
    const response = await axios.get("http://localhost:5000/posts")
    setPosts(response.data.posts)
  }

  useEffect(() => {
    getPosts();
    setToken(localStorage.getItem("token") || "")
  }, [])

  useEffect(() => {
    document.body.style.backgroundColor = mode ? "#1a1d20" : "#616060fa";
  }, [mode]);


  return (
    <>
    {/* basename="/LostifyIfFindifyFrontend-/" if i want to use it to GitHub Pages */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage posts={posts} getPosts={getPosts} mode={mode}
            setMode={setMode} setToken={setToken} token={token} id={id}
            setId={setId} title={title} setTitle={setTitle} category={category}
            setCategory={setCategory} location={location} setLocation={setLocation}
            date={date} setDate={setDate} description={description}
            setDescription={setDescription} image={image} setImage={setImage}
            condition={condition} setCondition={setCondition} showDescription={showDescription} 
            setShowDescription={setShowDescription} />} />

          <Route path="/profile/:profileName" element={<ProfilePage posts={posts} getPosts={getPosts} mode={mode}
            setMode={setMode} setToken={setToken} token={token} id={id} setId={setId} title={title}
            setTitle={setTitle} category={category} setCategory={setCategory}
            location={location} setLocation={setLocation} date={date} setDate={setDate}
            description={description} setDescription={setDescription} image={image}
            setImage={setImage} condition={condition} setCondition={setCondition} 
            showDescription={showDescription} setShowDescription={setShowDescription} />} />

          <Route path="/comment/:postId" element={<CommentPage posts={posts} getPosts={getPosts} mode={mode}
            setMode={setMode} setToken={setToken} token={token} id={id} setId={setId} title={title}
            setTitle={setTitle} category={category} setCategory={setCategory}
            location={location} setLocation={setLocation} date={date} setDate={setDate}
            description={description} setDescription={setDescription} image={image}
            setImage={setImage} condition={condition} setCondition={setCondition}
            commentId={commentId} setCommentId={setCommentId} showDescription={showDescription} 
            setShowDescription={setShowDescription} />} />

          <Route path="/category/:categoryName" element={<CategoryPage posts={posts} mode={mode}
            setMode={setMode} setToken={setToken} token={token} id={id} setId={setId} title={title}
            setTitle={setTitle} category={category} setCategory={setCategory}
            location={location} setLocation={setLocation} date={date} setDate={setDate}
            description={description} setDescription={setDescription} image={image}
            setImage={setImage} condition={condition} setCondition={setCondition} 
            showDescription={showDescription} setShowDescription={setShowDescription} />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}


export default App
