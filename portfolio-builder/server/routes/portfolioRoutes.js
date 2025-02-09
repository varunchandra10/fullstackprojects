import express from "express";

const router = express.Router();

import {
  Intro,
  About,
  Education,
  Experience,
  Project,
  Contact,
} from "../model/portfolioModel.js";

//get all portfolio data
router.get("/get-portfolio-data/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const intros = await Intro.find({ userId });
    const abouts = await About.find({ userId });
    const educations = await Education.find({ userId });
    const experiences = await Experience.find({ userId });
    const projects = await Project.find({ userId });
    const contacts = await Contact.find({ userId });

    res.status(200).send({
      intros: intros[0],
      about: abouts[0],
      educations: educations,
      experiences: experiences,
      projects: projects,
      contacts: contacts[0],
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

// ============================================= INTRO ================================
router.post("/add-intro", async (req, res) => {
  try {
    const newIntro = new Intro(req.body);
    const savedIntro = await newIntro.save();
    res.status(200).send({
      data: savedIntro,
      success: true,
      message: "Intro added successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/update-intro", async (req, res) => {
  try {
    const intros = await Intro.findOneAndUpdate(
      { _id: req.body._id },
      req.body,
      { new: true }
    );
    res.status(200).send({
      data: intros,
      success: true,
      message: "Intro updated successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

// ============================================= ABOUT ================================
router.post("/add-about", async (req, res) => {
  try {
    const newAbout = new About(req.body);
    const savedAbout = await newAbout.save();
    res.status(200).send({
      data: savedAbout,
      success: true,
      message: "Intro added successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/update-about", async (req, res) => {
  try {
    const abouts = await About.findOneAndUpdate(
      { _id: req.body._id },
      req.body,
      { new: true }
    );
    res.status(200).send({
      data: abouts,
      success: true,
      message: "About updated successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

// ============================================= EDUCATION ================================

//add education
router.post("/add-education", async (req, res) => {
  try {
    const education = new Education(req.body);
    education.userId = req.body.userId;
    await education.save();
    res.status(200).send({
      data: education,
      success: true,
      message: "Education added successfully!!",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

//update education
router.post("/update-education", async (req, res) => {
  try {
    const education = await Education.findOneAndUpdate(
      { _id: req.body._id },
      req.body,
      { new: true }
    );
    res.status(200).send({
      data: education,
      success: true,
      message: "Eeducation updated successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

//delete experience
router.post("/delete-education", async (req, res) => {
  try {
    const education = await Education.findOneAndDelete({
      _id: req.body._id,
    });
    res.status(200).send({
      data: education,
      success: true,
      message: "Education deleted successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

// ============================================= EXPERIENCE ================================
//add experience
router.post("/add-experience", async (req, res) => {
  try {
    const experience = new Experience(req.body);
    experience.userId = req.body.userId;
    await experience.save();
    res.status(200).send({
      data: experience,
      success: true,
      message: "Experience added successfully!!",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

//update exprience
router.post("/update-experience", async (req, res) => {
  try {
    const experiences = await Experience.findOneAndUpdate(
      { _id: req.body._id },
      req.body,
      { new: true }
    );
    res.status(200).send({
      data: experiences,
      success: true,
      message: "Experience updated successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

//delete experience
router.post("/delete-experience", async (req, res) => {
  try {
    const experiences = await Experience.findOneAndDelete({
      _id: req.body._id,
    });
    res.status(200).send({
      data: experiences,
      success: true,
      message: "Experience deleted successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

// ============================================= PROJECT ================================
//add project
router.post("/add-project", async (req, res) => {
  try {
    const project = new Project(req.body);
    project.userId = req.body.userId;
    await project.save();
    res.status(200).send({
      data: project,
      success: true,
      message: "Project added successfully!!",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

//update project
router.post("/update-project", async (req, res) => {
  try {
    const projects = await Project.findOneAndUpdate(
      { _id: req.body._id },
      req.body,
      { new: true }
    );
    res.status(200).send({
      data: projects,
      success: true,
      message: "Project updated successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

//delete project
router.post("/delete-project", async (req, res) => {
  try {
    const projects = await Project.findOneAndDelete({
      _id: req.body._id,
    });
    res.status(200).send({
      data: projects,
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

// ============================================= CONTACT ================================
router.post("/add-contact", async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    const savedContact = await newContact.save();
    res.status(200).send({
      data: savedContact,
      success: true,
      message: "Contact added successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

//update contact
router.post("/update-contact", async (req, res) => {
  try {
    const contact = await Contact.findOneAndUpdate(
      { _id: req.body._id },
      req.body,
      { new: true }
    );
    res.status(200).send({
      data: contact,
      success: true,
      message: "Intro updated successfully",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
