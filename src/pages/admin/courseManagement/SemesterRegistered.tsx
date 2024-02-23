import { FieldValues, SubmitHandler } from 'react-hook-form';
import PHForm from '../../../components/form/PHForm';
import { Button, Col, Flex } from 'antd';
import PHSelect from '../../../components/form/PHSelect';
import {  semesterStatusOptions } from '../../../constants/semester';
import { toast } from 'sonner';
import { TResponse } from '../../../types/global';
import { useGetAllSemestersQuery } from '../../../redux/features/admin/academicManagement.api';
import PHDatePicker from '../../../components/form/PHDatePicker';
import PHInput from '../../../components/form/PHInput';
import { useAddRegisterSemesterMutation } from '../../../redux/features/admin/courseManagement.api';


const SemesterRegistered = () => {
  const [addSemester]= useAddRegisterSemesterMutation()
   const {data:academicSemester} = useGetAllSemestersQuery([
    {name:'sort', value:'year'}
  ])
   const academicSemesterOption = academicSemester?.data?.map((item)=> ({
      value: item._id,
      label:`${item.name} ${item.year}`
   }))
   console.log(academicSemester)

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading('Creating...');

    const semesterData = {
     ...data,
     minCredit:Number(data.minCredit),
     maxCredit:Number(data.maxCredit)
    };

    console.log(semesterData)

    try {
      const res = (await addSemester(semesterData)) as TResponse<any>;
      console.log(res);
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success('Semester created', { id: toastId });
      }
    } catch (err) {
      toast.error('Something went wrong', { id: toastId });
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm
          onSubmit={onSubmit}
        >
          <PHSelect label="Name" name="name" options={academicSemesterOption} />
          <PHSelect
            label="status"
            name="Status"
            options={semesterStatusOptions}
          />
          <PHDatePicker name='startDate' label='Start Date'/>
          <PHDatePicker name='endDate' label='end Date'/>
          <PHInput type='text' name='minCredit' label='min Credit'/>
          <PHInput type='text' name='maxCredit' label='max Credit'/>

          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};
export default SemesterRegistered ;

