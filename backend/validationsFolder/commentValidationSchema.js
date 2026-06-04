const commentValidationSchema = {
  user: {
    notEmpty: {
      errorMessage: "User is required"
    }
  },
  text: {
    notEmpty: {
      errorMessage: "Comment is required"
    },
    isLength: {
      options: { min: 1, max: 200 },
      errorMessage: "Comment must be between 1 and 200 characters"
    }
  },
  profilePicture: {
    notEmpty: {
      errorMessage: "Profile Picture is required"
    }
  }
};

export default commentValidationSchema