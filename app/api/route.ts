// This is a simplified example. In a real-world scenario, you would connect to a database.
interface Record {
  id: number;
  name: string;
}

const records: Record[] = [
  { id: 1, name: "Record 1" },
  { id: 2, name: "Record 2" },
  // Add more records as needed
];

export async function GET(request: Request) {
  // Return all records
  return new Response(JSON.stringify(records), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(request: Request) {
  // Create a new record
  const newRecord: Record = {
    id: records.length + 1,
    ...JSON.parse(await request.text()),
  };
  records.push(newRecord);
  return new Response(JSON.stringify(newRecord), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}

export async function PUT(request: Request) {
  const steemData = await request.json();
  const id = steemData.id;

  if (id) {
    const updatedRecord = records.find(
      (record) => record.id === parseInt(id, 10)
    );
    console.log(updatedRecord, "this is updated record");

    if (updatedRecord) {
      Object.assign(updatedRecord, steemData);
      return new Response(JSON.stringify(updatedRecord), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } else {
      return new Response(JSON.stringify({ message: "Record not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }
  } else {
    return new Response(JSON.stringify({ message: "Invalid request" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function DELETE(request: Request) {
  const steemData = await request.json();
  const id = steemData.id;

  console.log(id, "from delte");

  if (id) {
    const index = records.findIndex((record) => record.id === parseInt(id, 10));

    if (index !== -1) {
      const deletedRecord = records.splice(index, 1)[0];
      return new Response(JSON.stringify(deletedRecord), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } else {
      return new Response(JSON.stringify({ message: "Record not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }
  } else {
    return new Response(JSON.stringify({ message: "Invalid request" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}
