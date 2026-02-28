import { Mail, User, Phone, MapPin, BriefcaseBusiness, Linkedin } from "lucide-react";
import React from "react";

const Personalinfoform = ({data, onChange,removeBackground,setRemoveBackground,}) => {

  const handleChange = (field, value) => {onChange({ ...data, [field]: value });};

  const fields = [
    {key: "full_name", label: "Full Name", icon: User, type: "text", required:true},
    {key: "email", label: "Email", icon: Mail, type: "email", required:true},
    {key: "phone", label: "Phone", icon: Phone, type: "tel"},
    {key: "location", label: "Location", icon: MapPin, type: "text"},
    {key: "profession", label: "Profession", icon: BriefcaseBusiness, type: "text"},
    {key: "linkedin", label: "LinkedIn", icon: Linkedin, type: "url"},
    {key:"website", label:"Personal Website", icon: "Globe", type:"url"}
  ]


  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      handleChange("image", reader.result); // store as base64 string
    };

    reader.readAsDataURL(file);
  };

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900">
        Personal Information
      </h3>
      <p className="text-sm text-gray-600">
        Get started with your personal information
      </p>

      <div className="flex items-center gap-4 mt-4">

        {/* IMAGE UPLOAD */}
        <label className="cursor-pointer flex flex-col items-center">

          {data?.image ? (
            <img
              src={data.image}
              alt="user"
              className="w-20 h-20 rounded-full object-cover ring ring-slate-300 hover:opacity-80 transition"
            />
          ) : (
            <div className="flex flex-col items-center text-gray-500">
              <User className="size-10 p-2.5 border rounded-full" />
              <span className="text-xs mt-1">Upload image</span>
            </div>
          )}

          <input
            type="file"
            accept="image/png, image/jpeg"
            className="hidden"
            onChange={handleImageUpload}
          />
        </label>

        {/* REMOVE BACKGROUND TOGGLE */}
        {data?.image && (
          <div className="flex flex-col gap-2 text-sm">
            <p className="font-medium">Remove Background</p>

            <label className="relative inline-flex items-center cursor-pointer gap-3">
              <input
                type="checkbox"
                className="sr-only peer"
                onChange={() =>
                  setRemoveBackground((prev) => !prev)
                }
                checked={removeBackground}
              />

              <div className="w-9 h-5 bg-slate-300 rounded-full peer-checked:bg-green-600 transition-colors duration-200" />

              <span className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform duration-200 peer-checked:translate-x-4" />
            </label>
          </div>
        )}

      </div>

      {fields.map((field)=>{
        const Icon = field.icon;
        return (
          <div key={field.key} className="space-y-1 mt-5">
            <lable className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <Icon className="size-4"/>
              {field.label}
              {field.required && <span className="text-red-500">*</span>}
            </lable>
            <input
              type={field.type}
              value={data[field.key] || ""}
              onChange={(e) => handleChange(field.key, e.target.value)}
              className="mt-1 w-full px-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-sm"
              placeholder={`Enter your ${field.label.toLowerCase()}`} required={field.required}/>
            </div>
        )
      })}

    </div>
  );
};

export default Personalinfoform;