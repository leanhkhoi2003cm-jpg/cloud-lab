import { useEffect, useState } from "react";

const API_URL =
  "/api/students";

function App() {
  const [students, setStudents] = useState([]);

  const [studentId, setStudentId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Câu 47: Lấy danh sách sinh viên
  const getStudents = async () => {
    try {
      const res = await fetch(API_URL);

      if (!res.ok) {
        throw new Error("Không thể lấy danh sách sinh viên");
      }

      const data = await res.json();
      setStudents(data);
    } catch (error) {
      console.error("Lỗi GET:", error);
    }
  };

  useEffect(() => {
    getStudents();
  }, []);

  // Câu 49: Thêm sinh viên
  const addStudent = async () => {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentId: studentId,
          name: name,
          email: email,
        }),
      });

      if (!res.ok) {
        throw new Error("Không thể thêm sinh viên");
      }

      const data = await res.json();

      console.log("Đã thêm sinh viên:", data);

      // Lấy lại danh sách sau khi thêm
      getStudents();

      // Xóa dữ liệu trong form
      setStudentId("");
      setName("");
      setEmail("");
    } catch (error) {
      console.error("Lỗi POST:", error);
    }
  };

  return (
    <div>
      <h1>Danh sách sinh viên</h1>

      {/* Hiển thị danh sách */}
      {students.length === 0 ? (
        <p>Chưa có sinh viên</p>
      ) : (
        students.map((student) => (
          <div key={student._id}>
            <p>MSSV: {student.studentId}</p>
            <p>Họ tên: {student.name}</p>
            <p>Email: {student.email}</p>
            <hr />
          </div>
        ))
      )}

      <h2>Thêm sinh viên</h2>

      <input
        placeholder="MSSV"
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
      />

      <br />
      <br />

      <input
        placeholder="Họ tên"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br />
      <br />

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br />
      <br />

      <button onClick={addStudent}>Thêm sinh viên</button>
    </div>
  );
}

export default App;