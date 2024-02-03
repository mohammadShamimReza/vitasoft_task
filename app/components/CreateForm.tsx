"use client";
import { useState } from "react";

interface CreateFormProps {
  onCreate: (data: { name: string }) => void;
}

const CreateForm: React.FC<CreateFormProps> = ({ onCreate }) => {
  const [formData, setFormData] = useState({ name: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate(formData);
    setFormData({ name: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow-md mb-4">
      <label className="block mb-2">
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </label>
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded"
      >
        Create
      </button>
    </form>
  );
};

export default CreateForm;
