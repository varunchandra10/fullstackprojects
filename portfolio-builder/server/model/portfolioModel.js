import mongoose from "mongoose";

const introSchema = new mongoose.Schema({
  userId:{type:mongoose.Schema.Types.ObjectId, ref: 'User'},
  welcomeText: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  caption: { type: String },
  description: { type: String, required: true },
});

const aboutSchema = new mongoose.Schema({
  userId:{type:mongoose.Schema.Types.ObjectId, ref: 'User'},
  lottieUrl: { type: String },
  description1: { type: String, required: true },
  description2: { type: String},
  skills: { type: Array, required: true },
});

const educationSchema = new mongoose.Schema({
  userId:{type:mongoose.Schema.Types.ObjectId, ref: 'User'},
  standard: { type: String, required: true },
  period: { type: String, required: true },
  collegeName: { type: String, required: true },
  course:{type:String},
  gpa: { type: String, required: true },
});

const experienceSchema = new mongoose.Schema({
  userId:{type:mongoose.Schema.Types.ObjectId, ref: 'User'},
  title: { type: String, required: true },
  period: { type: String, required: true },
  company: { type: String, required: true },
  description: { type: String, required: true },
});

const projectsSchema = new mongoose.Schema({
  userId:{type:mongoose.Schema.Types.ObjectId, ref: 'User'},
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
  link: { type: String, required: true },
  technologies: { type: Array, required: true },
});

const contactSchema = new mongoose.Schema({
  userId:{type:mongoose.Schema.Types.ObjectId, ref: 'User'},
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  age: { type: String, required: true },
  address: { type: String, required: true },
  resume: { type: String, required: true },
  github: { type: String, required: true },
  linkedIn: { type: String, required: true },
  instagram: { type: String, required: true },
});

export const Intro = mongoose.model("intros", introSchema);
export const About = mongoose.model("abouts", aboutSchema);
export const Education = mongoose.model("educations", educationSchema);
export const Experience = mongoose.model("experiences", experienceSchema);
export const Project = mongoose.model("projects", projectsSchema);
export const Contact = mongoose.model("contacts", contactSchema);
