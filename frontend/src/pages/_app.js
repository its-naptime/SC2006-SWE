// src/pages/_app.js (move your App.js to this location)
import '../App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from '../components/Layout';
import { AuthProvider } from '../AuthContext';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      
        <Component {...pageProps} />
      
    </AuthProvider>
  );
}

export default MyApp;