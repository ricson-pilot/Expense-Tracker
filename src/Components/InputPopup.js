import React, { useState } from 'react';
import './Styles/InputPopup.css';

const Popup = ({ onClose, userEmail }) => {
  const [file, setFile] = useState(null);

  const handleSubmitLeft = async (e) => {
    e.preventDefault();
  
    const form = e.target;
    const amount = form.amount.value;
    const category = form.category.value;
    const date = form.date.value;
  
    const userId = 1; // Replace with actual userId
    const categoryId = 1; // Replace with actual categoryId
  
    try {
      const response = await fetch(`http://localhost:8080/api/v1/expenses/user/${userId}/category/${categoryId}/amount/${amount}/transactionDate/${date}`, {
        method: 'POST',
      });
  
      if (response.ok) {
        const result = await response.json();
        alert('Expense added successfully!');
        console.log(result);
      } else {
        const error = await response.text();
        alert(`Error: ${error}`);
      }
    } catch (error) {
      console.log("error: ", error);
      alert(`Error: ${error.message}`);
    }
  };

  const handleSubmitRight = async (e) => {
    e.preventDefault();
    if (!file) {
      alert('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('userEmail', 'ricson');

    console.log(formData);
    console.log(formData.userEmail);

    try {
      const response = await fetch('http://localhost:8080/api/v1/expenses/upload-csv', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.text();
        alert(result);
      } else {
        const error = await response.text();
        alert(`Error: ${error}`);
      }
    } catch (error) {
      // alert(`Error: ${error.message}`);
      console.log("error: ",error);
    }
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <h2>Add Expense</h2>
        <div className="form-container">
          <form className="left-form" onSubmit={handleSubmitLeft}>
            <div className="form-group">
              <label>Amount:</label>
              <input type="number" name="amount" required />
            </div>
            <div className="form-group">
              <label>Category:</label>
              <input type="text" name="category" required />
            </div>
            <div className="form-group">
              <label>Date:</label>
              <input type="date" name="date" required />
            </div>
            <div className="form-actions">
              <button type="submit" className="submit-button">Submit</button>
            </div>
          </form>
          <div className="vertical-line"></div>
          <form className="right-form" onSubmit={handleSubmitRight}>
            <div className="form-group">
              <label>Upload File:</label>
              <input type="file" name="file" required onChange={(e) => setFile(e.target.files[0])} />
            </div>
            <div className="form-actions">
              <button type="submit" className="submit-button">Submit</button>
            </div>
          </form>
        </div>
        <div className="form-actions">
          <button type="button" className="close-button" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Popup;