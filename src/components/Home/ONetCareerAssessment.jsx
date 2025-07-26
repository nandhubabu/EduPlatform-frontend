import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaWrench, 
  FaMicroscope, 
  FaPalette, 
  FaUsers, 
  FaBriefcase, 
  FaCalculator,
  FaChevronLeft,
  FaChevronRight,
  FaCheckCircle,
  FaGraduationCap,
  FaExternalLinkAlt,
  FaTachometerAlt
} from 'react-icons/fa';

// O*NET Interest Profiler based on Holland's RIASEC model
const ONetCareerAssessment = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [scores, setScores] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { userProfile } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  // RIASEC Categories with icons and descriptions
  const interestAreas = {
    R: {
      name: "Realistic",
      icon: FaWrench,
      description: "Building, fixing, working with your hands",
      color: "text-green-600"
    },
    I: {
      name: "Investigative", 
      icon: FaMicroscope,
      description: "Researching, analyzing, solving problems",
      color: "text-blue-600"
    },
    A: {
      name: "Artistic",
      icon: FaPalette,
      description: "Creating, designing, expressing ideas",
      color: "text-purple-600"
    },
    S: {
      name: "Social",
      icon: FaUsers,
      description: "Helping, teaching, caring for others",
      color: "text-orange-600"
    },
    E: {
      name: "Enterprising",
      icon: FaBriefcase,
      description: "Leading, managing, selling, organizing",
      color: "text-red-600"
    },
    C: {
      name: "Conventional",
      icon: FaCalculator,
      description: "Organizing, following procedures, attention to detail",
      color: "text-indigo-600"
    }
  };

  // Interest Profiler Questions based on O*NET methodology
  const questions = [
    // Realistic (R) Questions
    { text: "Build kitchen cabinets", category: "R" },
    { text: "Repair cars", category: "R" },
    { text: "Raise fish in a fish hatchery", category: "R" },
    { text: "Work on a farm", category: "R" },
    { text: "Assemble electronic parts", category: "R" },
    { text: "Operate a drill press", category: "R" },
    { text: "Drive a truck to deliver packages to offices and homes", category: "R" },
    { text: "Fix the plumbing in houses", category: "R" },
    { text: "Lay brick or tile", category: "R" },
    { text: "Work on an offshore oil-drilling rig", category: "R" },

    // Investigative (I) Questions  
    { text: "Study the structure of the human body", category: "I" },
    { text: "Study animal behavior", category: "I" },
    { text: "Do research on plants or animals", category: "I" },
    { text: "Develop a new medicine", category: "I" },
    { text: "Plan a research study", category: "I" },
    { text: "Study ways to reduce water pollution", category: "I" },
    { text: "Examine blood samples using a microscope", category: "I" },
    { text: "Investigate crimes", category: "I" },
    { text: "Study the movement of planets", category: "I" },
    { text: "Examine very old skeletal remains", category: "I" },

    // Artistic (A) Questions
    { text: "Conduct a musical group", category: "A" },
    { text: "Write books or plays", category: "A" },
    { text: "Play a musical instrument", category: "A" },
    { text: "Perform jazz or tap dance", category: "A" },
    { text: "Design artwork for magazines", category: "A" },
    { text: "Edit movies", category: "A" },
    { text: "Pose for a photographer", category: "A" },
    { text: "Announce a radio show", category: "A" },
    { text: "Write magazine articles", category: "A" },
    { text: "Create special effects for movies", category: "A" },

    // Social (S) Questions
    { text: "Give career guidance to people", category: "S" },
    { text: "Do volunteer work at a non-profit organization", category: "S" },
    { text: "Help people who have problems with drugs or alcohol", category: "S" },
    { text: "Teach children how to read", category: "S" },
    { text: "Work with mentally disabled children", category: "S" },
    { text: "Teach an exercise class", category: "S" },
    { text: "Help people with family-related problems", category: "S" },
    { text: "Supervise the activities of children at a camp", category: "S" },
    { text: "Help elderly people with their daily activities", category: "S" },
    { text: "Teach sign language to people who are deaf or hard of hearing", category: "S" },

    // Enterprising (E) Questions
    { text: "Sell restaurant franchises to individuals", category: "E" },
    { text: "Sell merchandise at a department store", category: "E" },
    { text: "Manage the operations of a hotel", category: "E" },
    { text: "Operate a beauty salon or barber shop", category: "E" },
    { text: "Manage a department within a large company", category: "E" },
    { text: "Manage a clothing store", category: "E" },
    { text: "Sell houses", category: "E" },
    { text: "Manage a restaurant", category: "E" },
    { text: "Run a toy store", category: "E" },
    { text: "Manage the operations of a hotel", category: "E" },

    // Conventional (C) Questions
    { text: "Inventory supplies using a hand-held computer", category: "C" },
    { text: "Record information from customer credit applications", category: "C" },
    { text: "Use a computer program to generate customer bills", category: "C" },
    { text: "Maintain employee records", category: "C" },
    { text: "Compute and record statistical and other numerical data", category: "C" },
    { text: "Operate a calculator", category: "C" },
    { text: "Handle customers' bank transactions", category: "C" },
    { text: "Keep shipping and receiving records", category: "C" },
    { text: "Calculate the wages of employees", category: "C" },
    { text: "Assemble products in a factory", category: "C" }
  ];

  const handleAnswer = (interest) => {
    const newAnswers = { ...answers, [currentQuestion]: interest };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResults(newAnswers);
    }
  };

  const calculateResults = async (finalAnswers) => {
    const categoryScores = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
    
    Object.entries(finalAnswers).forEach(([questionIndex, interest]) => {
      const question = questions[parseInt(questionIndex)];
      if (interest === 'like' || interest === 'strongly_like') {
        categoryScores[question.category] += interest === 'strongly_like' ? 2 : 1;
      }
    });

    // Sort categories by score
    const sortedScores = Object.entries(categoryScores)
      .sort(([,a], [,b]) => b - a)
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

    // Get top 3 interests
    const topInterests = Object.keys(sortedScores).slice(0, 3);
    
    // Get career recommendations
    const recommendations = getCareerRecommendations(topInterests);

    setScores(sortedScores);
    setShowResults(true);

    // Save to backend if user is authenticated
    if (userProfile) {
      try {
        const response = await fetch('http://localhost:5000/api/v1/users/assessment/save', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            scores: categoryScores,
            topInterests: topInterests,
            recommendations: recommendations.slice(0, 6).map(career => ({
              title: career.title,
              description: career.description,
              growth: career.growth,
              education: career.education,
              matchScore: calculateMatchScore(career, topInterests)
            }))
          })
        });

        if (response.ok) {
          console.log('Assessment results saved successfully to backend');
        } else {
          console.error('Failed to save assessment results to backend');
        }
      } catch (error) {
        console.error('Error saving assessment results to backend:', error);
      }
    }

    // Always save to localStorage regardless of authentication status
    const assessmentResult = {
      scores: categoryScores,
      topInterests: topInterests,
      recommendations: recommendations.slice(0, 6),
      completedAt: new Date().toISOString()
    };
    
    try {
      const existingResults = JSON.parse(localStorage.getItem('assessmentResults') || '[]');
      existingResults.push(assessmentResult);
      
      // Keep only last 5 results in localStorage
      if (existingResults.length > 5) {
        existingResults.splice(0, existingResults.length - 5);
      }
      
      localStorage.setItem('assessmentResults', JSON.stringify(existingResults));
      localStorage.setItem('latestAssessmentResult', JSON.stringify(assessmentResult));
      
      console.log('Assessment results saved to localStorage successfully');
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }

    // Always dispatch event to notify dashboard to refresh
    console.log('Assessment completed, dispatching event to refresh dashboard...');
    window.dispatchEvent(new CustomEvent('assessmentCompleted'));
  };

  // Helper function to calculate match score
  const calculateMatchScore = (career, topInterests) => {
    // Simple scoring based on career category alignment with top interests
    const careerCategories = {
      'Automotive Technician': ['R'],
      'Electrician': ['R'],
      'Construction Manager': ['R', 'E'],
      'Data Scientist': ['I', 'C'],
      'Medical Researcher': ['I'],
      'Software Developer': ['I', 'A'],
      'Graphic Designer': ['A'],
      'Web Developer': ['A', 'I'],
      'Art Director': ['A', 'E'],
      'School Counselor': ['S'],
      'Social Worker': ['S'],
      'Teacher': ['S'],
      'Marketing Manager': ['E', 'A'],
      'Sales Manager': ['E'],
      'Business Analyst': ['E', 'I'],
      'Accountant': ['C'],
      'Database Administrator': ['C', 'I'],
      'Financial Analyst': ['C', 'I']
    };

    const categories = careerCategories[career.title] || [];
    let score = 0;
    
    categories.forEach(category => {
      const index = topInterests.indexOf(category);
      if (index !== -1) {
        score += (3 - index) * 20; // Higher score for higher-ranked interests
      }
    });

    return Math.min(score, 100); // Cap at 100
  };

  const getCareerRecommendations = (topInterests) => {
    const careerMappings = {
      R: [
        { 
          title: "Automotive Technician", 
          description: "Diagnose and repair vehicles", 
          growth: "Average", 
          education: "Certificate",
          certifications: [
            { 
              name: "ASE Certification", 
              provider: "National Institute for Automotive Service Excellence", 
              link: "https://www.ase.com/Tests-Certification.aspx",
              cost: "$37 per test"
            },
            { 
              name: "Automotive Technology Certificate", 
              provider: "Community Colleges", 
              link: "https://www.careeronestop.org/Toolkit/Training/find-local-training.aspx",
              cost: "$2,000-$8,000"
            }
          ]
        },
        { 
          title: "Electrician", 
          description: "Install and maintain electrical systems", 
          growth: "Faster than average", 
          education: "Apprenticeship",
          certifications: [
            { 
              name: "Electrical License", 
              provider: "State Licensing Boards", 
              link: "https://www.ncei.org/licensing.htm",
              cost: "$50-$200"
            },
            { 
              name: "OSHA 10-Hour Safety Training", 
              provider: "OSHA", 
              link: "https://www.osha.gov/training/outreach",
              cost: "$50-$150"
            }
          ]
        },
        { 
          title: "Construction Manager", 
          description: "Oversee construction projects", 
          growth: "Faster than average", 
          education: "Bachelor's",
          certifications: [
            { 
              name: "Certified Construction Manager (CCM)", 
              provider: "CMAA", 
              link: "https://cmaanet.org/ccm-credential",
              cost: "$400-$600"
            },
            { 
              name: "Project Management Professional (PMP)", 
              provider: "PMI", 
              link: "https://www.pmi.org/certifications/project-management-pmp",
              cost: "$405-$555"
            }
          ]
        }
      ],
      I: [
        { 
          title: "Data Scientist", 
          description: "Analyze complex data to find insights", 
          growth: "Much faster than average", 
          education: "Bachelor's+",
          certifications: [
            { 
              name: "IBM Data Science Professional Certificate", 
              provider: "IBM via Coursera", 
              link: "https://www.coursera.org/professional-certificates/ibm-data-science",
              cost: "$49/month"
            },
            { 
              name: "Google Data Analytics Certificate", 
              provider: "Google via Coursera", 
              link: "https://www.coursera.org/professional-certificates/google-data-analytics",
              cost: "$49/month"
            },
            { 
              name: "Microsoft Certified: Azure Data Scientist Associate", 
              provider: "Microsoft", 
              link: "https://docs.microsoft.com/en-us/learn/certifications/azure-data-scientist/",
              cost: "$165"
            }
          ]
        },
        { 
          title: "Medical Researcher", 
          description: "Conduct research to improve health", 
          growth: "Faster than average", 
          education: "Doctoral",
          certifications: [
            { 
              name: "Clinical Research Coordinator (CRC)", 
              provider: "ACRP", 
              link: "https://acrpnet.org/certifications/crc/",
              cost: "$400-$500"
            },
            { 
              name: "Good Clinical Practice (GCP)", 
              provider: "ICH", 
              link: "https://ichgcp.net/",
              cost: "Free-$200"
            }
          ]
        },
        { 
          title: "Software Developer", 
          description: "Create computer applications", 
          growth: "Much faster than average", 
          education: "Bachelor's",
          certifications: [
            { 
              name: "AWS Certified Developer", 
              provider: "Amazon Web Services", 
              link: "https://aws.amazon.com/certification/certified-developer-associate/",
              cost: "$150"
            },
            { 
              name: "Meta Front-End Developer Certificate", 
              provider: "Meta via Coursera", 
              link: "https://www.coursera.org/professional-certificates/meta-front-end-developer",
              cost: "$49/month"
            },
            { 
              name: "Oracle Certified Professional", 
              provider: "Oracle", 
              link: "https://education.oracle.com/certification",
              cost: "$245"
            }
          ]
        }
      ],
      A: [
        { 
          title: "Graphic Designer", 
          description: "Create visual content for media", 
          growth: "Average", 
          education: "Bachelor's",
          certifications: [
            { 
              name: "Adobe Certified Expert (ACE)", 
              provider: "Adobe", 
              link: "https://www.adobe.com/training/certification.html",
              cost: "$150 per exam"
            },
            { 
              name: "Google UX Design Certificate", 
              provider: "Google via Coursera", 
              link: "https://www.coursera.org/professional-certificates/google-ux-design",
              cost: "$49/month"
            }
          ]
        },
        { 
          title: "Web Developer", 
          description: "Design and build websites", 
          growth: "Much faster than average", 
          education: "Certificate/Bachelor's",
          certifications: [
            { 
              name: "FreeCodeCamp Full Stack Certification", 
              provider: "FreeCodeCamp", 
              link: "https://www.freecodecamp.org/learn",
              cost: "Free"
            },
            { 
              name: "Meta Front-End Developer Certificate", 
              provider: "Meta via Coursera", 
              link: "https://www.coursera.org/professional-certificates/meta-front-end-developer",
              cost: "$49/month"
            },
            { 
              name: "AWS Certified Cloud Practitioner", 
              provider: "Amazon Web Services", 
              link: "https://aws.amazon.com/certification/certified-cloud-practitioner/",
              cost: "$100"
            }
          ]
        },
        { 
          title: "Art Director", 
          description: "Oversee creative projects", 
          growth: "Average", 
          education: "Bachelor's",
          certifications: [
            { 
              name: "Adobe Certified Expert (ACE)", 
              provider: "Adobe", 
              link: "https://www.adobe.com/training/certification.html",
              cost: "$150 per exam"
            },
            { 
              name: "Project Management Professional (PMP)", 
              provider: "PMI", 
              link: "https://www.pmi.org/certifications/project-management-pmp",
              cost: "$405-$555"
            }
          ]
        }
      ],
      S: [
        { 
          title: "School Counselor", 
          description: "Help students with academic and personal issues", 
          growth: "Faster than average", 
          education: "Master's",
          certifications: [
            { 
              name: "National Certified Counselor (NCC)", 
              provider: "NBCC", 
              link: "https://www.nbcc.org/certification/ncc",
              cost: "$275"
            },
            { 
              name: "Licensed Professional Counselor", 
              provider: "State Licensing Boards", 
              link: "https://www.nbcc.org/state-professional-counselor-licensure-boards",
              cost: "$100-$300"
            }
          ]
        },
        { 
          title: "Social Worker", 
          description: "Help people solve problems", 
          growth: "Faster than average", 
          education: "Bachelor's",
          certifications: [
            { 
              name: "Licensed Clinical Social Worker (LCSW)", 
              provider: "State Licensing Boards", 
              link: "https://www.socialworklicensure.org/",
              cost: "$150-$400"
            },
            { 
              name: "Academy of Certified Social Workers (ACSW)", 
              provider: "NASW", 
              link: "https://www.socialworkers.org/Credentials-Certifications",
              cost: "$230"
            }
          ]
        },
        { 
          title: "Teacher", 
          description: "Educate students", 
          growth: "Average", 
          education: "Bachelor's",
          certifications: [
            { 
              name: "Teaching License", 
              provider: "State Education Departments", 
              link: "https://www.teaching-certification.com/",
              cost: "$50-$200"
            },
            { 
              name: "National Board Certification", 
              provider: "NBPTS", 
              link: "https://www.nbpts.org/national-board-certification/",
              cost: "$1,900"
            }
          ]
        }
      ],
      E: [
        { 
          title: "Marketing Manager", 
          description: "Plan marketing campaigns", 
          growth: "Faster than average", 
          education: "Bachelor's",
          certifications: [
            { 
              name: "Google Ads Certification", 
              provider: "Google", 
              link: "https://skillshop.withgoogle.com/",
              cost: "Free"
            },
            { 
              name: "HubSpot Content Marketing Certification", 
              provider: "HubSpot", 
              link: "https://academy.hubspot.com/courses/content-marketing",
              cost: "Free"
            },
            { 
              name: "Facebook Blueprint Certification", 
              provider: "Meta", 
              link: "https://www.facebook.com/business/learn/certification",
              cost: "$150 per exam"
            }
          ]
        },
        { 
          title: "Sales Manager", 
          description: "Lead sales teams", 
          growth: "Average", 
          education: "Bachelor's",
          certifications: [
            { 
              name: "Certified Sales Professional (CSP)", 
              provider: "Sales & Marketing Executives International", 
              link: "https://smei.org/certifications/",
              cost: "$395"
            },
            { 
              name: "Salesforce Administrator", 
              provider: "Salesforce", 
              link: "https://trailhead.salesforce.com/credentials/administrator",
              cost: "$200"
            }
          ]
        },
        { 
          title: "Business Analyst", 
          description: "Analyze business processes", 
          growth: "Much faster than average", 
          education: "Bachelor's",
          certifications: [
            { 
              name: "Certified Business Analysis Professional (CBAP)", 
              provider: "IIBA", 
              link: "https://www.iiba.org/career-resources/a-business-analysts-guide-to-cbap/",
              cost: "$325-$450"
            },
            { 
              name: "PMI Professional in Business Analysis (PBA)", 
              provider: "PMI", 
              link: "https://www.pmi.org/certifications/business-analysis-pba",
              cost: "$405-$555"
            }
          ]
        }
      ],
      C: [
        { 
          title: "Accountant", 
          description: "Prepare and examine financial records", 
          growth: "Average", 
          education: "Bachelor's",
          certifications: [
            { 
              name: "Certified Public Accountant (CPA)", 
              provider: "AICPA", 
              link: "https://www.aicpa.org/becomeacpa.html",
              cost: "$800-$1,200"
            },
            { 
              name: "Certified Management Accountant (CMA)", 
              provider: "IMA", 
              link: "https://www.imanet.org/cma-certification",
              cost: "$415-$611"
            },
            { 
              name: "QuickBooks ProAdvisor", 
              provider: "Intuit", 
              link: "https://quickbooks.intuit.com/accountants/training-certification/",
              cost: "Free"
            }
          ]
        },
        { 
          title: "Database Administrator", 
          description: "Store and organize data", 
          growth: "Faster than average", 
          education: "Bachelor's",
          certifications: [
            { 
              name: "Oracle Certified Professional", 
              provider: "Oracle", 
              link: "https://education.oracle.com/certification",
              cost: "$245"
            },
            { 
              name: "Microsoft Certified: Azure Database Administrator", 
              provider: "Microsoft", 
              link: "https://docs.microsoft.com/en-us/learn/certifications/azure-database-administrator-associate/",
              cost: "$165"
            },
            { 
              name: "IBM Certified Database Administrator", 
              provider: "IBM", 
              link: "https://www.ibm.com/training/certification",
              cost: "$200"
            }
          ]
        },
        { 
          title: "Financial Analyst", 
          description: "Assess investment opportunities", 
          growth: "Faster than average", 
          education: "Bachelor's",
          certifications: [
            { 
              name: "Chartered Financial Analyst (CFA)", 
              provider: "CFA Institute", 
              link: "https://www.cfainstitute.org/programs/cfa",
              cost: "$700-$1,450"
            },
            { 
              name: "Financial Risk Manager (FRM)", 
              provider: "GARP", 
              link: "https://www.garp.org/frm",
              cost: "$550-$825"
            },
            { 
              name: "Certified Financial Planner (CFP)", 
              provider: "CFP Board", 
              link: "https://www.cfp.net/become-a-cfp-professional",
              cost: "$695-$825"
            }
          ]
        }
      ]
    };

    return topInterests.slice(0, 3).map(interest => careerMappings[interest] || []).flat();
  };

  const goToPrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const restartAssessment = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setScores({});
  };

  if (showResults) {
    const topInterests = Object.keys(scores).slice(0, 3);
    const recommendations = getCareerRecommendations(topInterests);

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Your Career Interest Profile</h1>
              <p className="text-gray-600">Personalized career recommendations based on your interests</p>
            </div>

            {/* Interest Scores */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Top Interest Areas</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {Object.entries(scores).slice(0, 3).map(([category, score], index) => {
                  const interest = interestAreas[category];
                  const IconComponent = interest.icon;
                  return (
                    <div key={category} className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-xl border-l-4 border-indigo-500 shadow-md">
                      <div className="flex items-center mb-3">
                        <IconComponent className={`${interest.color} text-2xl mr-3`} />
                        <div>
                          <h3 className="font-bold text-lg text-gray-800">{index + 1}. {interest.name}</h3>
                          <p className="text-sm text-gray-600">Score: {score}</p>
                        </div>
                      </div>
                      <p className="text-gray-700 text-sm">{interest.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Career Recommendations */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Recommended Careers</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendations.slice(0, 6).map((career, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                    <h3 className="font-bold text-lg text-gray-800 mb-2">{career.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{career.description}</p>
                    <div className="space-y-1 text-xs mb-4">
                      <p><span className="font-semibold">Growth:</span> {career.growth}</p>
                      <p><span className="font-semibold">Education:</span> {career.education}</p>
                    </div>
                    
                    {/* Certifications Section */}
                    {career.certifications && career.certifications.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <h4 className="font-semibold text-sm text-gray-800 mb-2 flex items-center">
                          <FaGraduationCap className="mr-1 text-indigo-600" />
                          Key Certifications:
                        </h4>
                        <div className="space-y-2">
                          {career.certifications.slice(0, 2).map((cert, certIndex) => (
                            <div key={certIndex} className="bg-indigo-50 rounded-lg p-3">
                              <a 
                                href={cert.link} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="block hover:text-indigo-700 transition-colors"
                              >
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <h5 className="font-medium text-sm text-indigo-800 mb-1 flex items-center">
                                      {cert.name}
                                      <FaExternalLinkAlt className="ml-1 text-xs" />
                                    </h5>
                                    <p className="text-xs text-gray-600 mb-1">{cert.provider}</p>
                                    <p className="text-xs font-medium text-green-600">{cert.cost}</p>
                                  </div>
                                </div>
                              </a>
                            </div>
                          ))}
                          {career.certifications.length > 2 && (
                            <p className="text-xs text-gray-500 italic">+{career.certifications.length - 2} more certifications available</p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-3">Next Steps</h2>
              <ul className="space-y-2 text-gray-700">
                <li>• Research the recommended careers that interest you</li>
                <li>• Look into educational requirements and training programs</li>
                <li>• Connect with professionals in these fields</li>
                <li>• Consider internships or job shadowing opportunities</li>
                <li>• Explore relevant courses on our platform</li>
              </ul>
            </div>

            <div className="text-center">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {userProfile && (
                  <button
                    onClick={() => navigate('/dashboard')}
                    className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-3 rounded-lg font-bold hover:from-green-700 hover:to-emerald-700 transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center"
                  >
                    <FaTachometerAlt className="mr-2" />
                    View Your Dashboard
                  </button>
                )}
                <button
                  onClick={restartAssessment}
                  className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:from-indigo-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                  Take Assessment Again
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Career Interest Discovery</h1>
            <p className="text-gray-600">Find careers that match your passions and unlock your potential</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Question {currentQuestion + 1} of {questions.length}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-blue-600 to-indigo-600 h-3 rounded-full transition-all duration-500 shadow-sm"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Question */}
          <div className="text-center mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              How much would you like this activity?
            </h2>
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border-l-4 border-indigo-500 shadow-sm">
              <p className="text-lg font-medium text-gray-800">{currentQ.text}</p>
            </div>
          </div>

          {/* Answer Options */}
          <div className="space-y-3 mb-8">
            {[
              { value: 'strongly_like', label: 'Strongly Like', color: 'bg-indigo-600 hover:bg-indigo-700 border-l-4 border-indigo-800' },
              { value: 'like', label: 'Like', color: 'bg-blue-600 hover:bg-blue-700 border-l-4 border-blue-800' },
              { value: 'unsure', label: 'Unsure', color: 'bg-slate-500 hover:bg-slate-600 border-l-4 border-slate-700' },
              { value: 'dislike', label: 'Dislike', color: 'bg-slate-600 hover:bg-slate-700 border-l-4 border-slate-800' },
              { value: 'strongly_dislike', label: 'Strongly Dislike', color: 'bg-slate-700 hover:bg-slate-800 border-l-4 border-slate-900' }
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => handleAnswer(option.value)}
                className={`w-full p-4 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-[1.02] shadow-md hover:shadow-lg ${option.color}`}
              >
                {option.label}
              </button>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <button
              onClick={goToPrevious}
              disabled={currentQuestion === 0}
              className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                currentQuestion === 0 
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                  : 'bg-slate-600 text-white hover:bg-slate-700 shadow-md hover:shadow-lg'
              }`}
            >
              <FaChevronLeft className="mr-2" />
              Previous
            </button>
            
            <div className="text-sm text-gray-500 flex items-center bg-gray-50 px-4 py-2 rounded-lg">
              Complete at least 30 questions to see results
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ONetCareerAssessment;
