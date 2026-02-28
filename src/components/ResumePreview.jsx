import React from "react";
import ClassicTemplate from "./templates/ClassicTemplate";
import ModernTemplate from "./templates/ModernTemplate";
import MinimalTemplate from "./templates/MinimalTemplate";
import MinimalImageTemplate from "./templates/MinimalImageTemplate";

const ResumePreview = ({ data, template, accentColor, classes = "" }) => {
  const renderTemplate = () => {
    switch (template) {
      case "modern":
        return <ModernTemplate data={data} accentColor={accentColor} />;
      case "minimal":
        return <MinimalTemplate data={data} accentColor={accentColor} />;
      case "minimal-image":
        return <MinimalImageTemplate data={data} accentColor={accentColor} />;
      default:
        return <ClassicTemplate data={data} accentColor={accentColor} />;
    }
  };

  return (
    <div className="w-full bg-gray-100 flex justify-center">
      <div
        id="resume-preview"
        className={`w-full max-w-[794px] bg-white border border-gray-200 shadow ${classes}`}
      >
        {renderTemplate()}
      </div>

      <style jsx>{`
        @media print {
          body * {
            visibility: hidden;
          }

          #resume-preview,
          #resume-preview * {
            visibility: visible;
          }

          #resume-preview {
            position: static; /* FIXED: removed absolute */
            width: 100%;
            margin: 0;
            box-shadow: none !important;
            border: none !important;
          }

          @page {
            size: letter;
            margin: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default ResumePreview;