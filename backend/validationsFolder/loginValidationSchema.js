const loginValidationSchema = {
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

export default loginValidationSchema