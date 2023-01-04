import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExportOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Input, Select, Tag } from "antd";
import { FormatDatetime, FormatRangePicker } from "helpers/formatDatetime";
import { useState, useEffect, lazy, useRef } from "react";
import { postService } from "services";
import { DatePicker, Space } from "antd";
import { useTranslation } from "react-i18next";
import PostModal from "./PostModal";

const ProTable = lazy(() => import("@ant-design/pro-table"));

function PostTable() {
  const { t } = useTranslation();
  const [data, setData] = useState(null);
  const [total, setTotal] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sorter, setSorter] = useState(null);
  const [range, setRange] = useState(null);
  // const [load, setLoad] = useState(false);
  const [filter, setFilter] = useState({});
  const inputRefTitle = useRef(null);
  //RangePicker

  const { RangePicker } = DatePicker;
  const state = { startDate: new Date(), endDate: "" };

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
      dataIndex: ["userPost", "name"],
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
        return (
          <p>
            {active ? (
              <Tag icon={<CheckCircleOutlined />} color="success">
                Hoạt Động
              </Tag>
            ) : (
              <Tag icon={<CloseCircleOutlined />} color="error">
                Đã tắt
              </Tag>
            )}
          </p>
        );
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
  const changeSelect = (value) => {
    filter.active = value ? value : "";
    setFilter(filter);
  };

  const handleChangeDebut = (range) => {
    const startDateValue = FormatRangePicker(range ? range[0].format() : "");
    const endDateValue = FormatRangePicker(range ? range[1].format() : "");
    setRange([startDateValue, endDateValue]);
    filter.ranges = range ? [startDateValue, endDateValue] : "";
    setFilter(filter);
  };
  console.log("data", JSON.stringify(data));
  return (
    <ProTable
      rowSelection={{
        selections: true,
        columnTitle: false,
      }}
      search={false}
      headerTitle={t("page.post.title", "POST LIST")}
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
          allowClear
          placeholder="Title"
        />,
        <RangePicker
          // allowClear={true}
          // bordered={true}
          onChange={handleChangeDebut}
          // value={range}
          // defaultValue={ }
          // defaultValue ={}
          format={"DD-MM-YYYY"}
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
        <Button
          icon={<SearchOutlined />}
          type="primary"
          key="primary"
          onClick={search}
        >
          Tìm kiếm
        </Button>,
        <Button icon={<ExportOutlined />}>xuất</Button>,
        <PostModal/>
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
