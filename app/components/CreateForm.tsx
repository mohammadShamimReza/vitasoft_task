"use client";
import { useState } from "react";

interface CreateFormProps {
  onCreate: (data: {
    name: string;
    publication: string;
    genre: string;
    price: number;
  }) => void;
}

const CreateForm: React.FC<CreateFormProps> = ({ onCreate }) => {
  const [formData, setFormData] = useState({
    name: "",
    publication: "",
    genre: "",
    price: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate(formData);
    setFormData({ name: "", publication: "", genre: "", price: 0 });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-white shadow-md mb-4 rounded-lg"
    >
      <label className="block mb-2">
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          required={true}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </label>
      <label className="block mb-2">
        Publication:
        <input
          type="text"
          name="publication"
          required={true}
          value={formData.publication}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </label>
      <label className="block mb-2">
        Genre:
        <input
          type="text"
          name="genre"
          required={true}
          value={formData.genre}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </label>
      <label className="block mb-2">
        Price:
        <input
          type="number"
          name="price"
          required={true}
          value={formData.price}
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
