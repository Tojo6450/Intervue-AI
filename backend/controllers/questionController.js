const express = require('express')
const Question = require("../models/Question");
const Session = require("../models/Session")

exports.addQuestionsToSession = async (req, res) => {
  try {
    const { sessionId, questions } = req.body;

    if (!sessionId || !questions || !Array.isArray(questions)) {
      return res.status(400).json({ message: "Invalid input data" });
    }

    const session = await Session.findById(sessionId);
    if (!session) {
      return res.status(400).json({ message: "Session not found" });
    }

    // Create new questions
    const createdQuestions = await Question.insertMany(
      questions.map((q) => ({
        session: sessionId,
        question: q.question,
        answer: q.answer,
      }))
    );

    // Push new question IDs into session
    session.questions.push(...createdQuestions.map((q) => q._id));
    await session.save();

    res.status(200).json({ success: true, questions: createdQuestions });
  } catch (error) {
    console.error("Error adding questions:", error);
    res.status(500).json({ message: "Server Error" });
  }
};


exports.togglePinQuestion = async (req,res) =>{
    try{
       const question = await Question.findById(req.params.id);
       
       if(!question){
        return res.status(404).json({success:false, message:"Question not found"});
       }

       question.isPinned = !question.isPinned;
       await question.save();

       res.status(200).json({success:true,question});
    }catch(err){
        res.status(500).json({message:"Server Error"})
    }
}



