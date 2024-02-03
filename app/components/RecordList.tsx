"use client";
interface RecordListProps {
  records: { id: number; name: string }[];
  onDelete: (id: number) => void;
  onEdit: (record: { id: number; name: string }) => void;
}

const RecordList: React.FC<RecordListProps> = ({
  records,
  onDelete,
  onEdit,
}) => {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {records.map((record) => (
        <li key={record.id} className="bg-white p-4 shadow-md rounded-md">
          {record.name}
          <div className="flex justify-end mt-2">
            <button
              onClick={() => onEdit(record)}
              className="bg-blue-500 text-white py-1 px-2 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(record.id)}
              className="bg-red-500 text-white py-1 px-2 ml-2 rounded"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default RecordList;
