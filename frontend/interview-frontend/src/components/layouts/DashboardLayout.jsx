import React from 'react';
import { UserContext } from '../../context/userContext';
import { useContext } from 'react';

const DashboardLayout = ()=> {
  const {user} = useContext(UserContext)
  return (
    <div>
        <Navbar />

        
    </div>
  );
}

export default DashboardLayout;
