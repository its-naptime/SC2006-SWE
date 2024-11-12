import React, { useState } from "react";
import './App.css';

function App() {
  // Example 1: Simple state and event handling
  const [counter, setCounter] = useState(0);

  const incrementCounter = () => {
    setCounter(counter + 1);
  };

  // Example 2: Handling form input
  const [formData, setFormData] = useState({
    name: "",
    email: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Form submitted! Name: ${formData.name}, Email: ${formData.email}`);
  };

  return (
    <div className="App">
      <h1>React Front-End Skeleton</h1>

      {/* Example 1: Simple Counter */}
      <div>
        <h2>Counter Example</h2>
        <p>Counter: {counter}</p>
        <button onClick={incrementCounter}>Increment</button>
      </div>

      <hr />

      {/* Example 2: Form Handling */}
      <div>
        <h2>Form Example</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default App;
