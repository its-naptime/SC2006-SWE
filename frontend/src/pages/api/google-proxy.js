import axios from 'axios';

export default async function handler(req, res) {
  const { input } = req.query;

  try {
    const response = await axios.get(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json`, {
      params: {
        input,
        inputtype: 'textquery',
        fields: 'place_id',
        key: process.env.NEXT_PUBLIC_API_KEY, // Use environment variables for security
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching data from Google API:', error);
    res.status(500).json({ error: 'Error fetching data from Google API' });
  }
}
