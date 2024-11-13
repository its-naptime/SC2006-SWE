import React from 'react';
import { Form } from 'react-bootstrap';
import styles from "../styles/Search.module.css";

export const HDBFilters = ({ filters, onFilterChange }) => (
  <Form className="row g-3">
    <Form.Group className="col-md-6">
      <Form.Label>Price Range</Form.Label>
      <div className="d-flex gap-2">
        <Form.Control
          type="number"
          placeholder="Min Price"
          value={filters.minPrice}
          onChange={(e) => onFilterChange('minPrice', e.target.value)}
        />
        <Form.Control
          type="number"
          placeholder="Max Price"
          value={filters.maxPrice}
          onChange={(e) => onFilterChange('maxPrice', e.target.value)}
        />
      </div>
    </Form.Group>

    <Form.Group className="col-md-6">
      <Form.Label>Area (sqm)</Form.Label>
      <div className="d-flex gap-2">
        <Form.Control
          type="number"
          placeholder="Min Area"
          value={filters.minArea}
          onChange={(e) => onFilterChange('minArea', e.target.value)}
        />
        <Form.Control
          type="number"
          placeholder="Max Area"
          value={filters.maxArea}
          onChange={(e) => onFilterChange('maxArea', e.target.value)}
        />
      </div>
    </Form.Group>

    <Form.Group className="col-md-6">
      <Form.Label>Flat Type</Form.Label>
      <Form.Select
        multiple
        value={filters.flatTypes}
        onChange={(e) => onFilterChange('flatTypes', 
          Array.from(e.target.selectedOptions, option => option.value)
        )}
      >
        <option value="2 ROOM">2 ROOM</option>
        <option value="3 ROOM">3 ROOM</option>
        <option value="4 ROOM">4 ROOM</option>
        <option value="5 ROOM">5 ROOM</option>
        <option value="EXECUTIVE">EXECUTIVE</option>
      </Form.Select>
    </Form.Group>

    <Form.Group className="col-md-6">
      <Form.Label>Town</Form.Label>
      <Form.Select
        multiple
        value={filters.towns}
        onChange={(e) => onFilterChange('towns', 
          Array.from(e.target.selectedOptions, option => option.value)
        )}
      >
        <option value="ANG MO KIO">ANG MO KIO</option>
        <option value="BEDOK">BEDOK</option>
        <option value="BISHAN">BISHAN</option>
        <option value="BUKIT BATOK">BUKIT BATOK</option>
        <option value="BUKIT MERAH">BUKIT MERAH</option>
        <option value="BUKIT PANJANG">BUKIT PANJANG</option>
        <option value="BUKIT TIMAH">BUKIT TIMAH</option>
        <option value="CENTRAL AREA">CENTRAL AREA</option>
        <option value="CHOA CHU KANG">CHOA CHU KANG</option>
        <option value="CLEMENTI">CLEMENTI</option>
        <option value="GEYLANG">GEYLANG</option>
        <option value="HOUGANG">HOUGANG</option>
        <option value="JURONG EAST">JURONG EAST</option>
        <option value="JURONG WEST">JURONG WEST</option>
        <option value="KALLANG/WHAMPOA">KALLANG/WHAMPOA</option>
        <option value="MARINE PARADE">MARINE PARADE</option>
        <option value="PASIR RIS">PASIR RIS</option>
        <option value="PUNGGOL">PUNGGOL</option>
        <option value="QUEENSTOWN">QUEENSTOWN</option>
        <option value="SEMBAWANG">SEMBAWANG</option>
        <option value="SENGKANG">SENGKANG</option>
        <option value="SERANGOON">SERANGOON</option>
        <option value="TAMPINES">TAMPINES</option>
        <option value="TOA PAYOH">TOA PAYOH</option>
        <option value="WOODLANDS">WOODLANDS</option>
        <option value="YISHUN">YISHUN</option>
      </Form.Select>
    </Form.Group>

    <Form.Group className="col-12">
      <Form.Label>Sort By</Form.Label>
      <Form.Select
        value={filters.sortBy}
        onChange={(e) => onFilterChange('sortBy', e.target.value)}
      >
        <option value="-resale_price">Price (High to Low)</option>
        <option value="resale_price">Price (Low to High)</option>
        <option value="-floor_area_sqm">Area (Large to Small)</option>
        <option value="floor_area_sqm">Area (Small to Large)</option>
      </Form.Select>
    </Form.Group>
  </Form>
);

export const SchoolFilters = ({ filters, onFilterChange }) => (
  <Form className="row g-3">
    <Form.Group className="col-md-6">
      <Form.Label>School Level</Form.Label>
      <Form.Select
        value={filters.mainlevel}
        onChange={(e) => onFilterChange('mainlevel', e.target.value)}
      >
        <option value="">All Levels</option>
        <option value="PRIMARY">Primary</option>
        <option value="SECONDARY">Secondary</option>
        <option value="MIXED LEVEL">Mixed Levels</option>
      </Form.Select>
    </Form.Group>

    <Form.Group className="col-md-6">
      <Form.Label>Zone</Form.Label>
      <Form.Select
        multiple
        value={filters.zones}
        onChange={(e) => onFilterChange('zones', 
          Array.from(e.target.selectedOptions, option => option.value)
        )}
      >
        <option value="NORTH">North</option>
        <option value="SOUTH">South</option>
        <option value="EAST">East</option>
        <option value="WEST">West</option>
      </Form.Select>
    </Form.Group>

    <Form.Group className="col-md-6">
      <Form.Label>CCA</Form.Label>
      <Form.Control
        type="text"
        placeholder="Search CCAs..."
        value={filters.cca}
        onChange={(e) => onFilterChange('cca', e.target.value)}
      />
    </Form.Group>

    <Form.Group className="col-12">
      <Form.Check
        type="checkbox"
        label="Special Programs"
        className="mb-2"
      />
      <div className="d-flex gap-3 ms-4">
        <Form.Check
          type="checkbox"
          label="SAP"
          checked={filters.sap}
          onChange={(e) => onFilterChange('sap', e.target.checked)}
        />
        <Form.Check
          type="checkbox"
          label="Gifted"
          checked={filters.gifted}
          onChange={(e) => onFilterChange('gifted', e.target.checked)}
        />
        <Form.Check
          type="checkbox"
          label="IP"
          checked={filters.ip}
          onChange={(e) => onFilterChange('ip', e.target.checked)}
        />
      </div>
    </Form.Group>
  </Form>
);

export const PreschoolFilters = ({ filters, onFilterChange }) => (
  <Form className="row g-3">
    <Form.Group className="col-md-6">
      <Form.Label>Level</Form.Label>
      <Form.Select
        value={filters.level}
        onChange={(e) => onFilterChange('level', e.target.value)}
      >
        <option value="">All Levels</option>
        <option value="infant">Infant</option>
        <option value="pg">Playgroup</option>
        <option value="n1">Nursery 1</option>
        <option value="n2">Nursery 2</option>
        <option value="k1">Kindergarten 1</option>
        <option value="k2">Kindergarten 2</option>
      </Form.Select>
    </Form.Group>

    <Form.Group className="col-md-6">
      <Form.Label>Service Model</Form.Label>
      <Form.Select
        multiple
        value={filters.serviceModels}
        onChange={(e) => onFilterChange('serviceModels', 
          Array.from(e.target.selectedOptions, option => option.value)
        )}
      >
        <option value="CC">Child Care</option>
        <option value="KN">Kindergarten</option>
      </Form.Select>
    </Form.Group>

    <Form.Group className="col-12">
      <div className="d-flex gap-3">
        <Form.Check
          type="checkbox"
          label="SPARK Certified"
          checked={filters.sparkCertified}
          onChange={(e) => onFilterChange('sparkCertified', e.target.checked)}
        />
        <Form.Check
          type="checkbox"
          label="Transport Provided"
          checked={filters.transportRequired}
          onChange={(e) => onFilterChange('transportRequired', e.target.checked)}
        />
      </div>
    </Form.Group>
  </Form>
);