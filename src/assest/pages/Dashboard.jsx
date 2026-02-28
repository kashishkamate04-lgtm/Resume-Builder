import { FilePenLineIcon,PencilIcon, PlusIcon, TrashIcon, UploadCloudIcon, XIcon} from "lucide-react";
import React, { useEffect, useState } from "react";
import { dummyResumeData } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const colors = ["#9333ea", "#d97706", "#0284c7", "#16a34a"];

  const [allResumes, setAllResumes] = useState([]);
  const [showCreateResume, setShowCreateResume] = useState(false);
  const [showUploadResume, setShowUploadResume] = useState(false);
  const [showEditResume, setShowEditResume] = useState(false);
  const [editResumeId, setEditResumeId] = useState(null);
  const [title, setTitle] = useState("");
  const [resume, setResume] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    setAllResumes(dummyResumeData);
  }, []);

  // Create Resume
  const createResume = (event) => {
    event.preventDefault();

    const newResume = {
      _id: Date.now().toString(),
      title,
      updatedAt: new Date(),
    };

    setAllResumes((prev) => [...prev, newResume]);

    setShowCreateResume(false);
    setTitle("");
    navigate(`/app/builder/${newResume._id}`);
  };

  // Upload Resume
  const uploadResume = (event) => {
    event.preventDefault();

    const newResume = {
      _id: Date.now().toString(),
      title: resume.name,
      updatedAt: new Date(),
    };

    setAllResumes((prev) => [...prev, newResume]);

    setShowUploadResume(false);
    setResume(null);
    navigate(`/app/builder/${newResume._id}`);
  };

  // Edit Resume Title
  const editTitle = (event) => {
    event.preventDefault();

    setAllResumes((prev) =>
      prev.map((res) =>
        res._id === editResumeId
          ? { ...res, title, updatedAt: new Date() }
          : res
      )
    );

    setShowEditResume(false);
    setEditResumeId(null);
    setTitle("");
  };

  // Delete Resume
  const deleteResume = (id) => {
    setAllResumes((prev) => prev.filter((res) => res._id !== id));
  };

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <p className="text-2xl font-medium mb-6 bg-gradient-to-r from-slate-600 to-slate-700 bg-clip-text text-transparent sm:hidden">
          Welcome, Joe Doe
        </p>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={() => setShowCreateResume(true)}
            className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-indigo-500 hover:shadow-lg transition-all duration-300"
          >
            <PlusIcon className="size-11 p-2.5 bg-gradient-to-br from-indigo-300 to-indigo-500 text-white rounded-full" />
            <p className="text-sm group-hover:text-indigo-600">
              Create Resume
            </p>
          </button>

          <button
            onClick={() => setShowUploadResume(true)}
            className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-purple-500 hover:shadow-lg transition-all duration-300"
          >
            <UploadCloudIcon className="size-11 p-2.5 bg-gradient-to-br from-purple-300 to-purple-500 text-white rounded-full" />
            <p className="text-sm group-hover:text-purple-600">
              Upload Existing
            </p>
          </button>
        </div>

        <hr className="border-slate-300 my-6 sm:w-[305px]" />

        {/* Resume Cards */}
        <div className="grid grid-cols-2 sm:flex flex-wrap gap-4">
          {allResumes.map((resumeItem, index) => {
            const baseColor = colors[index % colors.length];

            return (
              <button
                key={resumeItem._id}
                onClick={() =>
                  navigate(`/app/builder/${resumeItem._id}`)
                }
                className="relative w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 border group hover:shadow-lg transition-all duration-300"
                style={{
                  background: `linear-gradient(135deg, ${baseColor}10, ${baseColor}40)`,
                  borderColor: baseColor + "40",
                }}
              >
                <FilePenLineIcon
                  className="size-7 group-hover:scale-105"
                  style={{ color: baseColor }}
                />

                <p
                  className="group-hover:scale-105 px-2 text-center"
                  style={{ color: baseColor }}
                >
                  {resumeItem.title}
                </p>

                <p className="absolute bottom-1 text-[11px] px-2 text-center" style={{ color: baseColor + "90" }}>
                  Updated on{" "} {new Date( resumeItem.updatedAt).toLocaleDateString()}
                </p>

                <div onClick={e => e.stopPropagation()} className="absolute top-1 right-1 group-hover:flex items-center hidden">
                  <TrashIcon className="size-7 p-1.5 hover:bg-white/50 rounded text-slate-700"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteResume(resumeItem._id);
                    }}
                  />

                  <PencilIcon className="size-7 p-1.5 hover:bg-white/50 rounded text-slate-700"
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditResumeId(resumeItem._id);
                      setTitle(resumeItem.title);
                      setShowEditResume(true);
                    }}
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* Create Resume Modal */}
        {showCreateResume && (
          <div onClick={() => setShowCreateResume(false)} className="fixed inset-0 bg-black/70 backdrop-blur-sm z-10 flex items-center justify-center">
            <form
              onSubmit={createResume}
              onClick={(e) => e.stopPropagation()} className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6" >
              <h2 className="text-xl font-bold mb-4"> Create a Resume</h2>

              <input
                onChange={(e) => setTitle(e.target.value)}
                value={title} type="text" placeholder="Enter resume title"
                className="w-full px-4 py-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-green-600"
                required/>

              <button className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700">Create Resume
              </button>

              <XIcon className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer"
                onClick={() => {
                  setShowCreateResume(false);
                  setTitle(""); }}
              />
            </form>
          </div>
        )}

        {/* Upload Resume Modal */}
        {showUploadResume && (
          <div onClick={() => setShowUploadResume(false)} className="fixed inset-0 bg-black/70 backdrop-blur-sm z-10 flex items-center justify-center">
            <form
              onSubmit={uploadResume}
              onClick={(e) => e.stopPropagation()} className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6" >
              <h2 className="text-xl font-bold mb-4">Upload Resume </h2>

              <input type="file" accept=".pdf,.docx" onChange={(e) =>
                  setResume(e.target.files[0])
                } className="w-full mb-4" required />

              {resume && (
                <p className="text-green-700 mb-4 text-sm">
                  Selected: {resume.name}
                </p>
              )}

              <button className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700">
                Upload Resume
              </button>

              <XIcon className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer"
                onClick={() => {
                  setShowUploadResume(false);
                  setResume(null);
                }}/>
            </form>
          </div>
        )}

        {/* Edit Resume Modal */}
        {showEditResume && (
          <div onClick={() => setShowEditResume(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-20 flex items-center justify-center" >
            <form
              onSubmit={editTitle}
              onClick={(e) => e.stopPropagation()} className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6">
              <h2 className="text-xl font-bold mb-4"> Edit Resume Title</h2>

              <input
                onChange={(e) => setTitle(e.target.value)} value={title} type="text"
                placeholder="Enter resume title"
                className="w-full px-4 py-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-green-600"
                required/>

              <button className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700">
                Update Resume Title
              </button>

              <XIcon className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer"
                onClick={() => {
                  setShowEditResume(false);
                  setEditResumeId(null);
                  setTitle("");
                }}/>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
