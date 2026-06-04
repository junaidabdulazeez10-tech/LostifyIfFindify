import MainBar from '../components/mainbar';
import SearchBar from '../components/searchbar';
import Post from '../components/post';
import Forms from '../components/forms'
import AddPost from '../components/addPostBtn';
import './mainPage.css'


function MainPage({ mode, setMode, posts, token, setToken, id, setId, title, setTitle, category, setCategory, location, setLocation, date, setDate, description, setDescription, image, setImage, condition, setCondition, getPosts, showDescription, setShowDescription }) {


  return (
    <>
      <div className="container-xl fixed-top position-relative">
        <MainBar mode={mode} setMode={setMode} token={token} setToken={setToken} />
        <SearchBar mode={mode} />

        {/* main content */}
        <div className={`border d-flex flex-column ${mode ? "border-light bg-dark text-light" : "border-dark bg-body-secondary text-dark"}`}
          style={{ height: 'calc(100vh - 184px)', overflowY: 'scroll'}}>
          <Post mode={mode} posts={posts} id={id} setId={setId} title={title}
            setTitle={setTitle} category={category} setCategory={setCategory}
            location={location} setLocation={setLocation} date={date} setDate={setDate}
            description={description} setDescription={setDescription} image={image}
            setImage={setImage} condition={condition} setCondition={setCondition} getPosts={getPosts} 
            showDescription={showDescription} setShowDescription={setShowDescription} />
        </div>
        {/* main content end */}

        <AddPost mode={mode} token={token} setToken={setToken} setCategory={setCategory}
          setTitle={setTitle} setLocation={setLocation} setDate={setDate}
          setDescription={setDescription} setImage={setImage} setCondition={setCondition} />
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

export default MainPage