import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/input';
import SpinnerLoader from '../../components/Loader/SpinnerLoader';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';

const CreateSessionForm = () => {
  const [formData, setFormData] = useState({
    role: '',
    experience: '',
    topicsToFocus: '',
    description: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleCreateSession = async (e) => {
    e.preventDefault();
    const { role, experience, topicsToFocus } = formData;

    if (!role || !experience || !topicsToFocus) {
      setError('Please fill all the required fields.');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      const aiResponse = await axiosInstance.post(API_PATHS.AI.GENERATE_QUESTIONS, {
        role,
        experience,
        topicsToFocus,
        numberofQuestions: 7,
      });

      const generatedQuestions = aiResponse.data;

      const response = await axiosInstance.post(API_PATHS.SESSION.CREATE, {
        ...formData,
        questions: generatedQuestions,
      });

      if (response.data?.session?._id) {
        navigate(`/interview-prep/${response.data.session._id}`);
      }
    } catch (error) {
      if(error.response && error.response.data.message){
        setError(error.response.data.message)
      }
      else setError('An error occurred while creating the session.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold text-gray-800 mb-1">
        Start a New Interview Journey
      </h3>
      <p className="text-sm text-gray-600 mb-5">
        Fill out a few quick details and unlock your personalized set of interview questions!
      </p>

      <form onSubmit={handleCreateSession} className="flex flex-col gap-4">
        <Input
          value={formData.role}
          onChange={({ target }) => handleChange('role', target.value)}
          label="Target Role"
          placeholder="e.g., Frontend Developer"
          type="text"
        />

        <Input
          value={formData.experience}
          onChange={({ target }) => handleChange('experience', target.value)}
          label="Years of Experience"
          placeholder="e.g., 1, 3, 5+"
          type="number"
        />

        <Input
          value={formData.topicsToFocus}
          onChange={({ target }) => handleChange('topicsToFocus', target.value)}
          label="Topics to Focus On"
          placeholder="e.g., React, Node.js"
          type="text"
        />

        <Input
          value={formData.description}
          onChange={({ target }) => handleChange('description', target.value)}
          label="Description"
          placeholder="Any goals or notes for this session"
          type="text"
        />

        {error && (
          <p className="text-red-500 text-sm -mt-2">{error}</p>
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white rounded-md py-2 px-4 flex items-center justify-center gap-2 hover:bg-blue-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading && <SpinnerLoader />}
          {isLoading ? 'Creating...' : 'Create Session'}
        </button>
      </form>
    </div>
  );
};

export default CreateSessionForm;
