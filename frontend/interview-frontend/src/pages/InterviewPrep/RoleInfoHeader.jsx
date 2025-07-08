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
    <div className="bg-white relative overflow-hidden shadow-xl shadow-gray-200">
      <div className="container mx-auto px-4 md:px-10 border border-gray-300 bg-cyan-100/60">

        <div className="flex flex-col md:flex-row justify-between items-start relative z-10 min-h-[185px] max-h-[30px] px-4 md:px-10 pt-6 pb-4 space-y-6 md:space-y-0">
          
          <div className="flex flex-col justify-center w-full md:w-1/2">
            <h2 className="text-2xl md:text-3xl font-semibold mb-1">{role}</h2>
            <p className="text-sm md:text-base text-gray-700">{topicsToFocus}</p>

            <div className="flex flex-wrap items-center gap-3 mt-4">
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

          {/* Blob Background (optional to hide on very small screens) */}
          <div className="relative w-full md:w-1/2 h-36 md:h-1/2 mt-4 md:mt-0">
            <div className="absolute w-64 h-24  bg-lime-000 md:bg-lime-200 blur-[65px] animate-blob1 top-0 right-0" />
            <div className="absolute w-64 h-24  bg-teal-000 md:bg-teal-200 blur-[65px] animate-blob2 top-10 right-10" />
            <div className="absolute w-64 h-24 bg-cyan-000 md:bg-cyan-000 blur-[45px] animate-blob3 bottom-4 right-4" />
          </div>
        </div>

      </div>
    </div>
  );
};

export default RoleInfoHeader;
