import { Button, Col, Flex } from "antd";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import { useGetAcademicFacultiesQuery } from "../../../redux/features/admin/academicManagement.api";
import PHSelectWithWatch from "../../../components/form/PHSelectWithWatch";

const OfferCourse = () => {
  const { data: academicFacultyData } = useGetAcademicFacultiesQuery(undefined)

  const AcademicSemesterOptions = academicFacultyData?.data?.map((item)=>({
    value:item._id,
    label:item.name,
  }))

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm onSubmit={onSubmit}>
          <PHSelectWithWatch
            label="Academic Semester"
            name="academicSemester"
            options={AcademicSemesterOptions}
          />
          <PHInput type="text" name="test" label="test" />
          <Button htmlType="submit">submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default OfferCourse;
