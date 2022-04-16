import { studentsType } from "../../types/studentsType";

export const studentReducer = (state, action) => {
  switch (action.type) {
    case studentsType.SET_STUDENT:
      console.log("set");
      return {
        ...state,
        students: [action.payload, ...state.students],
      };

    case studentsType.ALL_STUDENTS:
      return {
        ...state,
        students: [...action.payload],
      };

    case studentsType.UPDATE_STUDENT:
      const updatedStudents = state.students.map((student) => {
        if (student.pk === action.payload.pk) {
          return action.payload;
        }
        return student;
      });
      return {
        ...state,
        students: [...updatedStudents],
      };

    case studentsType.EDIT_STUDENT:
      return {
        ...state,
        student: action.payload,
      };

    case studentsType.DELETE_STUDENT:
      const activeStudents = state.students.filter(
        (student) => student.pk !== action.payload.pk
      );
      return {
        ...state,
        students: [...activeStudents],
      };

    case studentsType.SET_DISABLED_BUTTONS:
      return {
        ...state,
        disabled: action.payload,
      };

    default:
      return state;
  }
};
