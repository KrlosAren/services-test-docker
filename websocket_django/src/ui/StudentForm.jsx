import React, { useEffect, useState } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { createStudent, updatedStudent } from "../api";
const initialForm = {
  pk: "",
  name: "",
  email: "",
  phone: "",
  address: "",
  age: "",
};

const StudentForm = ({ student, isEdit }) => {
  const [form, setForm] = useState(initialForm);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isEdit) {
      createStudent(form);
    } else {
      updatedStudent(form);
    }
    // dispatch({
    //   type: studentsType.EDIT_STUDENT,
    //   payload: student,
    // });
    // socketSendMessage({
    //   message: form,
    // });
  };

  useEffect(() => {
    console.log("student form");
    if (student) {
      setForm(student);
    } else {
      setForm(initialForm);
    }
  }, [student]);

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="name">Name:</Label>
        <Input
          type="text"
          name="name"
          onChange={handleChange}
          value={form.name}
        />
      </FormGroup>
      <FormGroup>
        <Label for="email">Email:</Label>
        <Input
          type="email"
          name="email"
          onChange={handleChange}
          value={form.email}
        />
      </FormGroup>
      <FormGroup>
        <Label for="phone">Phone:</Label>
        <Input
          type="text"
          name="phone"
          onChange={handleChange}
          value={form.phone}
        />
      </FormGroup>
      <FormGroup>
        <Label for="address">Address:</Label>
        <Input
          type="text"
          name="address"
          onChange={handleChange}
          value={form.address}
        />
      </FormGroup>
      <FormGroup>
        <Label for="age">Age:</Label>
        <Input
          type="number"
          name="age"
          onChange={handleChange}
          value={form.age}
        />
      </FormGroup>
      <Button>Send</Button>
    </Form>
  );
};

export default StudentForm;
