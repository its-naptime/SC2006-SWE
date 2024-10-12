import React, { useState } from "react";

function Home() {
  const [counter, setCounter] = useState(0);

  const incrementCounter = () => {
    setCounter(counter + 1);
  };

  return (
    <div>
      <h1>Home Page</h1>

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
        <form onSubmit={(e) => e.preventDefault()}>
          <div>
            <label>
              Name:
              <input type="text" />
            </label>
          </div>
          <div>
            <label>
              Email:
              <input type="email" />
            </label>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Home;
