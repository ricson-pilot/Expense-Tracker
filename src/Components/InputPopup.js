import React, { useState } from 'react';
import './Styles/InputPopup.css';
import { toast } from 'react-toastify';
import API_BASE_URL from './apiConfig';

const Popup = ({ onClose, userEmail }) => {
  const [file, setFile] = useState(null);
  const categories = ['Food', 'Transport', 'Entertainment', 'Groceries', 'Utilities', 'Healthcare', 'Education', 'Miscellaneous'];

  const handleSubmitLeft = async (e) => {
    e.preventDefault();

    const form = e.target;
    const amount = form.amount.value;
    const category = form.category.value;
    const date = form.date.value;

    // Retrieve the JWT token from localStorage
    const jwtToken = localStorage.getItem('jwtToken');
    if (!jwtToken) {
      alert('You are not authenticated. Please log in.');
      return;
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}/expenses/add?categoryName=${encodeURIComponent(category
        )}&amount=${encodeURIComponent(
          amount
        )}&transactionDate=${encodeURIComponent(date)}`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${jwtToken}`, // Include the JWT token in the header
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.ok) {
        const result = await response.json();
        alert('Expense added successfully!');
        console.log(result);
        // toast.success(result);
      } else {
        const error = await response.text();
        alert(`Error: ${error}`);
      }
    } catch (error) {
      console.log('error: ', error);
      alert(`Error: ${error.message}`);
    }
  };

  const handleSubmitRight = async (e) => {
    e.preventDefault();
  
    // Check if a file is selected
    if (!file) {
      alert('Please select a file to upload.');
      return;
    }
  
    // Create FormData object
    const formData = new FormData();
    formData.append('file', file); // Append the file
  
    try {
      // Send the request to the backend
      const response = await fetch(`${API_BASE_URL}/expenses/upload-csv`, {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwtToken')}`, // Add the JWT token here
        },
      });
  
      // Handle the response
      if (response.ok) {
        const result = await response.text();
        console.log(result);
        alert("File upload Success!!!")
        //toast.success(result); // Display success message
      } else {
        const error = await response.text();
        alert(`Error: ${error}`); // Display error message
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className="popup-popup">
      <div className="popup-content-popup">
        <h2>Add Expense</h2>
        <div className="form-container-popup">
          <form className="left-form-popup" onSubmit={handleSubmitLeft}>
            <div className="form-group-popup">
              <label>Amount:</label>
              <input type="number" name="amount" required />
            </div>
            <div className="form-group-popup">
              <label>Category:</label>
              <select name="category" required>
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group-popup">
              <label>Date:</label>
              <input type="date" name="date" required />
            </div>
            <div className="form-actions-popup">
              <button type="submit" className="submit-button-popup">
                Submit
              </button>
            </div>
          </form>
          <div className="vertical-line-popup"></div>
          <form className="right-form-popup" onSubmit={handleSubmitRight}>
            <div className="form-group-popup">
              <label>Upload File:</label>
              <input
                type="file"
                name="file"
                required
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            <div className="form-actions-popup">
              <button type="submit" className="submit-button-popup">
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="form-actions-popup">
          <button type="button" className="close-button-popup" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;