import MainBar from '../components/mainbar';
import SearchBar from '../components/searchbar';
import Post from '../components/post';
import { useParams } from 'react-router-dom'


function CategoryPage({ mode, setMode, posts, token, setToken, id, setId, title, setTitle, category, setCategory, location, setLocation, date, setDate, description, setDescription, image, setImage, condition, setCondition, showDescription, setShowDescription }) {

  const { categoryName } = useParams()
  const categorizedPosts = posts.filter((v) => String(v.category).trim().toLowerCase() === String(categoryName).trim().toLowerCase());

  return (
    <>
      <div className="container-xl fixed-top position-relative">
        <MainBar mode={mode} setMode={setMode} token={token} setToken={setToken} />
        <SearchBar mode={mode} />

        {/* main content */}
        <div className={`border d-flex flex-column ${mode ? "border-light bg-dark text-light" : "border-dark bg-body-secondary text-dark"}`}
          style={{ height: 'calc(100vh - 185px)', overflowY: 'scroll'  }}>
          {categorizedPosts.length ? <Post mode={mode} posts={categorizedPosts}
            id={id} setId={setId} title={title} setTitle={setTitle} category={category} setCategory={setCategory}
            location={location} setLocation={setLocation} date={date} setDate={setDate}
            description={description} setDescription={setDescription} image={image}
            setImage={setImage} condition={condition} setCondition={setCondition} 
            showDescription={showDescription} setShowDescription={setShowDescription} /> :
            <div className='fs-5 d-flex justify-content-center h-100 align-items-center'>No Posts For the {categoryName} Category<span>
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="20" fill="currentColor" class="bi bi-emoji-frown-fill" viewBox="0 0 16 16">
                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5m-2.715 5.933a.5.5 0 0 1-.183-.683A4.5 4.5 0 0 1 8 9.5a4.5 4.5 0 0 1 3.898 2.25.5.5 0 0 1-.866.5A3.5 3.5 0 0 0 8 10.5a3.5 3.5 0 0 0-3.032 1.75.5.5 0 0 1-.683.183M10 8c-.552 0-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5S10.552 8 10 8" />
              </svg></span></div>}

        </div>
        {/* main content end */}

      </div>
      <div id="bootstrap-alert" style={{ width: "fit-content", position: "fixed", right: "10px", bottom: "0" }}></div>
    </>
  )
}

export default CategoryPage