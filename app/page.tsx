"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import CreateForm from "./components/CreateForm";
import EditForm from "./components/EditForm";
import RecordList from "./components/RecordList";

const Home: React.FC = () => {
  const [records, setRecords] = useState<{ id: number; name: string }[]>([]);
  const [editingRecord, setEditingRecord] = useState<{
    id: number;
    name: string;
  } | null>(null);

  useEffect(() => {
    // Fetch records from the API when the component mounts
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get<{ id: number; name: string }[]>("/api"); // Adjust the API endpoint
      setRecords(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleCreate = async (newRecord: { name: string }) => {
    try {
      await axios.post("/api", newRecord); // Adjust the API endpoint
      fetchData();
    } catch (error) {
      console.error("Error creating record:", error);
    }
  };

  const handleEdit = async (updatedRecord: { id: number; name: string }) => {
    try {
      await axios.put(`/api`, updatedRecord); // Adjust the API endpoint
      setEditingRecord(null);
      fetchData();
    } catch (error) {
      console.error("Error updating record:", error);
    }
  };

  const handleDelete = async (recordId: number) => {
    const Id = { id: recordId };
    try {
      await axios.delete(`/api`, { data: { id: recordId } }); // Adjust the API endpoint
      fetchData();
    } catch (error) {
      console.error("Error deleting record:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Record Management System</h1>
      <CreateForm onCreate={handleCreate} />
      {editingRecord && <EditForm record={editingRecord} onEdit={handleEdit} />}
      <RecordList
        records={records}
        onDelete={handleDelete}
        onEdit={setEditingRecord}
      />
    </div>
  );
};

export default Home;
