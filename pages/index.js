import { Carousel, Table } from "antd";
import LiveShow from "components/Home/LiveShow";
import FormatDatetime from "helpers/formatDatetime";
import { useState, useEffect } from "react";

import { userService } from "services";

export default Home;

function Home() {
  // const [users, setUsers] = useState(null);

  // useEffect(() => {
  //   userService.getAll().then((x) => setUsers(x));
  // }, []);
  // const columns = [
  //   {
  //     title: "Email",
  //     width: 100,
  //     dataIndex: "email",
  //     key: "email",
  //     fixed: "left",
  //   },
  //   {
  //     title: "address",
  //     width: 100,
  //     dataIndex: "address",
  //     key: "address",
  //     fixed: "left",
  //   },
  //   {
  //     title: "role",
  //     dataIndex: "role",
  //     key: "role",
  //     width: 150,
  //   },

  //   {
  //     title: "create",
  //     dataIndex: "create",
  //     key: "create",
  //     width: 150,
  //     render: (create) => {
  //       return <p>{FormatDatetime(create)}</p>;
  //     },
  //   },
  //   {
  //     title: "update",
  //     dataIndex: "update",
  //     key: "update",
  //     width: 150,
  //     render: (update) => {
  //       return <p>{FormatDatetime(update)}</p>;
  //     },
  //   },
  //   {
  //     title: "active",
  //     dataIndex: "active",
  //     key: "active",
  //     width: 150,
  //     render: (active) => {
  //       return <p>{active ? "true" : "false"}</p>;
  //     },
  //   },
  // ];

  return (
    // <Table
    //   columns={columns}
    //   dataSource={users}
    //   pagination={{
    //     defaultPageSize: 10,
    //     showSizeChanger: true,
    //     pageSizeOptions: ["5", "10", "15"],
    //     total: 20,
    //   }}

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
    //   scroll={
    //     {
    //       //   x: 1500,
    //       //   y: 300,
    //     }
    //   }
    // />
    // <Carousel autoplay>
    //   <div>
    //     <h3 style={contentStyle}>1</h3>
    //   </div>
    //   <div>
    //     <h3 style={contentStyle}>2</h3>
    //   </div>
    //   <div>
    //     <h3 style={contentStyle}>3</h3>
    //   </div>
    //   <div>
    //     <h3 style={contentStyle}>4</h3>
    //   </div>
    // </Carousel>
    <LiveShow/>
  );
}
