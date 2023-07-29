import React, { useState } from 'react';

const MyForm = () => {
  // State to store form data
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  // State to store validation errors
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
  });

  // Event handler for form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Perform any final validation here before submitting data to the server
    // If there are no errors, you can proceed with the submission
    if (isValidFormData(formData)) {
      // Send the data to the server or perform any required action
      console.log('Submitting data:', formData);
    } else {
      console.log('Form has errors. Please correct them.');
    }
  };

  // Input change handler to update form state
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    // Update the form state with the new input value
    setFormData({
      ...formData,
      [name]: value,
    });

    // Perform input validation and update errors state
    setErrors({
      ...errors,
      [name]: validateInput(name, value),
    });
  };

  // Input validation function
  const validateInput = (name, value) => {
    // Implement your validation logic here
    switch (name) {
      case 'username':
        return value.trim() === '' ? 'Username is required.' : '';
      case 'email':
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Invalid email address.' : '';
      case 'password':
        return value.length < 6 ? 'Password must be at least 6 characters long.' : '';
      default:
        return '';
    }
  };

  // Final validation function for the entire form
  const isValidFormData = (formData) => {
    return (
      formData.username.trim() !== '' &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
      formData.password.length >= 6
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
        />
        {errors.username && <span className="error">{errors.username}</span>}
      </div>
      <div>
        <label>Email:</label>
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />
        {errors.password && <span className="error">{errors.password}</span>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default MyForm;
