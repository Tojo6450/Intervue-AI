import React, { useState, useEffect } from 'react';
import { LuPlus } from 'react-icons/lu';
import { CARD_BG } from '../../utils/data';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import moment from 'moment';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import Modal from '../../components/Modal';
import CreateSessionForm from './CreateSessionForm';
import Summarycard from '../../components/Cards/Summarycard';
import DeleteAlertContent from '../../components/DeleteAlertContent';
import toast from 'react-hot-toast';

function Dashboard() {
  const navigate = useNavigate();

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    open: false,
    data: null,
  });

  const fetchAllSessions = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.SESSION.GET_ALL);
      setSessions(response.data);
    } catch (error) {
      console.log('Error fetching session data', error);
    }
  };

  const deleteSession = async (sessionData) => {
     try{
      await axiosInstance.delete(API_PATHS.SESSION.DELETE(sessionData?._id));

      toast.success("Session Deleted Successfully");
      setOpenDeleteAlert({
        open: false,
        data: null,
      });
      fetchAllSessions();
     } catch(error){
      console.error("Error deleting session data:", error);
     }
  };

  useEffect(() => {
    fetchAllSessions();
  }, []);

  return (
    <DashboardLayout>
      <div className="container mx-auto pt-4 pb-4 ">
        <div className="grid grid-rows-3 md:grid-cols-3 gap-7 md:gap-7 pt-1 pb-6 px-4">
          {sessions?.map((data, index) => (
            <Summarycard
              key={data?._id}
              colors={CARD_BG[index % CARD_BG.length]}
              role={data?.role || ''}
              topicsToFocus={data?.topicsToFocus || ''}
              experience={data?.experience || '-'}
              questions={data?.questions?.length || '-'}
              description={data?.description || ''}
              lastUpdated={
                data?.updatedAt
                  ? moment(data.updatedAt).format('Do MMM YYYY')
                  : ''
              }
              onSelect={() => navigate(`/interview-prep/${data?._id}`)}
              onDelete={() => setOpenDeleteAlert({ open: true, data })}
            />
          ))}
        </div>

        {/* Add Button */}
      <div className="fixed bottom-8 right-8 z-40">
        <button
          onClick={() => setOpenCreateModal(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg transition"
        >
          <LuPlus className="text-lg" />
          Add New
        </button>
      </div>
            
      </div>
      {/* Modal for Creating Session */}
      <Modal
        isOpen={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        hideHeader
        variant="dashboard"
      >
        <div className="p-2">
          <CreateSessionForm />
        </div>
      </Modal>

      <Modal 
         isOpen={openDeleteAlert?.open}
         onClose={()=>{
          setOpenDeleteAlert({open : false,data:null});
         }}
         title="Delete Alert"
         >
         <div className="w-[30vw]">
          <DeleteAlertContent
            content="Are you sure want to delete this session detail?"
            onDelete={()=> deleteSession(openDeleteAlert.data)}
           />
          </div> 
         </Modal>
    </DashboardLayout>
  );
}

export default Dashboard;
