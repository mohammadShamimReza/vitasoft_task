"use client";
import { useEffect, useState } from "react";

interface EditFormProps {
  record: { id: number; name: string };
  onEdit: (data: { id: number; name: string }) => void;
}

const EditForm: React.FC<EditFormProps> = ({ record, onEdit }) => {
  const [formData, setFormData] = useState(record);

  useEffect(() => {
    setFormData(record);
  }, [record]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onEdit(formData);
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
        className="bg-green-500 text-white py-2 px-4 rounded"
      >
        Update
      </button>
    </form>
  );
};

export default EditForm;
