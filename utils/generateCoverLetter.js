// Simulating AI generation for MVP phase
export default async function generateCoverLetter({ role, company }) {
  const fullName = "John Doe";
  const userSkills = ["Product Management", "Agile", "Roadmapping", "Stakeholder Communication"];
  const experienceYears = 5;

  const letter = `
Dear Hiring Manager at ${company},

I am writing to express my strong interest in the ${role} position at your esteemed company. With over ${experienceYears} years of experience in product management, I have successfully led cross-functional teams, delivered customer-centric solutions, and driven business growth through innovative product strategies.

My key skills include ${userSkills.join(", ")}, and I have consistently demonstrated the ability to turn complex problems into actionable solutions.

I am excited about the possibility of contributing to ${company} and would welcome the opportunity to discuss how my background aligns with your team’s goals.

Thank you for your consideration.

Sincerely,  
${fullName}
`;

  return letter.trim();
}
