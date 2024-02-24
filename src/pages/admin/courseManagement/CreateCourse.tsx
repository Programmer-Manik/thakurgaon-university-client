import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { Button, Col, Flex } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { toast } from "sonner";
import PHInput from "../../../components/form/PHInput";
import {  useAddCoursesMutation, useGetAllCoursesQuery } from "../../../redux/features/admin/courseManagement.api";
import { TResponse } from "../../../types";

const CreateCourse = () => {
 
  const [CreateCourse] = useAddCoursesMutation();

  const { data: Courses } = useGetAllCoursesQuery(undefined)

  const preRequisiteCoursesOption = Courses?.data?.map((item) => ({
    value: item._id,
    label: item.title,
  }));
  console.log(Courses);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");

    const coursesData = {
      ...data,
      code :Number(data.code),
      credits:Number(data.credits),
      isDeleted:false,
      preRequisiteCourses :data.preRequisiteCourses ? data.preRequisiteCourses?.map((item) => ({
        Courses:item,
        isDeleted:false,
      })): [],
    };

    console.log(coursesData);

    try {
      const res = (await CreateCourse(coursesData)) as TResponse<any>;
      console.log(res);
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Semester created", { id: toastId });
      }
    } catch (err) {
      toast.error("Something went wrong", { id: toastId });
    }

  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm onSubmit={onSubmit}>
          <PHInput type="text" name="title" label="title" />
          <PHInput type="text" name="prefix" label="prefix" />
          <PHInput type="text" name="code" label="code" />
          <PHInput type="text" name="credits" label="credits" />
          <PHSelect mode="multiple" name="preRequisiteCourses"  options={preRequisiteCoursesOption} label="preRequisiteCourses"/>
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};
export default CreateCourse;
