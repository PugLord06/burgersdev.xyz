export interface Grade {
  code: string;
  name: string;
  grade: string;
  status: string;
}

export const ACADEMIC_GRADES: Grade[] = [
  { code: "PRG371", name: "Software Engineering 1A", grade: "94%", status: "Distinction" },
  { code: "DBM371", name: "Database Systems & Administration (PostgreSQL)", grade: "91%", status: "Distinction" },
  { code: "SYS371", name: "Systems Analysis & Design Patterns", grade: "88%", status: "Distinction" },
  { code: "CLD371", name: "Cloud Computing & DevOps (AWS/Vercel)", grade: "90%", status: "Distinction" },
  { code: "PRJ371", name: "Year-End Capstone Project Integration", grade: "93%", status: "Distinction" },
  { code: "WAD271", name: "Web Application Development", grade: "96%", status: "Distinction" }
];
