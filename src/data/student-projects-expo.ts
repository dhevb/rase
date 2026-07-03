/** Shiksha Mahakumbh 2026 Project Expo — programme data (Students project.pdf). */

import {
  DIVISION_A_THEMES,
  DIVISION_B_THEMES,
  DIVISION_C_THEMES,
  DIVISION_D_THEMES,
} from "./student-projects-expo-themes";

export type ProjectExpoDivisionId = "A" | "B" | "C" | "D";

export type ProjectExpoTheme = {
  code: string;
  name: string;
  focusArea: string;
  expectations: string;
  problemStatements: readonly [string, string, string, string, string, string, string, string, string, string];
};

export type ProjectExpoDivision = {
  id: ProjectExpoDivisionId;
  title: string;
  eligibility: string;
  scope: string;
  themes: ProjectExpoTheme[];
};

export type EvaluationCriterion = {
  criterion: string;
  weightage: string;
};

export type SubmissionRequirement = {
  material: string;
  description: string;
};

export type CompetitionStage = {
  stage: string;
  level: string;
  description: string;
};

export const PROJECT_EXPO_TITLE = "Shiksha Mahakumbh 2026 – Project Expo";

export const PROJECT_EXPO_SUBTITLE =
  "A Himachal-centric innovation and research platform for school students, undergraduates, and postgraduate scholars — district pre-events culminating at NIT Hamirpur (9–11 October 2026).";

export const PROJECT_EXPO_VISION = [
  "The Shiksha Mahakumbh 2026 – Project Expo is envisioned as a large-scale innovation, research and educational engagement platform aimed at nurturing creativity, problem-solving and youth-driven development aligned with the vision of Viksit Bharat 2047. The initiative creates a strong ecosystem where school students, undergraduate learners, postgraduate scholars, researchers, faculty members and local communities collectively participate in building innovative solutions for regional and national challenges.",
  "The Project Expo adopts a strong Himachal-centric approach by encouraging participants to focus on mountain sustainability, climate resilience, disaster management, rural livelihoods, indigenous knowledge systems, sustainable agriculture, water conservation, digital inclusion and community-based innovation. Through carefully curated themes and problem statements, the expo motivates participants to develop practical, research-oriented and socially impactful solutions addressing the unique geographical and developmental challenges of Himachal Pradesh.",
  "The initiative aligns with National Education Policy 2020 by promoting experiential learning, multidisciplinary education, innovation culture and skill-based development. A structured mentorship ecosystem — undergraduate mentors for school students and faculty mentors for higher-education teams — together with district-level pre-events and a state-level grand finale at NIT Hamirpur, ensures inclusive participation from remote, tribal and rural regions while connecting innovation with community development and the visions of Sabka Saath Sabka Vikas, Ek District Ek Product and Har Ghar Vikas.",
] as const;

export const PROJECT_EXPO_PDF = "/projects/shiksha-mahakumbh-2026-project-expo.pdf";

export const TEAM_COMPOSITION: Readonly<
  Record<ProjectExpoDivisionId, { division: string; teamSize: string }>
> = {
  A: { division: "Division A", teamSize: "1–3 Students" },
  B: { division: "Division B", teamSize: "1–3 Students" },
  C: { division: "Division C", teamSize: "1–3 Students" },
  D: { division: "Division D", teamSize: "1–3 Participants" },
};

export const MENTORSHIP_STRUCTURE: Readonly<
  { participantCategory: string; assignedMentors: string }[]
> = [
  {
    participantCategory: "Division A & B School Students",
    assignedMentors: "Undergraduate/Postgraduate Student Mentors",
  },
  {
    participantCategory: "Division C Undergraduate Teams",
    assignedMentors: "Faculty Mentors / Research Mentors",
  },
  {
    participantCategory: "Division D Postgraduate & Ph.D. Teams",
    assignedMentors: "Faculty Mentors / Subject Experts / Research Supervisors",
  },
];

export const COMPETITION_STAGES: CompetitionStage[] = [
  {
    stage: "Stage 1",
    level: "Pre Event Level Innovation Competitions",
    description:
      "Pre-events at school, college or district level across Himachal Pradesh. Projects evaluated division-wise and theme-wise by expert screening committees.",
  },
  {
    stage: "Stage 2",
    level: "Shortlisting & Selection",
    description:
      "Top-performing projects under each theme are shortlisted for the state-level grand finale based on innovation, relevance, creativity, feasibility, presentation and impact.",
  },
  {
    stage: "Stage 3",
    level: "State-Level Grand Finale",
    description:
      "Selected teams from all pre-events participate in the Main Event at National Institute of Technology Hamirpur.",
  },
];

export const PRE_EVENT_SELECTION = {
  themeWiseSelection: "Top 5–10 projects from each theme may be shortlisted",
  evaluationBasis:
    "Innovation, relevance, creativity, feasibility, presentation and impact",
  screeningCommittee:
    "Faculty members, domain experts, industry professionals and innovation mentors",
  qualification: "Shortlisted teams will qualify for the Main Event at NIT Hamirpur",
  generalCriteria: [
    { criterion: "Creativity and Ideas", weightage: "30%" },
    { criterion: "Understanding of Topic", weightage: "25%" },
    { criterion: "Presentation and Explanation", weightage: "25%" },
    { criterion: "Cleanliness and Effort", weightage: "10%" },
    { criterion: "Awareness and Social Message", weightage: "10%" },
  ] satisfies EvaluationCriterion[],
} as const;

export const EVALUATION_CRITERIA: Readonly<
  Record<ProjectExpoDivisionId, EvaluationCriterion[]>
> = {
  A: [
    { criterion: "Innovation and Ideas", weightage: "25%" },
    { criterion: "Understanding of Concept", weightage: "25%" },
    { criterion: "Presentation and Communication", weightage: "20%" },
    { criterion: "Practical Relevance", weightage: "15%" },
    { criterion: "Creativity and Design", weightage: "10%" },
    { criterion: "Social Awareness and Impact", weightage: "5%" },
  ],
  B: [
    { criterion: "Technical Innovation", weightage: "25%" },
    { criterion: "Prototype Functionality", weightage: "20%" },
    { criterion: "Problem Relevance and Impact", weightage: "15%" },
    { criterion: "Feasibility and Scalability", weightage: "15%" },
    { criterion: "Presentation and Documentation", weightage: "10%" },
    { criterion: "Sustainability and Social Impact", weightage: "10%" },
    { criterion: "Startup/Commercial Potential", weightage: "5%" },
  ],
  C: [
    { criterion: "Research Depth and Novelty", weightage: "25%" },
    { criterion: "Technical and Analytical Excellence", weightage: "20%" },
    { criterion: "Innovation and Original Contribution", weightage: "15%" },
    { criterion: "Practical Applicability and Deployment Potential", weightage: "15%" },
    { criterion: "Presentation and Research Documentation", weightage: "10%" },
    { criterion: "Policy/Societal/Environmental Impact", weightage: "10%" },
    { criterion: "Patent/Publications/Scalability Potential", weightage: "5%" },
  ],
  D: [],
};

export const SUBMISSION_REQUIREMENTS: Readonly<
  Record<ProjectExpoDivisionId, SubmissionRequirement[]>
> = {
  A: [
    { material: "Project Title", description: "Name of the project/activity" },
    {
      material: "Short Description",
      description: "Simple explanation of the idea (100–200 words)",
    },
    {
      material: "Chart / Poster / Model",
      description: "Any chart, drawing, craft, poster or simple activity display",
    },
    {
      material: "Student Details",
      description: "Name, class, school and teacher details",
    },
    { material: "Abstract", description: "Brief summary of project (200–300 words)" },
    {
      material: "Project Report",
      description: "Problem statement, objectives and outcomes",
    },
    { material: "PPT / Poster", description: "Presentation material for evaluation" },
    { material: "Survey / Activity / Model", description: "If applicable" },
    {
      material: "Student & School Details",
      description: "Participant and institution information",
    },
  ],
  B: [
    {
      material: "Project Abstract",
      description:
        "250–500 word summary covering problem statement, objectives and proposed solution",
    },
    {
      material: "Project Synopsis",
      description:
        "Detailed document including introduction, methodology, workflow, innovation aspect, expected outcomes and future scope",
    },
    {
      material: "PPT / Poster Presentation",
      description: "Presentation material for project demonstration and evaluation",
    },
    {
      material: "Prototype / Software / Model",
      description:
        "Functional prototype, application, dashboard, model or demonstration material (if applicable)",
    },
    {
      material: "Technical Documentation",
      description:
        "Architecture diagrams, workflow charts, implementation details, survey data, analytics or design process",
    },
    {
      material: "Research / Survey Data",
      description:
        "Field survey, case study, questionnaires or data analysis supporting the project (if applicable)",
    },
    {
      material: "Innovation Impact Note",
      description:
        "Brief note explaining uniqueness of the project, real-world usefulness, target beneficiaries and future implementation possibilities",
    },
  ],
  C: [
    {
      material: "Extended Research Abstract",
      description:
        "300–500 word research summary including objectives, methodology, innovation and expected contribution",
    },
    {
      material: "Research Paper / Concept Note",
      description:
        "Detailed research document containing literature review, research gap, methodology, analytical framework, implementation strategy and expected outcomes",
    },
    {
      material: "PPT / Research Poster",
      description: "Presentation material for technical and research evaluation",
    },
    {
      material: "Prototype / Framework Model / Simulation / Analytical System",
      description:
        "Research prototype, software platform, simulation system, analytical framework or deployable solution (if applicable)",
    },
    {
      material: "Technical & Research Documentation",
      description:
        "System design, architecture diagrams, algorithms, datasets, validation methods, analytics and implementation details",
    },
    {
      material: "Research Data / Field Study",
      description:
        "Experimental data, field surveys, datasets, simulations or case-study analysis supporting the work",
    },
    {
      material: "Publication / Patent Details",
      description:
        "Published papers, conference papers, patents, copyrights or IPR details (if available)",
    },
    {
      material: "Impact & Scalability Note",
      description:
        "Explanation of policy relevance, deployment potential, scalability and societal/environmental impact",
    },
  ],
  D: [
    {
      material: "Extended Research Abstract",
      description:
        "300–500 word research summary including objectives, methodology, innovation and expected contribution",
    },
    {
      material: "Research Paper / Concept Note",
      description:
        "Detailed research document containing literature review, research gap, methodology, analytical framework, implementation strategy and expected outcomes",
    },
    {
      material: "PPT / Research Poster",
      description: "Presentation material for technical and research evaluation",
    },
    {
      material: "Prototype / Framework Model / Simulation / Analytical System",
      description:
        "Research prototype, software platform, simulation system, analytical framework or deployable solution (if applicable)",
    },
    {
      material: "Technical & Research Documentation",
      description:
        "System design, architecture diagrams, algorithms, datasets, validation methods, analytics and implementation details",
    },
    {
      material: "Research Data / Field Study",
      description:
        "Experimental data, field surveys, datasets, simulations or case-study analysis supporting the work",
    },
    {
      material: "Publication / Patent Details",
      description:
        "Published papers, conference papers, patents, copyrights or IPR details (if available)",
    },
    {
      material: "Impact & Scalability Note",
      description:
        "Explanation of policy relevance, deployment potential, scalability and societal/environmental impact",
    },
  ],
};

export const PROJECT_EXPO_DIVISIONS: ProjectExpoDivision[] = [
  {
    id: "A",
    title: "Division A — School Level (Classes VI–VIII)",
    eligibility: "School Students (Classes VI–VIII)",
    scope:
      "Simple working models, charts, awareness activities, eco-friendly demonstrations, and low-cost innovations based on daily life and community problems.",
    themes: DIVISION_A_THEMES,
  },
  {
    id: "B",
    title: "Division B — School Level (Classes IX–XII)",
    eligibility: "School Students (Classes IX–XII)",
    scope:
      "Problem-solving projects, practical demonstrations, experimental models, surveys, field studies, and community-focused innovations.",
    themes: DIVISION_B_THEMES,
  },
  {
    id: "C",
    title: "Division C — Undergraduate Level",
    eligibility:
      "Undergraduate Students (B.Tech / B.Sc / BBA / B.Com / BA / BCA / Equivalent)",
    scope:
      "Functional prototypes, software applications, technical models, field-based studies, startup ideas and scalable technology-enabled solutions.",
    themes: DIVISION_C_THEMES,
  },
  {
    id: "D",
    title: "Division D — Postgraduate / Ph.D. Level",
    eligibility:
      "Postgraduate & Research Scholars (M.Tech / MBA / M.Sc / M.Com / MA / MCA / Ph.D. / Equivalent)",
    scope:
      "Research-based projects, advanced computational systems, deep-tech innovation, policy-integrated solutions and deployment-ready technologies.",
    themes: DIVISION_D_THEMES,
  },
];
