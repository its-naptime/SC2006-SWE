import React from 'react';
import styles from "../styles/Search.module.css";

export const DetailContent = ({ item, type }) => {
  const renderHDBDetails = () => {
    if (!item) return null;
    
    return (
      <>
        <div className={styles.modalDetail}>
          <strong>Street Name:</strong> {item.street_name}
        </div>
        <div className={styles.modalDetail}>
          <strong>Block:</strong> {item.block}
        </div>
        <div className={styles.modalDetail}>
          <strong>Town:</strong> {item.town}
        </div>
        <div className={styles.modalDetail}>
          <strong>Flat Type:</strong> {item.flat_type}
        </div>
        <div className={styles.modalDetail}>
          <strong>Floor Area:</strong> {item.floor_area_sqm} sqm
        </div>
        <div className={styles.modalDetail}>
          <strong>Resale Price:</strong> ${parseFloat(item.resale_price).toLocaleString()}
        </div>
        <div className={styles.modalDetail}>
          <strong>Storey Range:</strong> {item.storey_range}
        </div>
        <div className={styles.modalDetail}>
          <strong>Flat Model:</strong> {item.flat_model}
        </div>
        <div className={styles.modalDetail}>
          <strong>Lease Commence Date:</strong> {item.lease_commence_date}
        </div>
        <div className={styles.modalDetail}>
          <strong>Remaining Lease:</strong> {item.remaining_lease}
        </div>
      </>
    );
  };

  const renderSchoolDetails = () => {
    if (!item) return null;

    return (
      <>
        <div className={styles.modalDetail}>
          <strong>School Name:</strong> {item.school_name}
        </div>
        <div className={styles.modalDetail}>
          <strong>Address:</strong> {item.address}
        </div>
        <div className={styles.modalDetail}>
          <strong>Postal Code:</strong> {item.postal_code}
        </div>
        <div className={styles.modalDetail}>
          <strong>Contact:</strong> {item.telephone_no}
          {item.telephone_no_2 && `, ${item.telephone_no_2}`}
        </div>
        <div className={styles.modalDetail}>
          <strong>Email:</strong> {item.email_address}
        </div>
        <div className={styles.modalDetail}>
          <strong>Type:</strong> {item.type_code}
        </div>
        <div className={styles.modalDetail}>
          <strong>Level:</strong> {item.mainlevel_code}
        </div>
        <div className={styles.modalDetail}>
          <strong>Zone:</strong> {item.zone_code}
        </div>
        <div className={styles.modalDetail}>
          <strong>Principal:</strong> {item.principal_name}
        </div>
        <div className={styles.modalDetail}>
          <strong>Transportation:</strong>
          {item.mrt_desc && (
            <div><small>MRT: {item.mrt_desc}</small></div>
          )}
          {item.bus_desc && (
            <div><small>Bus: {item.bus_desc}</small></div>
          )}
        </div>
        <div className={styles.modalDetail}>
          <strong>Special Programs:</strong>
          <div className="d-flex gap-2 mt-1 flex-wrap">
            {item.sap_ind === 'Yes' && (
              <span className="badge bg-secondary">SAP</span>
            )}
            {item.gifted_ind === 'Yes' && (
              <span className="badge bg-secondary">Gifted Program</span>
            )}
            {item.ip_ind === 'Yes' && (
              <span className="badge bg-secondary">IP Program</span>
            )}
            {item.autonomous_ind === 'Yes' && (
              <span className="badge bg-secondary">Autonomous</span>
            )}
          </div>
        </div>
        
        <div className={styles.modalDetail}>
          <strong>Mother Tongue Languages:</strong>
          <div>
            {item.mothertongue1_code}
            {item.mothertongue2_code && `, ${item.mothertongue2_code}`}
            {item.mothertongue3_code && `, ${item.mothertongue3_code}`}
          </div>
        </div>
        {item.ccas && item.ccas.length > 0 && (
        <div className={styles.modalDetail}>
            <strong>Co-Curricular Activities:</strong>
            <div className="d-flex gap-2 mt-1 flex-wrap">
            {item.ccas.map((cca, index) => (
                <span 
                key={index} 
                className={`badge bg-secondary ${styles.ccaBadge}`}
                title={cca.cca_customized_name !== cca.cca_generic_name ? cca.cca_customized_name : undefined}
                >
                {cca.cca_generic_name}
                </span>
            ))}
            </div>
        </div>
        )}
      </>
    );
  };

  const renderPreschoolDetails = () => {
    if (!item) return null;

    return (
      <>
        <div className={styles.modalDetail}>
          <strong>Centre Name:</strong> {item.centre_name}
        </div>
        <div className={styles.modalDetail}>
          <strong>Organisation:</strong> {item.organisation_description}
        </div>
        <div className={styles.modalDetail}>
          <strong>Service Model:</strong> {item.service_model}
        </div>
        <div className={styles.modalDetail}>
          <strong>Contact:</strong> {item.centre_contact_no}
        </div>
        <div className={styles.modalDetail}>
          <strong>Email:</strong> {item.centre_email_address}
        </div>
        <div className={styles.modalDetail}>
          <strong>Address:</strong> {item.centre_address}
        </div>
        <div className={styles.modalDetail}>
          <strong>Postal Code:</strong> {item.postal_code}
        </div>
        <div className={styles.modalDetail}>
          <strong>Current Vacancies:</strong>
          <ul className="list-unstyled mb-0 mt-1">
            {item.infant_vacancy_current_month && item.infant_vacancy_current_month !== '0' && (
              <li>Infant: {item.infant_vacancy_current_month}</li>
            )}
            {item.pg_vacancy_current_month && item.pg_vacancy_current_month !== '0' && (
              <li>Playgroup: {item.pg_vacancy_current_month}</li>
            )}
            {item.n1_vacancy_current_month && item.n1_vacancy_current_month !== '0' && (
              <li>N1: {item.n1_vacancy_current_month}</li>
            )}
            {item.n2_vacancy_current_month && item.n2_vacancy_current_month !== '0' && (
              <li>N2: {item.n2_vacancy_current_month}</li>
            )}
            {item.k1_vacancy_current_month && item.k1_vacancy_current_month !== '0' && (
              <li>K1: {item.k1_vacancy_current_month}</li>
            )}
            {item.k2_vacancy_current_month && item.k2_vacancy_current_month !== '0' && (
              <li>K2: {item.k2_vacancy_current_month}</li>
            )}
          </ul>
        </div>
        <div className={styles.modalDetail}>
          <strong>Operating Hours:</strong>
          <div>
            {item.weekday_full_day && <div>Weekday: {item.weekday_full_day}</div>}
            {item.saturday && <div>Saturday: {item.saturday}</div>}
            {item.extended_operating_hours === 'Yes' && (
              <div><small>Extended hours available</small></div>
            )}
          </div>
        </div>
        <div className={styles.modalDetail}>
          <strong>Features:</strong>
          <div className="d-flex gap-2 mt-1 flex-wrap">
            {item.spark_certified === 'Yes' && (
              <span className="badge bg-success">SPARK Certified</span>
            )}
            {item.provision_of_transport === 'Yes' && (
              <span className="badge bg-info">Transport Available</span>
            )}
            {item.government_subsidy === 'Yes' && (
              <span className="badge bg-primary">Government Subsidy</span>
            )}
          </div>
        </div>
        <div className={styles.modalDetail}>
          <strong>Languages:</strong> {item.second_languages_offered}
        </div>
        <div className={styles.modalDetail}>
          <strong>Food Offered:</strong> {item.food_offered}
        </div>
      </>
    );
  };

  // Render appropriate details based on type
  return (
    <div className={styles.modalDetails}>
      {type === 'hdb' && renderHDBDetails()}
      {type === 'school' && renderSchoolDetails()}
      {type === 'preschool' && renderPreschoolDetails()}
    </div>
  );
};