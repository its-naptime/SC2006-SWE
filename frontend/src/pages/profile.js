import React, { useState, useEffect } from 'react';
import { Tab, Tabs, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import LoadingIndicator from '../components/LoadingIndicator';
import { DetailModal } from '../components/DetailModal';
import { HDBCard, SchoolCard, PreschoolCard } from '../components/SearchResults';
import styles from '../styles/Search.module.css';
import { useAuth } from '../AuthContext';
import api from '../Api';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('hdb');
  const [savedItems, setSavedItems] = useState({
    hdb: [],
    schools: [],
    preschools: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isMovingMap, setIsMovingMap] = useState(false);
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/');
    } else if (isAuthenticated) {
      fetchSavedItems();
    }
  }, [isAuthenticated, isLoading]);

  const fetchSavedItems = async () => {
    try {
      setLoading(true);
      const [hdbResponse, schoolsResponse, preschoolsResponse] = await Promise.all([
        api.get('/api/catalogue/saved-hdbs/'),
        api.get('/api/catalogue/saved-schools/'),
        api.get('/api/catalogue/saved-preschools/')
      ]);

      setSavedItems({
        hdb: hdbResponse.data,
        schools: schoolsResponse.data,
        preschools: preschoolsResponse.data
      });
    } catch (error) {
      console.error('Error fetching saved items:', error);
      setError('Failed to load saved items. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  
  const handleToggleSave = async (item) => {
    if (!isAuthenticated) return;
    try {
      let endpoint;
      let payload;
  
      switch (activeTab) {
        case 'hdb':
          endpoint = '/api/catalogue/saved-hdbs/toggle_save/';
          payload = { hdb_id: item };
          break;
        case 'schools':
          endpoint = '/api/catalogue/saved-schools/toggle_save/';
          payload = { school_id: item };
          break;
        case 'preschools':
          endpoint = '/api/catalogue/saved-preschools/toggle_save/';
          payload = { preschool_id: item };
          break;
      }
  
      await api.post(endpoint, payload);
      await fetchSavedItems();
    } catch (error) {
      console.error('Error toggling save:', error);
      setError('Failed to update saved item. Please try again.');
    }
  };

  const handleViewMap = (item) => {
    setIsMovingMap(true);
    router.push({
      pathname: '/search',
      query: {
        activeTab: activeTab === 'hdb' ? 'hdb' : 
                  activeTab === 'schools' ? 'school' : 'preschool',
        latitude: item.latitude,
        longitude: item.longitude
      }
    });
  };

  const handleViewDetails = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  if (isLoading || loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "calc(100vh - 160px)" }}>
        <LoadingIndicator />
      </div>
    );
  }

  const isItemSaved = (itemId) => {
    const currentItems = savedItems[activeTab] || [];
    return currentItems.some(item => {
      const itemData = item.hdb || item.school || item.preschool;
      return itemData.id === itemId;
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Saved Locations</h2>
        </div>

        <Tabs
          activeKey={activeTab}
          onSelect={(k) => setActiveTab(k)}
          className="mb-4"
        >
          <Tab eventKey="hdb" title={`HDB Properties (${savedItems.hdb.length})`}>
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            
            <div className={styles.resultGrid}>
              {savedItems.hdb.map((item) => (
                <HDBCard
                  key={item.id}
                  property={item.hdb_details}
                  onViewMap={() => handleViewMap(item.hdb_details)}
                  onViewDetails={() => handleViewDetails(item.hdb_details)}
                  isMovingMap={isMovingMap}
                  isSaved={true}
                  onToggleSave={() => handleToggleSave(item.hdb)}
                />
              ))}
              {savedItems.hdb.length === 0 && (
                <div className="text-center py-5 w-100">
                  <p>No saved HDB properties</p>
                  <Button 
                    variant="primary" 
                    onClick={() => router.push('/search?activeTab=hdb')}
                  >
                    Search HDB Properties
                  </Button>
                </div>
              )}
            </div>
          </Tab>

          <Tab eventKey="schools" title={`Schools (${savedItems.schools.length})`}>
            <div className={styles.resultGrid}>
              {savedItems.schools.map((item) => (
                <SchoolCard
                  key={item.id}
                  school={item.school_details}
                  onViewMap={() => handleViewMap(item.school_details)}
                  onViewDetails={() => handleViewDetails(item.school_details)}
                  isMovingMap={isMovingMap}
                  isSaved={true}
                  onToggleSave={() => handleToggleSave(item.school)}
                />
              ))}
              {savedItems.schools.length === 0 && (
                <div className="text-center py-5 w-100">
                  <p>No saved schools</p>
                  <Button 
                    variant="primary" 
                    onClick={() => router.push('/search?activeTab=school')}
                  >
                    Search Schools
                  </Button>
                </div>
              )}
            </div>
          </Tab>

          <Tab eventKey="preschools" title={`Preschools (${savedItems.preschools.length})`}>
            <div className={styles.resultGrid}>
              {savedItems.preschools.map((item) => (
                <PreschoolCard
                  key={item.id}
                  preschool={item.preschool_details}
                  onViewMap={() => handleViewMap(item.preschool_details)}
                  onViewDetails={() => handleViewDetails(item.preschool_details)}
                  isMovingMap={isMovingMap}
                  isSaved={true}
                  onToggleSave={() => handleToggleSave(item.preschool)}
                />
              ))}
              {savedItems.preschools.length === 0 && (
                <div className="text-center py-5 w-100">
                  <p>No saved preschools</p>
                  <Button 
                    variant="primary" 
                    onClick={() => router.push('/search?activeTab=preschool')}
                  >
                    Search Preschools
                  </Button>
                </div>
              )}
            </div>
          </Tab>
        </Tabs>

        <DetailModal
          show={showModal}
          onHide={() => setShowModal(false)}
          item={selectedItem}
          type={activeTab === 'hdb' ? 'hdb' : 
                activeTab === 'schools' ? 'school' : 'preschool'}
          onViewMap={handleViewMap}
          isSaved={true}
          onToggleSave={handleToggleSave}
        />
      </div>
    </div>
  );
};

export default ProfilePage;