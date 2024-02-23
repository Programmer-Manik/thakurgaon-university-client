import { Button, Dropdown, Table, TableColumnsType, Tag } from "antd";
import { useGetAllRegisteredSemestersQuery } from "../../../redux/features/admin/courseManagement.api";
import moment from "moment";
import { tSemester } from "../../../types";

export type TTableData = Pick<tSemester, "startDate" | "endDate" | "status">;

const items = [
  {
    label:'Upcoming',
    key: "UPCOMING",
  },
  {
    label:'Ongoing',
    key: "ONGOING",
  },
  {
    label:'Ended',
    key: "ENDED",
  }
]


const RegisteredSemesters = () => {
  // const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);

  const {
    data: semesterData,
    isFetching,
  } = useGetAllRegisteredSemestersQuery(undefined);

  const tableData = semesterData?.data?.map(
    ({ _id, academicSemester, startDate, endDate, status }) => ({
      key: _id,
      name: `${academicSemester.name} ${academicSemester.year}`,
      startDate: moment(new Date(startDate)).format("MMMM"),
      endDate: moment(new Date(endDate)).format("MMMM"),
      status,
    })
  );

  const handleStatusDropdown  = (data) => {
    console.log(data)
  }
  const menuProps = {
    items, handleStatusDropdown,
    onclick:handleStatusDropdown,
  }

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "status",
      key: "status",
      dataIndex: "status",
      render : (item) => {
        let color;
        if(item === 'UPCOMING'){
          color="blue"
        }
        if(item === 'ONGOING'){
          color="green"
        }
        if(item === 'ENDED'){
          color="red"
        }
        return <Tag color={color}>{item}</Tag>
      }
    },
    {
      title: "Start Date",
      key: "startDate",
      dataIndex: "startDate",
    },
    {
      title: "End Date",
      key: "endDate",
      dataIndex: "endDate",
    },
    {
      title: "Action",
      key: "x",
      render: () => {
        return (
          <Dropdown menu={menuProps}>
            <Button>Update</Button>
          </Dropdown>
        );
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

export default RegisteredSemesters;
