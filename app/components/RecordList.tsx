"use client";
import React from "react";

interface RecordListProps {
  records: {
    id: number;
    name: string;
    publication: string;
    genre: string;
    price: number;
  }[];
  onDelete: (id: number) => void;
  onEdit: (record: {
    id: number;
    name: string;
    publication: string;
    genre: string;
    price: number;
  }) => void;
}

const RecordList: React.FC<RecordListProps> = ({
  records,
  onDelete,
  onEdit,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {records.map((record) => (
        <div key={record.id} className="bg-white p-4 shadow-md rounded-md">
          <h2 className="text-lg font-semibold">{record.name}</h2>
          <p className="text-gray-500 mb-2">{record.genre}</p>
          <p className="text-gray-500 mb-2">
            Publication: {record.publication}
          </p>
          <p className="text-gray-500 mb-2">Price: ${record.price}</p>
          <div className="flex justify-end mt-4">
            <button
              onClick={() => onEdit(record)}
              className="bg-blue-500 text-white py-2 px-4 rounded mr-2 hover:bg-blue-600"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(record.id)}
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecordList;
