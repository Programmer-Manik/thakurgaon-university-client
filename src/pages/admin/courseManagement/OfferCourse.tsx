import { Button, Col, Flex } from "antd";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import { useGetAcademicFacultiesQuery } from "../../../redux/features/admin/academicManagement.api";
import PHSelectWithWatch from "../../../components/form/PHSelectWithWatch";
import { useState } from "react";
import PHSelect from "../../../components/form/PHSelect";

const OfferCourse = () => {
  const [id, setId] = useState("");
  console.log("inside parent components", id);
  const { data: academicFacultyData } = useGetAcademicFacultiesQuery(undefined);

  const AcademicSemesterOptions = academicFacultyData?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm onSubmit={onSubmit}>
          <PHSelectWithWatch
            onValueChange={setId}
            label="Academic Semester"
            name="academicSemester"
            options={AcademicSemesterOptions}
          />
          <PHSelect options={} name="course" label="Course" />
          <PHSelect options={[]} name="faculty" label="Faculty" />
          <PHInput type="text"  name="section" label="section" />
          <PHInput type="text"  name="maxCapacity" label="Max Capacity" />
          <PHSelect
          mode="multiple"
          options={}
          name="days"
          label="Days"
          />
          <PHTimePicker name='startTime' label="start time" />
          <PHTimePicker name='endTime' label="end time" />
          <Button htmlType="submit">submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default OfferCourse;
