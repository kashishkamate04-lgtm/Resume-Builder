import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { dummyResumeData } from "../assets/assets";
import {
  ArrowBigLeftIcon,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  DownloadIcon,
  EyeIcon,
  FileText,
  FolderIcon,
  GraduationCap,
  Share2Icon,
  Sparkles,
  User,
} from "lucide-react";

import Personalinfoform from "../components/Personalinfoform";
import ResumePreview from "../components/ResumePreview";
import TemplateSelectors from "../components/TemplateSelectors";
import ColorPicker from "../components/ColorPicker";
import ProfessionalSummaryForm from "../components/ProfessionalSummaryForm";
import ExperienceForm from "../components/ExperienceForm";
import EducationForm from "../components/EducationForm";
import ProjectForm from "../components/ProjectForm";
import SkillsForm from "../components/SkillsForm";

const ResumeBuilder = () => {
  const { resumeId } = useParams();

  const [resumeData, setResumeData] = useState({
    _id: "",
    title: "",
    personal_info: {},
    professional_summary: "",
    work_experience: [],
    education: [],
    project: [],
    skills: [],
    template: "classic",
    accent_color: "#3B82F6",
    public: false,
  });

  const [activeSectionIndex, setActiveSection] = useState(0);
  const [removeBackground, setRemoveBackground] = useState(false);

  const sections = [
    { id: "personal", name: "Personal Info", icon: User },
    { id: "summary", name: "Summary", icon: FileText },
    { id: "experience", name: "Experience", icon: Briefcase },
    { id: "education", name: "Education", icon: GraduationCap },
    { id: "skills", name: "Skills", icon: Sparkles },
    { id: "projects", name: "Projects", icon: FolderIcon },
  ];

  const activeSection = sections[activeSectionIndex];

  useEffect(() => {
    const resume = dummyResumeData.find(
      (resume) => resume._id === resumeId
    );

    if (resume) {
      setResumeData(resume);
      document.title = resume.title;
    }
  }, [resumeId]);

  const progressWidth =
    sections.length > 1
      ? (activeSectionIndex / (sections.length - 1)) * 100
      : 100;

      const changeResumeVisibility = async () =>{
        setResumeData({...resumeData, public: !resumeData.public})
      }

      const handleShare = () =>{
        const frontendUrl = window.location.href.split("/app/")[0];
        const resumeUrl = frontendUrl + "/view" + resumeId;

        if(navigator.share){
          navigator.share({url: resumeUrl, text: "My Resume",})
        }else{
          alert("Share not supported on thid browser.")
        }
      }
      const downloadResume = ()=>{
        window.print();
      }

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Link
          to={"/app"}
          className="inline-flex gap-2 items-center text-slate-500 hover:text-slate-700 transition-all"
        >
          <ArrowBigLeftIcon className="size-4" />
          Back to Dashboard
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* LEFT */}
          <div className="lg:col-span-5 rounded-lg overflow-hidden">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 pt-8 relative">
              <hr className="absolute top-0 left-0 right-0 border border-gray-200" />
              <hr
                className="absolute top-0 left-0 h-1 bg-gradient-to-r from-green-500 to-green-600 border-none transition-all duration-500"
                style={{ width: `${progressWidth}%` }}
              />

              <div className="flex justify-between items-center mb-6 border-b border-gray-300 pb-3">
                <TemplateSelectors
                  selectedTemplate={resumeData.template}
                  onChange={(template) =>
                    setResumeData((prev) => ({ ...prev, template }))
                  }
                />

                <ColorPicker
                  selectedColor={resumeData.accent_color}
                  onChange={(color) =>
                    setResumeData((prev) => ({
                      ...prev,
                      accent_color: color,
                    }))
                  }
                />

                <div className="flex items-center gap-2">
                  {activeSectionIndex !== 0 && (
                    <button
                      onClick={() =>
                        setActiveSection((prev) =>
                          Math.max(0, prev - 1)
                        )
                      }
                      className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50"
                    >
                      <ChevronLeft className="size-4" />
                      Previous
                    </button>
                  )}

                  <button
                    onClick={() =>
                      setActiveSection((prev) =>
                        Math.min(sections.length - 1, prev + 1)
                      )
                    }
                    disabled={
                      activeSectionIndex === sections.length - 1
                    }
                    className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium ${
                      activeSectionIndex === sections.length - 1
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    Next
                    <ChevronRight className="size-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                {activeSection.id === "personal" && (
                  <Personalinfoform
                    data={resumeData.personal_info}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        personal_info: data,
                      }))
                    }
                    removeBackground={removeBackground}
                    setRemoveBackground={setRemoveBackground}
                  />
                )}

                {activeSection.id === "summary" && (
                  <ProfessionalSummaryForm
                    data={resumeData.professional_summary}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        professional_summary: data,
                      }))
                    }
                  />
                )}

                {activeSection.id === "experience" && (
                  <ExperienceForm data={resumeData.experience}
                    onChange={(data) => setResumeData((prev) => ({...prev,experience: data,}))
                    }
                  />
                )}

                 {activeSection.id === "education" && (
                  <EducationForm data={resumeData.education}
                    onChange={(data) => setResumeData((prev) => ({...prev,education: data,}))
                    }
                  />
                )}

                {activeSection.id === "projects" && (
                  <ProjectForm data={resumeData.project}
                    onChange={(data) => setResumeData((prev) => ({...prev,project: data,}))
                    }
                  />
                )}
                {activeSection.id === "skills" && (
                  <SkillsForm data={resumeData.skills}
                    onChange={(data) => setResumeData((prev) => ({...prev,skills: data,}))
                    }
                  />
                )}
              </div>
              <button className="bg-graident-to-br from-green-100 to green-200 ring-green-300 text-green-600 ring hover:ring-green-400 transition-all rounded-md px-6 py-2 mt-6 text-sm">
                Save Changes
              </button>

            
            </div>
          </div>

          {/* RIGHT */}
          <div className="lg:col-span-7 max-lg:mt-8 min-w-0">
            <div className="relative w-full">
              <div className="absolute bottom-3 left-0 right-0 flex items-center justify-end gap-2">
                {resumeData.public && (
                  <button onClick={handleShare} className="flex items-center p-2 px-4 gap-2 text-xs bg-graident-to-br from-blue-100 to-blue-200 text-blue-600 rounded-lg ring-blue-300 hover:ring transition-colors">
                    <Share2Icon className="size-4"/>Share
                  </button>
                )}
                <button onClick={changeResumeVisibility} className="flex items-center p-2 px-4 gap-2 text-xs bg-graident-to-br from-purple-100 to-purple-200 text-purple-600 ring-purple-300 rounded-lg hover:ring transition-colors">
                  {resumeData.public ? <EyeIcon className="size-4"/> : <EyeIcon className="size-4"/>}
                  {resumeData.public ? "Public" : "Private"}
                </button>
                <button onClick={downloadResume} className="flex items-center gap-2 px-6 py-2 text-xs bg-graident-to-br from-green-100 to green-200 text-green-600 rounded-lg ring-green-300 hover:ring transition-colors">
                  <DownloadIcon className="size-4"/> Download
                </button>

              </div>

            </div>
            <ResumePreview
              data={resumeData}
              template={resumeData.template}
              accentColor={resumeData.accent_color}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;