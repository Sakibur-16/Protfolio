import type { EducationEntry } from "@/types/portfolio";

export const education: EducationEntry[] = [
  {
    id: "east-west-university",
    institution: "East West University",
    credential: "Bachelor of Science in Computer Science and Engineering",
    startDate: "October 2021",
    endDate: "September 2025",
    location: "Dhaka, Bangladesh",
    gpa: "3.56 / 4.00",
    eqfLevel: "EQF Level 6",
    coreAreas: [
      "Artificial Intelligence",
      "Machine Learning",
      "Image Processing & Brain–Computer Interfaces",
      "Blockchain in Green IT",
      "Computer Networks & Security",
      "Algorithms & Data Structures",
      "Software Engineering",
      "DBMS",
    ],
    activities: [
      "EWU Computer Programming Club (CoPC)",
      "Project Showcase — 1st Runner-up",
    ],
  },
  {
    id: "uttara-government-college",
    institution: "Uttara Government College",
    credential: "Higher Secondary Certificate (HSC), Science",
    startDate: "2017",
    endDate: "2019",
    location: "Dhaka, Bangladesh",
    coreAreas: [],
  },
  {
    id: "civil-aviation-school",
    institution: "Civil Aviation School & College",
    credential: "Secondary School Certificate (SSC), Science",
    startDate: "2015",
    endDate: "2017",
    location: "Dhaka, Bangladesh",
    coreAreas: [],
  },
];
