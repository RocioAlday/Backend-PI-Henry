import React from "react";
import { useDispatch } from 'react-redux';
import { clearFilter } from "../../actions";
import './clearfilters.css';

export default function ClearFilters() {
    const dispatch = useDispatch();
  
      function handleClear() {
          dispatch(clearFilter());
      }
  
      return (
          <div>
              <button className="clearbutton" onClick={handleClear}>CLEAR FILTERS</button>
          </div>
      );
  };
