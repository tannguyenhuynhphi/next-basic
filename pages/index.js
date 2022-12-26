import { Table } from "antd";
import FormatDatetime from "helpers/formatDatetime";
import { useState, useEffect } from "react";

import { userService } from "services";

export default Home;

function Home() {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    userService.getAll().then((x) => setUsers(x));
  }, []);
  const columns = [
    {
      title: "Email",
      width: 100,
      dataIndex: "email",
      key: "email",
      fixed: "left",
    },
    {
      title: "address",
      width: 100,
      dataIndex: "address",
      key: "address",
      fixed: "left",
    },
    {
      title: "role",
      dataIndex: "role",
      key: "role",
      width: 150,
    },

    {
      title: "create",
      dataIndex: "create",
      key: "create",
      width: 150,
      render: (create) => {
        return <p>{FormatDatetime(create)}</p>;
      },
    },
    {
      title: "update",
      dataIndex: "update",
      key: "update",
      width: 150,
      render: (update) => {
        return <p>{FormatDatetime(update)}</p>;
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

  FormatDatetime;
  return (
    <Table
      columns={columns}
      dataSource={users}
      pagination={{
        defaultPageSize: 10,
        showSizeChanger: true,
        pageSizeOptions: ["10", "20", "30"],
      }}
      scroll={
        {
          //   x: 1500,
          //   y: 300,
        }
      }
    />
  );
}
