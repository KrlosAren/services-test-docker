import React, { useContext, useEffect, useState } from "react";
import { deleteStudent, getAllStudents } from "../api";
import { AuthContext } from "../context/auth/AuthProvider";
import { StudentContext } from "../context/studentsProvider/StudentsContext";
import { studentsType } from "../types/studentsType";
import NewStudentModal from "../ui/NewStudentModal";

const Home = () => {
  const { dispatch, studentState } = useContext(StudentContext);
  const [student, setStudent] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [isOpen, setToggle] = useState(false);
  const [buttons, setButtons] = useState(false);
  const handleOpenModal = () => {
    setToggle(!isOpen);
  };

  const { isAuth } = useContext(AuthContext);

  useEffect(() => {
    getAllStudents()
      .then((resp) => {
        console.log(resp);
        dispatch({
          type: studentsType.ALL_STUDENTS,
          payload: resp,
        });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(console.log("finally"));
  }, []);

  const handleDelete = (studentId) => {
    setButtons(true);
    deleteStudent(studentId)
      .then((resp) => {
        if (resp.status === 204) {
          dispatch({
            type: studentsType.DELETE_STUDENT,
            payload: { id: studentId },
          });
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setButtons(false);
      });
  };

  const handleEdit = (student) => {
    console.log("edit");
    setIsEdit(true);
    setStudent(student);
    handleOpenModal();
  };

  if (!isAuth) {
    return (
      <div>
        <p>....cargando</p>
      </div>
    );
  }

  return (
    <>
      <h1>Home</h1>
      <NewStudentModal
        isEdit={isEdit}
        student={student}
        isOpen={isOpen}
        setToggle={handleOpenModal}
        handleOpenModal={handleOpenModal}
      />
      <hr />
      {/* <button onClick={() => initializeWebSocket()}>Connect</button> */}
      <div>
        <h2>Students</h2>
        <table
          style={{
            width: "100%",
            textAlign: "center",
          }}
        >
          <thead>
            <tr>
              <td>#</td>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Age</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {studentState.students.map((student) => (
              <tr key={student.pk}>
                <td>{student.pk}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.phone}</td>
                <td>{student.address}</td>
                <td>{student.age}</td>
                <td>
                  <button onClick={() => handleEdit(student)}>Edit</button>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(student.pk)}
                    disabled={buttons}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Home;
