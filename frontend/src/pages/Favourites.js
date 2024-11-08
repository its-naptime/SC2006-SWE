import { useEffect, useState } from 'react';
import axios from 'axios';

const HDBDataPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from the Django backend
    axios.get('http://localhost:8000/api/hdb_data/')
      .then(response => {
        setData(response.data); // Update this based on the data structure returned
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching HDB data:', err);
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>HDB Data</h1>
      {data.length > 0 ? (
        <ul>
          {data.map((item, index) => (
            <li key={index}>
              {/* Replace with actual fields from your HDB data */}
              <p><strong>ID:</strong> {item.id}</p>
              <p><strong>month</strong> {item.month}</p>
              <p><strong>town:</strong> {item.town}</p>
              <p><strong>flat_type:</strong> {item.flat_type}</p>
              <p><strong>street_name:</strong> {item.street_name}</p>
              <p><strong>storey_range:</strong> {item.storey_range}</p>
              <p><strong>floor_area_sqm:</strong> {item.floor_area_sqm}</p>
              <p><strong>flat_model:</strong> {item.flat_model}</p>
              <p><strong>lease_commence_date:</strong> {item.lease_commence_date}</p>
              <p><strong>remaining_lease:</strong> {item.remaining_lease}</p>
              <p><strong>resale_price:</strong> {item.resale_price}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default HDBDataPage;
