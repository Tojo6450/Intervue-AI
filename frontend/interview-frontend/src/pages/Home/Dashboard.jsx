import React from 'react';
import {LuPlus} from "react-icons/lu"
// import {CARD_BG} from "../../utils/data"
import toast from "react-hot-toast"
import  { useNavigate } from "react-router-dom"
import { useState } from 'react';
import { useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';


function Dashboard() {
   const navigate = useNavigate();

   const [openCreateModal,setOpenCreateModal] = useState(false);
   const [sessions,setSesssions] = useState([]);
   const [openDeleteAlert,setOpenDeleteAlert] = useState({
    open:false,
    data:null,
   });

   const fetchAllSessions = async()=>{
      try{
        const response = await axiosInstance.get(API_PATHS.SESSION.GET_ALL);
        setSesssions(response.data);
      } catch(err){
        console.error("Error fetching session data",error);
      }
   };

   const deleteSession = async (sessionData) =>{};

   useEffect(()=>{
    fetchAllSessions();
   }, []);

  return (
    <DashboardLayout>
      <div>
        <div>
         {sessions?.map((data,index)=>{
          <Summarycard 
           key={data?._id}
           colors={CARD_BG[index % CARD_BG.length]}
           role={data?.role || ""}
           topicsToFocus={data?.topicsToFocus || ""}
          />
         })}
        </div>

        <button >
           onClick={()=> setOpenCreateModal(true)}
        </button>
        <LuPlus />
        Add new
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
