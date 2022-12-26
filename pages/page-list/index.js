import { Table } from "antd";
import FormatDatetime from "helpers/formatDatetime";
import { useState, useEffect } from "react";

import { postService } from "services";

function PageList() {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    postService.getPost().then((x) => setUsers(x));
  }, []);
  const columns = [
    {
      title: "title",
      width: 100,
      dataIndex: "title",
      key: "title",
      fixed: "left",
    },
    {
      title: "content",
      width: 500 ,
      dataIndex: "content",
      key: "content",
      fixed: "left",
    },
    {
      title: "image",
      dataIndex: "image",
      key: "image",
      width: 150,
    },
    {
      title: "location",
      dataIndex: "location",
      key: "location",
      width: 150,
    },
    {
      title: "create",
      dataIndex: "create",
      key: "create",
      width: 150,
    },
    {
      title: "dateCreated",
      dataIndex: "dateCreated",
      key: "dateCreated",
      width: 150,
      render: (dateCreated) => {
        return <p>{FormatDatetime(dateCreated)}</p>;
      },
    },
    {
      title: "dateUpdate",
      dataIndex: "dateUpdate",
      key: "dateUpdate",
      width: 150,
      render: (dateUpdate) => {
        return <p>{FormatDatetime(dateUpdate)}</p>;
      },
    },
    {
      title: "active",
      dataIndex: "active",
      key: "active",
      width: 150,
      render: (active) => {
        return <p>{active ? "true" : "false"}</p>;
      },
    },
  ];


  return (
    <Table
      columns={columns}
      dataSource={users}
      pagination={{
        defaultPageSize: 10,
        showSizeChanger: true,
        pageSizeOptions: ["5", "10", "15"],
        total: 20
      }}

    //   pagination={{
    //     pageSizeOptions: [1, 2, 10],
    //     total: state.total,
    //     pageSize: state.query.limit || 10,
    //     current: parseInt(state.query.page),
    //     showQuickJumper: true,
    //     showSizeChanger: true,
    //   }}
    //   onChange={({ current, pageSize }, filter, sorter: any, extra) => {
    //     updateQuery({
    //       page: current,
    //       limit: pageSize,
    //       sorter: {
    //         column: sorter.field,
    //         order: sorter.order,
    //       },
    //     });
    //   }}
      scroll={
        {
            x: 2000,
          //   y: 300,
        }
      }
    />
  );
}
export default PageList;