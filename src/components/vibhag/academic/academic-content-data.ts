/** Auto-consolidated Phase 3 split fix */

export const awardCategories = [
  {
    title: "Research Publications",
    details: [
      "Journal Name",
      "Paper Title",
      "Impact Factor",
      "Indexing (Scopus / SCI / UGC Care / etc.)",
      "Year of Publication",
    ],
  },
  {
    title: "Books & Book Chapters",
    details: [
      "Book Title / Chapter Title",
      "Publisher Name",
      "ISBN Number",
      "Year of Publication",
    ],
  },
  {
    title: "Patents",
    details: [
      "Patent Title",
      "Patent Number",
      "Patent Office",
      "Status (Filed / Published / Granted)",
      "Date of Grant (if applicable)",
    ],
  },
  {
    title: "Startups / Innovations",
    details: [
      "Name of Startup / Innovation",
      "Brief Description",
      "Registration Details (if any)",
      "Impact / Outcome",
    ],
  },
  {
    title: "Research Projects / Grants",
    details: [
      "Project Title",
      "Funding Agency",
      "Grant Amount",
      "Duration",
      "Status (Ongoing / Completed)",
    ],
  },
];

export const bestPracticeCategories = [
  {
    title: "Academic Innovations",
    icon: "🎓",
    items: [
      "Experiential Learning Models",
      "Multidisciplinary Teaching Approaches",
      "Outcome-Based Education",
    ],
  },
  {
    title: "EdTech Integration",
    icon: "💻",
    items: [
      "AI & Digital Tools in Teaching",
      "Smart Classrooms & LMS",
      "Blended & Online Learning Models",
    ],
  },
  {
    title: "Community & Social Impact",
    icon: "🌱",
    items: [
      "Rural & Tribal Education Initiatives",
      "Inclusive Education Practices",
      "Women Empowerment through Education",
    ],
  },
  {
    title: "Institutional Excellence",
    icon: "🏫",
    items: [
      "Governance & Leadership Models",
      "School/University Transformation Initiatives",
      "Quality Assurance & Accreditation Practices",
    ],
  },
  {
    title: "Sustainability & Environment",
    icon: "🌍",
    items: [
      "Green Campus Initiatives",
      "Water Conservation & Waste Management",
      "Climate Awareness Programs",
    ],
  },
  {
    title: "Indian Knowledge System (IKS)",
    icon: "🕉",
    items: [
      "Gurukul-based Learning Models",
      "Value-based Education Practices",
      "Integration of Bharatiya Knowledge Traditions",
    ],
  },
];

export const CONCLAVE_OVERALL_LEADERSHIP = {
  chair: "Dr. Praveen Kumar Sharma, Plaksha University, Mohali",
  coChairs: [
    "Prof. Y. D. Sharma, NIT Hamirpur",
    "Dr. Sujeet Thakur, IIT Delhi",
    "Dr. Nitya Sharma, IKGPTU, Jalandhar",
  ],
} as const;

export const SMK_6_PROGRAMME_LEADERSHIP = {
  sodhankur: {
    chair: "Dr. Shiksha Sharma, Member DHE",
  },
  studentProject: {
    chair: "Dr. Narinder Singh Jassal, CSIR-CSIO, Chandigarh",
    coChairs: [
      "Dr. Krishna Pandey, Kurukshetra University",
      "Sh. Bikash Kumar, COO, SavantX Technology",
    ],
  },
  panelDiscussion: {
    coordinator: "प्रो. अवनीश वर्मा +919416481652",
    coordinatorEn: "Prof. Avnesh Verma",
    focus:
      "Three official Panel Discussion sessions at NIT Hamirpur, 9–11 October 2026, प्रातः 9:30 से 10:45.",
  },
  awards: {
    chair: "Prof. Vishal Sharma, Punjab University, Chandigarh",
    coChair: "Prof. Ravi Prakash, CBLU, Bhiwani",
  },
  cultural: {
    chair: "Smt. Meenu, Treasurer, DHE",
    coChair: "Dr. Rajeev Kumar, NIT Hamirpur",
  },
  exhibitions: {
    chair: "Sh. Sanjay Soni, Vidya Bharti Haryana",
    coChair: "Dr. Shiksha Sharma, DHE",
  },
  otherProgrammes: {
    chair: "Dr. Jitesh Pandey, Govt. of Punjab",
    coChair: "Dr. Pardeep Kumar, NIT Hamirpur",
    items: [
      "Sharing of Best Practices",
      "Pitching Sessions",
      "Brand Promotion",
      "PR Opportunities",
      "Signing of MOUs",
      "International Conference",
    ],
  },
} as const;

export const brochureExhibitionAreas = [
  "Innovation & Research Exhibition",
  "EdTech & Skill Development Exhibition",
  "Student Innovation Pavilion",
  "Community Development Models",
] as const;

export const SMK_6_CONCLAVE_POSTER_SIZE = { width: 1500, height: 1875 } as const;

export const SMK_6_SHODHANKUR_OFFICIAL = {
  poster: {
    src: "/images/programmes/smk-6-shodhankur.webp",
    alt: "Shiksha Mahakumbh 6.0 Chhatra Shodh Patrika Shodhankur official poster",
    ...SMK_6_CONCLAVE_POSTER_SIZE,
  },
  date: "10 October 2026",
  time: "2:30 PM to 5:30 PM",
  venue: "NIT Hamirpur, Himachal Pradesh",
  sessionNote:
    "Shodhankur will commence at 3:00 PM. Participants are requested to attend the Inaugural/Discourse Session scheduled at 11:00 AM as well.",
  submissionDeadline: "30 September",
  contact: "डॉ शिक्षा शर्मा – +91 98788 90303",
  eligibility: "कक्षा IX–X एवं XI–XII के विद्यार्थी",
  purpose: [
    "Shodhankur विद्यार्थियों में Research Aptitude, Scientific Temperament, Creativity एवं Problem-Solving Skills विकसित करने की एक राष्ट्रीय पहल है।",
    "यह विद्यार्थियों को अपने Research Ideas, Innovative Projects एवं Academic Articles को प्रस्तुत कर राष्ट्रीय स्तर पर पहचान बनाने का मंच प्रदान करता है।",
  ],
  specialNotes: [
    "उपर्युक्त विषयों से संबंधित सफलतापूर्वक पूर्ण किए गए Innovative Projects पर आधारित Articles भी प्रस्तुत किए जा सकते हैं।",
    "चयनित शोध पत्रों को कॉन्क्लेव में प्रस्तुत करने का अवसर मिल सकता है।",
    "चयनित शोध पत्र शोधांकुर पत्रिका में प्रकाशित किए जाएंगे।",
  ],
} as const;

export const SMK_6_PROJECT_EXPO_OFFICIAL = {
  poster: {
    src: "/images/programmes/smk-6-project-expo.webp",
    alt: "Shiksha Mahakumbh 6.0 Project Expo 2026 official poster",
    ...SMK_6_CONCLAVE_POSTER_SIZE,
  },
  dates: "9–10 October 2026",
  time: "9:00 AM to 5:30 PM",
  venue: "NIT Hamirpur, Himachal Pradesh",
  tagline: "FROM IDEAS TO IMPACT — National Platform for Student Innovation & Research",
  coordinators: [
    "Dr. Ashwini Rana: +91 70186 54566",
    "Mr. Bikash Kumar: +91 74910 14167",
    "Dr. Gaurav, DST, Delhi: 90339 25400",
    "Dr. Rahul: +91 97360 33342",
  ],
  mentorshipNote:
    "Projects selected by experts may receive Mentoring & Training Support through PRISM / PAT @ CSIR-CSIO Chandigarh",
  cohorts: [
    "SCHOOL — Classes IX–XII · Team: 1–3 Students · Innovation • Creativity • Community Impact",
    "UNDERGRADUATE — UG Students · Team: 1–3 Students · Prototype • Innovation • Solutions",
    "PG / Ph.D. — PG & Research Scholars · Team: 1–3 Students · Research • Technology • Excellence",
  ],
  exploreThemes: [
    "Agriculture & Horticulture",
    "Climate Resilience & Disaster Risk Reduction",
    "AI, Intelligent Systems & Robotics",
    "Water Conservation • Renewable Energy • Environment",
    "Rural Livelihoods • Indigenous Knowledge • Community Innovation",
  ],
  studentGains: [
    "Opportunity to interact with Scientists & Experts",
    "Exposure / Training opportunity at CSIR-CSIO Chandigarh",
    "Certificates & Recognition",
  ],
} as const;

export const SMK_6_PANEL_POSTER_SIZE = { width: 819, height: 1024 } as const;

export const SMK_6_PANEL_DISCUSSION_OFFICIAL = {
  programmeTitle: "Panel Discussion",
  editionLine: "शिक्षा महाकुंभ 2026 · षष्ठम संस्करण",
  venue: "NIT Hamirpur, Himachal Pradesh",
  time: "प्रातः 9:30 से 10:45",
  coordinator: {
    nameHi: "प्रो. अवनीश वर्मा",
    phone: "+919416481652",
  },
} as const;

export const SMK_6_PANEL_DISCUSSIONS = [
  {
    id: "adhyatmik-bharat",
    title: "आध्यात्मिक भारत, विकसित भारत",
    date: "9 October 2026",
    time: SMK_6_PANEL_DISCUSSION_OFFICIAL.time,
    venue: SMK_6_PANEL_DISCUSSION_OFFICIAL.venue,
    moderator: {
      name: "Dr. Thakur SKR",
      designation: "Sr. Scientist, ISRO",
    },
    panelists: [
      { name: "Shri Banwir", designation: "Social Worker" },
      { name: "Dr. Vir Singh Rangda", designation: "Social Worker" },
      { name: "Prof. Laxmidhar Behera", designation: "Director, IIT Mandi" },
      {
        name: "Swami Tanmahimananda Ji Maharaj",
        designation: "Secretary, Ramakrishna Mission, Shimla",
      },
      { name: "Dr. Archana Santosh Nanoty", designation: "Registrar, NIT Hamirpur" },
    ],
    poster: {
      src: "/images/programmes/smk-6-panel-discussion-01-adhyatmik-bharat.webp",
      alt: "Shiksha Mahakumbh 6.0 Panel Discussion official poster — आध्यात्मिक भारत, विकसित भारत, 9 October 2026, NIT Hamirpur",
      ...SMK_6_PANEL_POSTER_SIZE,
    },
  },
  {
    id: "vigyanmay-bharat",
    title: "विज्ञानमय भारत - विकसित भारत",
    date: "10 October 2026",
    time: SMK_6_PANEL_DISCUSSION_OFFICIAL.time,
    venue: SMK_6_PANEL_DISCUSSION_OFFICIAL.venue,
    moderator: {
      name: "Prof. Avnesh Verma",
      designation: "Kurukshetra University",
    },
    panelists: [
      { name: "Dr. Sikander Kumar", designation: "MP (RS), Himachal Pradesh" },
      { name: "Dr. Rajneesh Arora", designation: "Former VC, IKGPTU" },
      { name: "Prof. Rajeev Ahuja", designation: "Director, IIT Ropar" },
      { name: "Dr. Thakur SKR", designation: "Sr. Scientist, ISRO" },
      { name: "Dr. Chaman Chandel", designation: "Sr. Scientist, DRDO" },
    ],
    poster: {
      src: "/images/programmes/smk-6-panel-discussion-02-vigyanmay-bharat.webp",
      alt: "Shiksha Mahakumbh 6.0 Panel Discussion official poster — विज्ञानमय भारत - विकसित भारत, 10 October 2026, NIT Hamirpur",
      ...SMK_6_PANEL_POSTER_SIZE,
    },
  },
  {
    id: "surakshit-bharat",
    title: "सुरक्षित भारत - विकसित भारत",
    date: "11 October 2026",
    time: SMK_6_PANEL_DISCUSSION_OFFICIAL.time,
    venue: SMK_6_PANEL_DISCUSSION_OFFICIAL.venue,
    moderator: {
      name: "Dr. Thakur SKR",
      designation: "Sr. Scientist, ISRO",
    },
    panelists: [
      { name: "Dr. Indresh Kumar", designation: "Social Worker" },
      {
        name: "Major Anurag Singh Thakur",
        designation: "MP (LS) and Former Union Minister",
      },
      { name: "Prof. (Dr.) K. G. Suresh", designation: "Director, India Habitat Centre" },
      { name: "Adv. Ashwini Upadhay", designation: "PIL Man of Bharat" },
      { name: "Ms. Sonal Goel, IAS", designation: "Secretary, Govt of Tripura" },
    ],
    poster: {
      src: "/images/programmes/smk-6-panel-discussion-03-surakshit-bharat.webp",
      alt: "Shiksha Mahakumbh 6.0 Panel Discussion official poster — सुरक्षित भारत - विकसित भारत, 11 October 2026, NIT Hamirpur",
      ...SMK_6_PANEL_POSTER_SIZE,
    },
  },
] as const;

export const CONCLAVE_BEST_PRACTICES_NOTE =
  "Along with submissions related to the respective Conclave themes, participants are also encouraged to submit write-ups on Best Practices, successful experiments, transformative initiatives, and inspiring success stories that have contributed to positive social change.";

export const conclaves = [
  {
    id: "vcs-directors",
    title: "VCs & Directors Conclave",
    titleHi: "कुलपति एवं निदेशक अधिवेशन",
    icon: "🎓",
    participants:
      "Vice-Chancellors, Directors, Academic Thinkers, Academic Leader, NEP Implementers",
    focus: "Systemic Policy Transformation, Institutional Autonomy, Global Benchmarks",
    output: "Vision Charter for Higher Education @2047",
    theme: "Practical Innovation in Education System",
    coordinators: [
      "Dr. Jatinder Garg, CUHP, Dharamshala",
      "Dr. Samsher Singh, AB College, Pathankot",
      "Sh. Sanjay Jamwal, NIT Hamirpur",
      "Sh. Vipin Kumar, NIT Hamirpur",
    ],
    contactCoordinators: [
      "Dr. Samsher Singh: +91 94632 31250",
      "Dr. Jatinder Garg: +91 95019 56000",
    ],
    date: "9 October 2026",
    time: "2:30 PM to 5:30 PM",
    venue: "NIT Hamirpur, Himachal Pradesh",
    sessionNote:
      "The Conclave will commence at 3:00 PM. Participants are requested to attend the Inaugural/Discourse Session scheduled at 11:00 AM as well.",
    poster: {
      src: "/images/conclaves/smk-6-conclave-01-vcs-directors.webp",
      alt: "Shiksha Mahakumbh 6.0 VCs & Directors Conclave official poster",
      ...SMK_6_CONCLAVE_POSTER_SIZE,
    },
  },
  {
    id: "principal-outstanding-teacher",
    title: "Principal and Outstanding Teacher Conclave",
    titleHi: "प्राचार्य एवं उत्कृष्ट शिक्षक अधिवेशन",
    icon: "🏫",
    participants: "Principals, Excellent Teachers and Distinguished Educationists.",
    focus:
      "Holistic Development of Education; Village/City and industry partnership; Excellence in Academia",
    output: "Model School Leadership & Teaching Excellence Toolkit",
    theme: "Innovative learning with Ethical Values",
    coordinators: [
      "Prof. Anju Batta Sehgal",
      "Dr Kuldeep Sharma",
      "Dr Raman Sharma",
      "Dr. Babita, Retd. Principal",
      "Prof Gaurav Tejpal, AGC Amritsar",
      "Mr Gaurav Sharma, NIT Hamirpur",
    ],
    contactCoordinators: [
      "Prof. Anju Batta Sehgal: +91 94184 87009",
      "Dr Kuldeep Sharma: +91 94187 80275",
      "Dr Raman Sharma: +91 88943 77363",
    ],
    date: "10 October 2026",
    time: "2:30 PM to 5:30 PM",
    venue: "Mini Auditorium, NIT Hamirpur, Himachal Pradesh",
    sessionNote:
      "The Conclave will commence at 2:00 PM. Participants are requested to attend the Inaugural/Discourse Session scheduled at 11:00 AM as well.",
    keynote: "Adv. Ashwini Upadhyay, PIL Man of Bharat",
    extraNotes: [
      "Key attractions: Deliberations on Academic Excellence and Challenges; NEP: Implementation and outcomes; Innovative Teaching Strategies; Learning by Critical Thinking; Best Practices in Education.",
      "Vision: Transforming education for future empowerment — to nurture integrity, responsibility, empathy and respect; to inspire curiosity, creativity and critical thinking.",
    ],
    poster: {
      src: "/images/conclaves/smk-6-conclave-02-principal-outstanding-teacher.webp",
      alt: "Shiksha Mahakumbh 6.0 Principal and Outstanding Teacher Conclave official poster",
      ...SMK_6_CONCLAVE_POSTER_SIZE,
    },
  },
  {
    id: "scientists-research-scholars",
    title: "Scientists & Research Scholars Conclave",
    titleHi: "वैज्ञानिक एवं शोधार्थी अधिवेशन",
    icon: "🔬",
    participants:
      "Scientists, Research Scholars, PhD Candidates, Innovators, R&D Professionals",
    focus: "Interdisciplinary R&D, Patent Ecosystem, Bharatiya Knowledge",
    output: "Research-to-Policy Action Guide",
    theme: "Lab to the Last Mile",
    coordinators: [
      "Dr. Pooja, CSIR - CSIO, Chandigarh",
      "Dr. Chaman Chandel, DRDO, Chandigarh",
      "Dr. Neeraj Marwaha, Sri Sai University, Palampur",
      "Dr. Varun, NIT Hamirpur",
      "Dr. Tollari Ganesh, NIT Hamirpur",
    ],
    contactCoordinators: ["डॉ सुजीत ठाकुर: +91 9310339103"],
    date: "9 October 2026",
    time: "2:30 PM to 5:30 PM",
    venue: "NIT Hamirpur, Himachal Pradesh",
    sessionNote:
      "The Conclave will commence at 3:00 PM. Participants are requested to attend the Inaugural/Discourse Session scheduled at 11:00 AM as well.",
    extraNotes: ["RESEARCH • INNOVATE • IMPACT"],
    poster: {
      src: "/images/conclaves/smk-6-conclave-03-scientists-research-scholars.webp",
      alt: "Shiksha Mahakumbh 6.0 Scientists & Research Scholars Conclave official poster",
      ...SMK_6_CONCLAVE_POSTER_SIZE,
    },
  },
  {
    id: "startup-leaders-entrepreneurs",
    title: "Startup Leaders / Entrepreneurs Conclave",
    titleHi: "स्टार्टअप लीडर्स / उद्यमी अधिवेशन",
    icon: "🚀",
    participants:
      "Startup Founders, Entrepreneurs, Business Leaders, Innovation Mentors",
    focus: "Entrepreneurship Promotion through Education",
    output: "Student Entrepreneurship Development Framework",
    theme: "Mitigation of Unemployment through Entrepreneurship",
    coordinators: [
      "Prof Dipankar, IIT Mandi",
      "Dr. M. S. Bedi",
      "Dr. Sukatar Singh, Khalsa College Amritsar",
      "Dr. Pamita Awasthi, NIT Hamirpur",
      "Sh. Bikash Kumar, COO, SavantX Technologies",
    ],
    contactCoordinators: ["Dr. M. S. Bedi: +91 94780 98076"],
    sessionChair:
      "Prof. Manikant Paswan, Director, SLIET Punjab | Prof Dipankar, IIT Mandi",
    date: "10 October 2026",
    time: "2:30 PM to 5:30 PM",
    venue: "NIT Hamirpur, Himachal Pradesh",
    sessionNote:
      "The Conclave will commence at 3:00 PM. Participants are requested to attend the Inaugural/Discourse Session scheduled at 11:00 AM as well.",
    poster: {
      src: "/images/conclaves/smk-6-conclave-04-startup-leaders-entrepreneurs.webp",
      alt: "Shiksha Mahakumbh 6.0 Startup Leaders / Entrepreneurs Conclave official poster",
      ...SMK_6_CONCLAVE_POSTER_SIZE,
    },
  },
  {
    id: "csr-ngo",
    title: "CSR & NGO Conclave",
    titleHi: "सीएसआर एवं एनजीओ अधिवेशन",
    icon: "🤝",
    participants:
      "CSR Leaders, NGO Representatives, Philanthropic Foundations, Tribal Education Activists",
    focus: "Equitable Access, Girls' Education, Underserved Communities",
    output: "Inclusive Education Investment Charter",
    theme: "Society of Knowledge, Obedience with Practical Responsibility",
    coordinators: [
      "Prof. Kulbhushan Chandel, HPU, Shimla",
      "Dr. Suneel Dubey, IUNC",
      "Dr. Mrityunjay Singh, IIIT Una",
      "Sh. Robin, Environment Activist",
      "Sh. Sumit Gupta, Entrepreneur",
      "Sh. Mandeep Tiwari, Entrepreneur",
      "Dr. Rinshu, NIT Hamirpur",
      "Dr. Shampy Kamboj, NIT Hamirpur",
    ],
    contactCoordinators: ["डॉ. प्रवीण कुमार शर्मा: +91 62902 60756"],
    date: "10 October 2026",
    time: "2:30 PM to 5:30 PM",
    venue: "NIT Hamirpur, Himachal Pradesh",
    sessionNote:
      "The Conclave will commence at 3:00 PM. Participants are requested to attend the Inaugural/Discourse Session scheduled at 11:00 AM as well.",
    poster: {
      src: "/images/conclaves/smk-6-conclave-05-csr-ngo.webp",
      alt: "Shiksha Mahakumbh 6.0 CSR & NGO Conclave official poster",
      ...SMK_6_CONCLAVE_POSTER_SIZE,
    },
  },
  {
    id: "media",
    title: "Media Conclave",
    titleHi: "मीडिया अधिवेशन",
    icon: "📢",
    participants:
      "Journalists, Edufluencers, Digital Content Creators, Fact-checkers, Media Professionals",
    focus: "Responsible Storytelling, Fact-Based Discourse, Positive Narratives",
    output: "Shiksha Media Ethics & Impact Code",
    theme: "Visualize the World with the Power of Truth",
    coordinators: [
      "Prof. Bala Lakhendra, BHU",
      "Adv. Aarti Sharma, Member, DHE",
      "Dr. Amit Kansal, Independent Director, NHPC",
      "Dr. Garima Bhatti, Rawal College, Faridabad",
      "Dr. Rakesh Sharma, NIT Hamirpur",
      "Dr. Amit Kaul, NIT Hamirpur",
    ],
    contactCoordinators: [
      "प्रो बाला लखेंद्र: +91 79857 35729",
      "अधिवक्ता आरती शर्मा: +91 85279 33391",
    ],
    keynote: "प्रो. (डॉ.) के.जी. सुरेश, निदेशक, इंडिया हैबिटेट सेंटर",
    date: "10 October 2026",
    time: "2:30 PM to 5:30 PM",
    venue: "NIT Hamirpur, Himachal Pradesh",
    sessionNote:
      "The Conclave will commence at 3:00 PM. Participants are requested to attend the Inaugural/Discourse Session scheduled at 11:00 AM as well.",
    poster: {
      src: "/images/conclaves/smk-6-conclave-06-media.webp",
      alt: "Shiksha Mahakumbh 6.0 Media Conclave official poster",
      ...SMK_6_CONCLAVE_POSTER_SIZE,
    },
  },
  {
    id: "talented-students",
    title: "Talented Students Conclave",
    titleHi: "प्रतिभाशाली विद्यार्थी अधिवेशन",
    icon: "🌟",
    participants:
      "Class 9 to 12 students with more than 90% marks; State-level or above participation in sports, art & culture, or digital innovation; noteworthy social service and social transformation work",
    focus:
      "Academic Excellence; Sports & Physical Activities; Art & Culture; Digital Activity & Innovation; Social Service & Social Transformation",
    output: "National Talent Recognition & Mentorship Pathway",
    theme: "Nurturing Excellence for Viksit Bharat",
    coordinators: [
      "Dr. Jyoti Khanna",
      "Dr. Pradeep",
    ],
    contactCoordinators: [
      "Dr. Jyoti Khanna: +91 95010 20568",
      "Dr. Pradeep: +91 89981 05390",
    ],
    organizingTeam: "Divyanshu Garg | Devanshi Sharma | Hardik Singla",
    keynote: "Sri K. Vasudeva Rao, President, Bhaktivedanta Institute, Alumni, IIT Kanpur",
    registrationWindow: "15 September to 25 September",
    date: "10 October 2026",
    time: "2:30 PM to 5:30 PM",
    venue: "NIT Hamirpur, Himachal Pradesh",
    extraNotes: [
      "All students are requested to register online to participate in Shiksha Mahakumbh. Submit your projects and achievements online.",
      "Special: You can submit your suggestions or original solution to any problem for the creation of a developed India i.e. Sujalam, Sufalam, Malayaj Sheetalam by 2047 in 1800 to 2000 words. Selected research papers will be published in the Shodhankur Journal.",
    ],
    poster: {
      src: "/images/conclaves/smk-6-conclave-07-talented-students.webp",
      alt: "Shiksha Mahakumbh 6.0 Talented Students Conclave official poster",
      ...SMK_6_CONCLAVE_POSTER_SIZE,
    },
  },
  {
    id: "defence-security",
    title: "Defence and Security Conclave",
    titleHi: "रक्षा एवं सुरक्षा अधिवेशन",
    icon: "🛡️",
    participants:
      "Defence Personnel, Defence Scientists, Strategic Experts, NCC, Defence Industry & Security Professionals",
    focus:
      "National Security, Defence Innovation, Cyber Security, Strategic Leadership & Indigenous Technologies",
    output: "National Framework for Defence Awareness & Strategic Leadership",
    theme:
      "Nation First: Strengthening Security through Innovation & Strategic Leadership",
    coordinators: [
      "Major General Suresh Kumar Khajuria (Retd.), President, Vidya Bharti, Punjab",
      "Prof. Pawan Kumar Sharma, NIT Hamirpur",
      "Dr. Vivek Sharma, NIT Hamirpur",
      "Dr. Vinod Sharma, NIT Hamirpur",
    ],
  },
];

export const culturalHighlights = [
  "Folk Performances showcasing the rich cultural heritage of Himachal Pradesh",
  "Classical & Contemporary Dance Performances",
  "Theme-based Skits & Dramatic Presentations",
  "Eco-conscious Performances aligned with sustainability",
  "Music & Creative Expressions by students and artists",
];

export const culturalObjectives = [
  "Promote Indian culture and heritage",
  "Encourage creative expression among youth",
  "Integrate education with cultural values",
  "Highlight sustainability and harmony with nature through art",
];

export const culturalRecognitionBenefits = [
  "Certificates of Participation",
  "Special Recognition for outstanding performances",
  "Opportunity to perform on a national stage",
  "Exposure to academicians, policymakers, and cultural leaders",
];

export const evaluationCriteria = [
  "Innovation & Originality",
  "Measurable Impact",
  "Sustainability",
  "Replicability",
  "Alignment with National Education Vision",
];

export const examFeatures = [
  "Conducted within schools (Offline/Online mode)",
  "Objective-based assessment",
  "Focus on conceptual understanding and application",
  "Class-wise question papers",
];

export const exhibitionBenefits = [
  "Participation Certificates",
  "Recognition for outstanding exhibits",
  "Networking with academicians, policymakers, and industry experts",
  "National-level exposure",
];

export const exhibitionObjectives = [
  "Provide a platform to showcase innovation and creativity",
  "Highlight best practices in education and society",
  "Promote collaboration among institutions and stakeholders",
  "Integrate culture, science, and sustainability",
];

export const exhibitionParticipants = [
  "School & College Students",
  "Universities & Institutions",
  "Research Labs & Innovators",
  "NGOs & Organizations",
  "State Representatives",
  "Cultural Groups",
];

export const exhibitionSegments = [
  {
    title: "Student Projects Zone",
    icon: "🚀",
    description:
      "Innovative models and ideas by school & college students",
  },
  {
    title: "University & Institutional Stalls",
    icon: "🎓",
    description:
      "Showcasing academic excellence, research, and initiatives",
  },
  {
    title: "Laboratory & Research Displays",
    icon: "🔬",
    description:
      "Live demonstrations of technologies and experiments",
  },
  {
    title: "Best Practices Pavilion",
    icon: "💡",
    description:
      "Successful educational and social models",
  },
  {
    title: "Cultural Theme Stalls",
    icon: "🎭",
    description:
      "Exhibits reflecting Indian traditions and theme-based concepts",
  },
  {
    title: "State Representation Zone",
    icon: "🌍",
    description:
      "Showcasing diverse culture, education models, and innovations from different states",
  },
  {
    title: "Organizations & Institutions Stalls",
    icon: "🤝",
    description:
      "Participation from educational bodies, NGOs, and social organizations",
  },
  {
    title: "Host Institution Showcase",
    icon: "🏫",
    description:
      "NIT Hamirpur & Local Institutions",
  },
];

export const olympiadBenefits = [
  "Certificates for all participants",
  "Merit Certificates for top performers",
  "Top achievers felicitated at Shiksha Mahakumbh 6.0",
  "National-level recognition",
];

export const olympiadCategories = [
  {
    title: "DHE English Olympiad",
    icon: "🇬🇧",
    description:
      "Enhancing language proficiency, comprehension, grammar, and communication skills.",
  },
  {
    title: "DHE Maths Olympiad",
    icon: "🔢",
    description:
      "Strengthening analytical thinking, problem-solving, and conceptual understanding in mathematics.",
  },
  {
    title: "DHE Tech Olympiad",
    icon: "💻",
    description:
      "Promoting digital literacy, logical reasoning, and technology awareness among students.",
  },
];

export const olympiadObjectives = [
  "Identify and encourage academic excellence among students",
  "Promote analytical thinking and conceptual clarity",
  "Strengthen subject-wise competencies",
  "Provide a national recognition platform",
  "Build a strong academic foundation for future learning",
];

export const participationGroups = [
  "School & College Students",
  "Cultural Teams & Institutions",
  "Independent Performers",
  "Folk Artists (Local Representation)",
];

export const participationSteps = [
  "School Registration",
  "Student Enrollment",
  "Conduct of Olympiad in School",
  "Evaluation & Result Compilation",
  "Declaration of Results",
];

export const patrikaBenefits = [
  "Research & Scientific Writing Skills",
  "Expert Mentorship",
  "Publication Opportunity",
  "Awards & Recognition",
  "Certificates & Research Exposure",
];

export const patrikaSections = [
  {
    title: "Section 1",
    icon: "📗",
    classes: "Classes: 9th – 10th",
    focus:
      "Basic research, observations, project documentation",
  },
  {
    title: "Section 2",
    icon: "📘",
    classes: "Classes: 11th – 12th",
    focus:
      "Advanced research, analytical studies, innovative ideas",
  },
];

export const patrikaThemes = [
  "Science & Innovation",
  "Education, AI & Technology",
  "Indian Knowledge Systems (IKS)",
  "Environment & Sustainability",
  "Innovation & Entrepreneurship",
  "Viksit Bharat 2047",
];

export const projectBenefits = [
  "Certificates for all participants",
  "Awards for top projects",
  "Opportunity to present before national-level experts",
  "Mentorship & institutional support for selected projects",
  "Featured on official website & exhibitions",
];

export const projectThemes = [
  "Science & Innovation",
  "AI, Robotics & Emerging Technologies",
  "Environment & Sustainability",
  "Health & Well-being",
  "Agriculture & Rural Development",
  "Indian Knowledge Systems (IKS)",
  "Social Innovation & Public Solutions",
  "Engineering & Applied Technology",
];

export const recognitionBenefits = [
  "Best Practices Awards (Category-wise)",
  "Certificate of Excellence",
  "Opportunity to present at national platform",
  "Inclusion in “Shiksha Mahakumbh Best Practices Compendium”",
];

export const submissionFormats = [
  "📄 Research Paper / Article (800–1500 words)",
  "🧾 Abstract (150–200 words)",
  "📊 Data / Case Study (if applicable)",
  "🖼️ Diagrams / Images / Project Documentation",
];

export const submissionRequirements = [
  "Title of Best Practice",
  "Institution / Organization Name",
  "Objective & Problem Addressed",
  "Detailed Description of Practice",
  "Implementation Methodology",
  "Impact & Outcomes (with data if available)",
  "Scalability & Replicability",
  "Supporting Documents (photos/videos/reports)",
];