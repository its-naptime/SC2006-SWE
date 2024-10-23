import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
function About() {
  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Navbar</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Features</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Pricing</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Button */}
      <div className="container mt-4">
        <button className="btn btn-primary">
          Test Button
        </button>
      </div>

      {/* Card */}
      <div className="container mt-4">
        <div className="card" style={{ width: '18rem' }}>
          <img src="https://via.placeholder.com/150" className="card-img-top" alt="Test Image" />
          <div className="card-body">
            <h5 className="card-title">Card Title</h5>
            <p className="card-text">This is a simple card to test Bootstrap in your project.</p>
            <a href="#" className="btn btn-primary">Go somewhere</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
