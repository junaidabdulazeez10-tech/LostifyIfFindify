const postValidationSchema = {
  username: {
    notEmpty: {
      errorMessage: "Username is required"
    },
    isLength: {
      options: { min: 3, max: 20 },
      errorMessage: "Username must be at least 3 characters long and maximum 20 characters long"
    }
  },
  title: {
    notEmpty: {
      errorMessage: "Title is required"
    },
    isLength: {
      options: { min: 3, max: 20 },
      errorMessage: "Title must be at least 3 characters long and maximum 20 characters long"
    }
  },
  condition: {
    notEmpty: {
      errorMessage: "Condition is required"
    }
  },
  category: {
    notEmpty: {
      errorMessage: "Category is required"
    },
    isLength: {
      options: { min: 3, max: 20 },
      errorMessage: "Category must be at least 3 characters long and maximum 20 characters long"
    }
  },
  location: {
    notEmpty: {
      errorMessage: "Location is required"
    },
    isLength: {
      options: { min: 3 },
      errorMessage: "Location must be at least 3 characters long"
    },
  },
  date: {
    notEmpty: {
      errorMessage: "Date is required"
    }
  },
  description: {
    notEmpty: {
      errorMessage: "Description is required"
    }
  }, 
};

export default postValidationSchema;