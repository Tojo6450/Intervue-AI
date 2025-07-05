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
import Summarycard from '../../components/Cards/Summarycard'; // Make sure it's imported

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
    // You can implement delete logic here
  };

  useEffect(() => {
    fetchAllSessions();
  }, []);

  return (
    <DashboardLayout>
      <div className="container mx-auto pt-4 pb-4">
        <div className="grid grid-cols-3 md:grid-cols-3 gap-7 md:gap-7 pt-1 pb-6 px-4">
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
        <div className="flex justify-center mt-4">
          <button
            onClick={() => setOpenCreateModal(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md flex items-center gap-2 transition"
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
    </DashboardLayout>
  );
}

export default Dashboard;
