const signupValidationSchema = {
  username: {
    notEmpty: {
      errorMessage: "Username is required"
    },
    isLength: {
      options: { min: 3, max: 20 },
      errorMessage:
        "Username must be at least 3 characters long and maximum 20 characters long"
    }
  },
  email: {
    notEmpty: {
      errorMessage: "E-mail is required"
    },
    isLength: {
      options: { min: 12 },
      errorMessage: "Email must be at least 12 characters long"
    },
    isEmail: {
      errorMessage: "Invalid email address"
    }
  },
  password: {
    notEmpty: {
      errorMessage: "Password is required"
    },
    isLength: {
      options: { min: 8 },
      errorMessage: "Password must be at least 8 characters long"
    }
  }
};

export default signupValidationSchema