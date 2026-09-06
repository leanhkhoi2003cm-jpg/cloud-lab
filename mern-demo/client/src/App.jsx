import { useEffect, useState } from "react";

const API_URL = "/api/students";

function App() {
  const [students, setStudents] = useState([]);
  const [studentId, setStudentId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editingId, setEditingId] = useState(null);

  const loadStudents = async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    setStudents(data);
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const studentData = {
      studentId,
      name,
      email
    };

    if (editingId) {
      await fetch(`${API_URL}/${editingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(studentData)
      });

      alert("Đã cập nhật sinh viên");
    } else {
      await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(studentData)
      });

      alert("Đã thêm sinh viên");
    }

    setStudentId("");
    setName("");
    setEmail("");
    setEditingId(null);

    loadStudents();
  };

  const handleEdit = (student) => {
    setEditingId(student._id);
    setStudentId(student.studentId);
    setName(student.name);
    setEmail(student.email);
  };
  const handleDelete = async (id) => {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });

  alert("Đã xóa sinh viên");
  loadStudents();
};

  return (
    <div>
      <h1>Danh sách sinh viên</h1>

      {students.map((student) => (
        <div key={student._id}>
          <p>MSSV: {student.studentId}</p>
          <p>Họ tên: {student.name}</p>
          <p>Email: {student.email}</p>

          <button onClick={() => handleEdit(student)}>
            Sửa
          </button>
          <button onClick={() => handleDelete(student._id)}>
  Xóa
</button>

          <hr />
        </div>
      ))}

      <h2>
        {editingId ? "Cập nhật sinh viên" : "Thêm sinh viên"}
      </h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="MSSV"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
        />

        <br />

        <input
          placeholder="Họ tên"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <br />

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <br />

        <button type="submit">
          {editingId ? "Cập nhật sinh viên" : "Thêm sinh viên"}
        </button>
      </form>
    </div>
  );
}

export default App;