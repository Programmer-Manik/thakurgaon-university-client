import { Button, Modal, Table } from "antd";
import { useGetAllCoursesQuery } from "../../../redux/features/admin/courseManagement.api";
import { useState } from "react";
import PHForm from "../../../components/form/PHForm";
import PHSelect from "../../../components/form/PHSelect";
import { useGetAllFacultiesQuery } from "../../../redux/features/admin/userManagement.api";

const Courses = () => {
  // const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);

  const { data: courses, isFetching } = useGetAllCoursesQuery(undefined);

  const tableData = courses?.data?.map(({ _id, title, prefix, code }) => ({
    key: _id,
    title,
    code: `${prefix}${code}`,
  }));

  const columns = [
    {
      title: "title",
      key: "title",
      dataIndex: "title",
    },

    {
      title: "code",
      key: "code",
      dataIndex: "code",
    },
    {
      title: "Action",
      key: "x",
      render: (item) => {
        return <AddFacultyModal data={item} />;
      },
    },
  ];

  // const onChange: TableProps<TTableData>['onChange'] = (
  //   _pagination,
  //   filters,
  //   _sorter,
  //   extra
  // ) => {
  //   if (extra.action === 'filter') {
  //     const queryParams: TQueryParam[] = [];

  //     setParams(queryParams);
  //   }
  // };

  return (
    <Table
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
      // onChange={onChange}
    />
  );
};

const AddFacultyModal = (data) => {
  console.log(data.key);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {data:facultyData} = useGetAllFacultiesQuery(undefined)
  console.log(facultyData)

  const facultiesOptions = facultyData?.data?.map((item) => ({
    value:item._id,
    label:item.fullName,
  }))

  const handleSubmit = (data) => {
    console.log(data)
  }
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk}>
        <PHForm onSubmit={handleSubmit}>
          <PHSelect
            mode='multiple'  
            options={facultiesOptions} 
            name="faculties" 
            label="faculties"
          >
          <Button htmlType="submit">submit</Button>
        </PHForm>
      </Modal>
    </>
  );
};

export default Courses;
