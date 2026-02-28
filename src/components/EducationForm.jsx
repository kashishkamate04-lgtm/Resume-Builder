import React from "react";
import { GraduationCap, Trash2, Plus } from "lucide-react";

const EducationForm = ({ data, onChange }) => {
  const addEducation = () => {
    const newEducation = {
      institution: "",
      degree: "",
      field: "",
      graduation_date: "",
      gpa: "",
    };

    onChange([...data, newEducation]);
  };

  const removeEducation = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateEducation = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const inputStyle =
    "px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            <GraduationCap className="size-5 text-purple-600" />
            Education
          </h3>
          <p className="text-sm text-gray-500">
            Add your education details
          </p>
        </div>

        <button
          type="button"
          onClick={addEducation}
          className="flex items-center gap-2 px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors"
        >
          <Plus className="size-4" />
          Add Education
        </button>
      </div>

      {/* Empty State */}
      {data.length === 0 ? (
        <div className="text-center py-8 text-gray-500 border border-dashed rounded-lg">
          <GraduationCap className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>No education added yet.</p>
          <p className="text-sm">
            Click "Add Education" to get started.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((education, index) => (
            <div
              key={index}
              className="p-5 border border-gray-200 rounded-lg space-y-4 bg-white shadow-sm"
            >
              {/* Card Header */}
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-gray-800">
                  Education #{index + 1}
                </h4>

                <button
                  type="button"
                  onClick={() => removeEducation(index)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>

              {/* Main Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  type="text"
                  value={education.institution || ""}
                  onChange={(e) =>
                    updateEducation(index, "institution", e.target.value)
                  }
                  placeholder="Institution Name"
                  className={inputStyle}
                />

                <input
                  type="text"
                  value={education.degree || ""}
                  onChange={(e) =>
                    updateEducation(index, "degree", e.target.value)
                  }
                  placeholder="Degree (e.g. Bachelor's, Master's)"
                  className={inputStyle}
                />

                <input
                  type="text"
                  value={education.field || ""}
                  onChange={(e) =>
                    updateEducation(index, "field", e.target.value)
                  }
                  placeholder="Field of Study"
                  className={inputStyle}
                />

                <input
                  type="month"
                  value={education.graduation_date || ""}
                  onChange={(e) =>
                    updateEducation(index, "graduation_date", e.target.value)
                  }
                  className={inputStyle}
                />
              </div>

              <input
                type="text"
                value={education.gpa || ""}
                onChange={(e) =>
                  updateEducation(index, "gpa", e.target.value)
                }
                placeholder="GPA (optional)"
                className={inputStyle}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EducationForm;