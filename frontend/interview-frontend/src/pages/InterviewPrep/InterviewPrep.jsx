import React, { useEffect, useState } from "react";
import RoleInfoHeader from "./RoleInfoHeader";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { useParams } from "react-router-dom";
import {AnimatePresence, motion} from "framer-motion";
import { LuCircleAlert,LuListCollapse } from "react-icons/lu";
import {toast} from "react-hot-toast";
import moment from 'moment';
import QuestionCard from "../../components/Cards/QuestionCard";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import AIResponsePreview from "./AIResponsePreview";
import Drawer from "../../components/Drawer";
import SkeletonLoader from "../../components/Loader/SkeletonLoader";
import SpinnerLoader from "../../components/Loader/SpinnerLoader";

const InterviewPrep = ()=>{
    const {sessionId} = useParams();
    const [sessionData, setSessionData] = useState(null);
    const [errorMsg, setErrormsg] = useState("");
    const [openLearnMoreDrawer, setOpenLearnMoreDrawer] = useState(false);
    const [explanation,setExplanation] =useState(null);
    const [isLoading,setIsLoading]= useState(null);
    const [isUpdateLoader,setIsUpdateLoader] = useState(false);

    const fetchSessionDetailsById = async()=>{
     try{
        const response = await axiosInstance.get(
            API_PATHS.SESSION.GET_ONE(sessionId)
        );
        if(response.data && response.data.session){
            setSessionData(response.data.session);
        }
        // console.log(response.data)

     } catch(error){
        console.error("Error:", error);
     }
    }

    const generateConceptExplanation = async (question)=>{
      try{
        setErrormsg("");
        setExplanation(null);

        setIsLoading(true);
        setOpenLearnMoreDrawer(true);

        const response = await axiosInstance.post(
            API_PATHS.AI.GENERATE_EXPLANATION,
            {
                question,
            }
        );
         if(response.data){
            setExplanation(response.data);
         }
       } catch(error){
        setExplanation(null);
        setErrormsg("Failed to generate explanation,try again later");
        console.error("Error:", error);
       } finally{
        setIsLoading(false);
       }
    };

    const toggleQuestionPinStatus = async (questionId) => {
  setSessionData((prevSession) => {
    if (!prevSession) return prevSession;

    const updatedQuestions = prevSession.questions.map((q) =>
      q._id === questionId ? { ...q, isPinned: !q.isPinned } : q
    );

    const sortedQuestions = [...updatedQuestions].sort((a, b) => {
      if (a.isPinned === b.isPinned) return 0;
      return a.isPinned ? -1 : 1;
    });

    return { ...prevSession, questions: sortedQuestions };
  });

  try {
    await axiosInstance.post(API_PATHS.QUESTION.PIN(questionId));
  } catch (error) {
    console.log("Error", error);
    toast.error("Failed to pin/unpin question");
    setSessionData((prevSession) => {
      if (!prevSession) return prevSession;

      const rolledBackQuestions = prevSession.questions.map((q) =>
        q._id === questionId ? { ...q, isPinned: !q.isPinned } : q
      );

      const sortedRollback = [...rolledBackQuestions].sort((a, b) => {
        if (a.isPinned === b.isPinned) return 0;
        return a.isPinned ? -1 : 1;
      });

      return { ...prevSession, questions: sortedRollback };
    });
  }
};

    const uploadMoreQuestions = async()=>{
       try{
          setIsUpdateLoader(true);

          const aiResponse = await axiosInstance.post(
            API_PATHS.AI.GENERATE_QUESTIONS,
            {
              role:sessionData?.role,
              experience: sessionData?.experience,
              topicsToFocus:sessionData?.topicsToFocus,
              numberofQuestions:5,
            }
          );

          const generatedQuestions = aiResponse.data;
          // console.log(generatedQuestions)
          const response = await axiosInstance.post(
            API_PATHS.QUESTION.ADD_TO_SESSION,
            {
              sessionId,
              questions: generatedQuestions,
            }
          ) ;
        //  console.log(response.data)
          if(response.data){
            toast.success("Added more Q&A!!");
            fetchSessionDetailsById();
            console.log("ddd",response.data)
          }
       } catch(error){
          if(error.response && error.response.data.message){
           setErrormsg(error.response.data.message);
          }
          else{
             setErrormsg("Something went wrong. Please try again.");
          }
       } finally{
         setIsUpdateLoader(false);
       }
    }

    useEffect(()=>{
        if(sessionId){
            fetchSessionDetailsById();
        }
        return ()=>{};
    },[]);

 
    return (
          <DashboardLayout>
            {sessionData  && (
                <RoleInfoHeader
                role={sessionData.role}
                topicsToFocus={sessionData.topicsToFocus}
                experience={sessionData.experience}
                questions={sessionData.questions?.length}
                description={sessionData.description}
                lastUpdated={
                    sessionData.updatedAt
                    ? moment(sessionData.updatedAt).format("Do MMM YYYY")
                    : ""
                }
                />
                )}

          <div className="container mx-auto pt-4 pb-4 md:px-0 ml-3">
             <h2 className="text-lg font-semibold color-black pl-3">Interview Q & A</h2>
            <div className="grid grid-cols-13 gap-4 mt-5 mb-10">
               <div className={`col-span-12 ${
                openLearnMoreDrawer ? "md:col-span-7" : "md:col-span-8"
               }`}>
             <AnimatePresence />
               {sessionData?.questions?.map((data, index) => {
         return (
            <motion.div
            key={data._id || index}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{
                duration: 0.4,
                type: "spring",
                stiffness: 100,
                delay: index * 0.1,
                damping: 15,
            }}
            layout 
            layoutId={`question-${data._id || index}`} 
            >
       <>
      <QuestionCard
         question={data?.question}
         answer={data?.answer}
         onLearnMore={()=>
            generateConceptExplanation(data.question)   
         }
         isPinned={data?.isPinned}
         onTogglePin={()=> toggleQuestionPinStatus(data._id)}
         /> 

     {!isLoading && 
       sessionData?.questions?.length == index+1 && (
        <div className="flex items-center justify-center mt-5">
          <button
            className="flex items-center gap-3 text-sm text-white font-medium bg-black px-5 py-2 mr-2 rounded text-nowrap cursor-pointer"
            disabled={isLoading || isUpdateLoader}
            onClick={uploadMoreQuestions}
            >
            {isUpdateLoader ? (
              <SpinnerLoader />
            ) : (
              <LuListCollapse className="text-lg" />
            )} {" "} 
            Load More
            </button>
        </div>
       )} 
      </>    
    </motion.div>
            );
            })};
    <AnimatePresence />
                </div> 
            </div> 
        <div>
         <Drawer
         isOpen={openLearnMoreDrawer}
         onClose={() => setOpenLearnMoreDrawer(false)}
         title={!isLoading && explanation?.title}
         >
          {errorMsg && (
            <p className="flex gap-2 text-sm text-amber-600 font-medium">
              <LuCircleAlert className="mt-1" /> {errorMsg}
            </p>
          )}  
          {isLoading && <SkeletonLoader/>}
          {!isLoading && explanation && (
            <AIResponsePreview content={explanation?.explanation} />
          )}
         </Drawer>
        </div>    
          </div>
       </DashboardLayout>
    )
}

export default InterviewPrep;
