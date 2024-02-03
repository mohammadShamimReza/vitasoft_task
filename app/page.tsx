"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import CreateForm from "./components/CreateForm";
import EditForm from "./components/EditForm";
import RecordList from "./components/RecordList";

const Home: React.FC = () => {
  const [records, setRecords] = useState<
    {
      id: number;
      name: string;
      publication: string;
      genre: string;
      price: number;
    }[]
  >([]);
  const [editingRecord, setEditingRecord] = useState<{
    id: number;
    name: string;
    publication: string;
    genre: string;
    price: number;
  } | null>(null);

  useEffect(() => {
    // Fetch records from the API when the component mounts
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get<
        {
          id: number;
          name: string;
          publication: string;
          genre: string;
          price: number;
        }[]
      >("/api"); // Adjust the API endpoint
      setRecords(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleCreate = async (newRecord: { name: string }) => {
    try {
      toast.loading("New Book creating", { duration: 1000 });

      await axios.post("/api", newRecord); // Adjust the API endpoint
      fetchData();

      toast.success("New Book creating successfully");
    } catch (error) {
      console.error("Error creating record:", error);
    }
  };

  const handleEdit = async (
    updatedRecord: {
      id: number;
      name: string;
      publication: string;
      genre: string;
      price: number;
    } | null
  ) => {
    try {
      toast.loading(" Book updating", { duration: 1000 });

      await axios.put(`/api`, updatedRecord);
      setEditingRecord(null);
      fetchData();
      toast.success("Book updated successfully");
    } catch (error) {
      console.error("Error updating record:", error);
    }
  };

  const handleDelete = async (recordId: number) => {
    const Id = { id: recordId };
    try {
      toast.loading("Book Deleting", { duration: 1000 });
      await axios.delete(`/api`, { data: { id: recordId } });
      fetchData();
      toast.success("Book deleted successfully");
    } catch (error) {
      console.error("Error deleting record:", error);
    }
  };

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <Toaster />

      <h1 className="text-3xl font-bold mb-4 text-center">
        Book Management System
      </h1>
      <CreateForm onCreate={handleCreate} />
      {editingRecord && <EditForm record={editingRecord} onEdit={handleEdit} />}
      <br />
      <RecordList
        records={records}
        onDelete={handleDelete}
        onEdit={setEditingRecord}
      />
    </div>
  );
};

export default Home;
