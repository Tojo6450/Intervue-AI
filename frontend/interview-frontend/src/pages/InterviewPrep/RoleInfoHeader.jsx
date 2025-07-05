import React from "react";

const RoleInfoHeader = ({
  role,
  topicsToFocus,
  experience,
  questions,
  description,
  lastUpdated,
}) => {
  return (
    <div className="bg-white relative overflow-hidden">
      <div className="container mx-auto px-10 md:px-0 border-gray-500 border-1px">
      
        <div className="flex justify-between items-start relative z-10 h-[200px] px-10 pt-10 border-1px ">     
          <div className="flex flex-col justify-center ">
            <h2 className="text-3xl font-semibold mb-1">{role}</h2>
            <p className="text-sm text-gray-700">{topicsToFocus}</p>

            <div className="flex items-center gap-3 mt-4">
              <div className="text-[10px] font-semibold text-white bg-black px-3 py-1 rounded-full">
                Experience: {experience} {experience === "1" ? "Year" : "Years"}
              </div>

              <div className="text-[10px] font-semibold text-white bg-black px-3 py-1 rounded-full">
                {questions} Q&A
              </div>

              <div className="text-[10px] font-semibold text-white bg-black px-3 py-1 rounded-full">
                Last Updated: {lastUpdated}
              </div>
            </div>
          </div>

          {/* RIGHT: Background Blobs */}
          <div className="relative w-[200px] h-[200px]">
            <div className="absolute w-16 h-16 bg-lime-400 blur-[65px] animate-blob1 top-0 left-0" />
            <div className="absolute w-16 h-16 bg-teal-400 blur-[65px] animate-blob2 top-10 left-10" />
            <div className="absolute w-16 h-16 bg-cyan-400 blur-[45px] animate-blob3 bottom-4 right-4" />
            <div className="absolute w-16 h-16 bg-fuchsia-200 blur-[45px] animate-blob1 bottom-0 left-8" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleInfoHeader;
