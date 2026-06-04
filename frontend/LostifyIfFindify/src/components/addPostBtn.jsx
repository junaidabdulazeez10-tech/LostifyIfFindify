function AddPost({ mode, token, setCategory, setCondition, setDate, setDescription, setTitle, setLocation }) {
  return (
    token ?
      <div className="position-absolute bottom-0 end-0" style={{ marginRight: '35px', marginBottom: '50px' }}>
        <button className={`btn  ${mode ? "btn-outline-light" : "btn-outline-dark"}`}
          style={{ fontSize: 'clamp(30px, 6vw, 70px)', width: 'clamp(60px, 10vw, 110px)', aspectRatio: '1', borderRadius: '50%' }} 
          data-bs-toggle="modal" data-bs-target="#add-post-form" onClick={() => {
            setCategory('')
            setCondition('')
            setDate('')
            setTitle('')
            setLocation('')
            setDescription('')
          }} >+</button>
      </div>
      :
      null
  )
}

export default AddPost