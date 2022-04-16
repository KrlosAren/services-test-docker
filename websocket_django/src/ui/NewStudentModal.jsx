import React from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import StudentForm from "./StudentForm";

const NewStudentModal = ({
  isOpen,
  setToggle,
  handleOpenModal,
  student,
  isEdit,
}) => {
  return (
    <>
      <button onClick={handleOpenModal}>Add Student</button>
      <Modal isOpen={isOpen} toggle={setToggle}>
        <ModalHeader toggle={setToggle}></ModalHeader>
        <ModalBody>
          <StudentForm
            title={"New Student"}
            student={student}
            isEdit={isEdit}
          ></StudentForm>
        </ModalBody>
      </Modal>
    </>
  );
};

export default NewStudentModal;
