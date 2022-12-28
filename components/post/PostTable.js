import { ExportOutlined } from "@ant-design/icons";
import { Button, Input, Select } from "antd";
import FormatDatetime from "helpers/formatDatetime";
import { useState, useEffect, lazy, useRef } from "react";
import { postService } from "services";
const ProTable = lazy(() => import("@ant-design/pro-table"));

function PostTable() {
  const [data, setData] = useState(null);
  const [total, setTotal] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sorter, setSorter] = useState(null);
  // const [load, setLoad] = useState(false);
  const [filter, setFilter] = useState({});
  const inputRefTitle = useRef(null);
  
  useEffect(() => {
    var page = 1;
    var limit = 10;
    var skip = (page - 1) * limit;
    postService.getPost(limit, skip).then((x) => {
      setData(x.data);
      setTotal(x.total);
    });
  }, []);

  const loadData = (query) => {
    console.log("query", query);
    setLimit(query.limit);
    setPage(query.page);
    setSorter(query.sorter);
  };
  useEffect(() => {
    var skip = (page - 1) * limit;
    postService.getPost(limit, skip, sorter, filter).then((x) => {
      setData(x.data);
      setTotal(x.total);
    });
  }, [limit, page, sorter, filter]);
  const columns = [
    {
      title: "Title",
      width: 100,
      dataIndex: "title",
      key: "title",
      fixed: "left",
      sorter: true,
    },
    {
      title: "content",
      width: 300,
      dataIndex: "content",
      key: "content",
      fixed: "left",
      sorter: true,
    },
    {
      title: "image",
      dataIndex: "image",
      key: "image",
      width: 150,
      sorter: true,
    },
    {
      title: "location",
      dataIndex: "location",
      key: "location",
      width: 150,
      sorter: true,
    },
    {
      title: "create",
      dataIndex: "create",
      key: "create",
      width: 150,
      sorter: true,
    },
    {
      title: "dateCreated",
      dataIndex: "dateCreated",
      key: "dateCreated",
      width: 150,
      sorter: true,
      render: (dateCreated) => {
        return <p>{FormatDatetime(dateCreated)}</p>;
      },
    },
    {
      title: "dateUpdate",
      dataIndex: "dateUpdate",
      key: "dateUpdate",
      width: 150,
      sorter: true,
      render: (dateUpdate) => {
        return <p>{FormatDatetime(dateUpdate)}</p>;
      },
    },
    {
      title: "active",
      dataIndex: "active",
      key: "active",
      width: 150,
      sorter: true,
      render: (active) => {
        return <p>{active ? "true" : "false"}</p>;
      },
    },
  ];
  const onReset = () => {
    console.log("onReset");
  };
  const search = () => {
    setFilter({
      ...filter,
      title: inputRefTitle.current.input.value,
    });
  };
  const changeSelect =(value)=>{
    filter.active=value?value:""
    setFilter(filter)
  }
  return (
    <ProTable
      rowSelection={{
        selections: true,
        columnTitle: false,
      }}
      search={false}
      headerTitle="PAGE LIST "
      columns={columns}
      onReset={onReset}
      dataSource={data}
      rowKey="title"
      toolBarRender={() => [
        <Input
          ref={inputRefTitle}
          type="text"
          id="title"
          name="title"
          placeholder="Title"
        />,
        <Select
          id="select"
          onChange={changeSelect}
          style={{ width: 120 }}
          allowClear
          placeholder="Active"
          options={[
            {
              value: "true",
              label: "true",
            },
            {
              value: "false",
              label: "false",
            },
          ]}
        />,
        // <Input ref={inputRef} type="text" id="title" name="title" placeholder="Title" />,
        // <Input ref={inputRef} type="text" id="title" name="title" placeholder="Title" />,

        <Button type="primary" key="primary" onClick={search}>
          Tìm kiếm
        </Button>,
        <Button icon={<ExportOutlined />}>xuất</Button>,
      ]}
      pagination={{
        pageSizeOptions: [5, 10, 15],
        total: total,
        pageSize: limit || 10,
        current: page,
        showQuickJumper: true,
        showSizeChanger: true,
      }}
      onChange={({ current, pageSize }, filter, sorter, extra) => {
        loadData({
          page: current,
          limit: pageSize,
          sorter: {
            column: sorter.field,
            order: sorter.order,
          },
        });
      }}
    />
  );
}
export default PostTable;
