import { useParams } from "react-router-dom";

const StudentDetails = () => {
   const {studentId} = useParams();
  return (
    <div>
      <h2>this is student details of {studentId}</h2>
    </div>
  );
};

export default StudentDetails;
