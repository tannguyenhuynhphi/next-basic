import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  EditOutlined,
  ExportOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Image, Input, Select, Tag } from "antd";
import { FormatDatetime, FormatRangePicker } from "helpers/formatDatetime";
import { useState, useEffect, lazy, useRef, useContext } from "react";
import { DatePicker } from "antd";
import { useTranslation } from "react-i18next";
import { productService } from "services/product.service";
import AppContext from "store/app-context";
const ProTable = lazy(() => import("@ant-design/pro-table"));
const ProductDialog = lazy(() => import("./ProductDialog"));
const UploadEdit = lazy(() => import("../Common/UploadCut/UploadEdit"));

function ProductManeger() {
  const { t } = useTranslation();
  const AppContextX = useContext(AppContext);
  const [data, setData] = useState(null);
  const [total, setTotal] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sorter, setSorter] = useState(null);
  const [refresh, setRefresh] = useState(null);
  const [range, setRange] = useState(null);
  // const [load, setLoad] = useState(false);
  const [filter, setFilter] = useState({});
  const inputRefTitle = useRef(null);
  //RangePicker

  const { RangePicker } = DatePicker;
  const state = { startDate: new Date(), endDate: "" };
  const loadData = (query) => {
    setLimit(query.limit);
    setPage(query.page);
    setSorter(query.sorter);
  };

  useEffect(() => {
    var skip = (page - 1) * limit;
    productService.getProduct(limit, skip, filter, sorter).then((x) => {
      setRefresh(1);
      setData(x.data);
      setTotal(x.total);
    });
  }, [limit, page, sorter, filter, refresh]);

  const updateImages = (item) => {
    const imageUrl = document.getElementById("nameImagesUploadCutEdit").value;
    productService
      .uploadProduct(item._id, null, null, null, null, null, imageUrl)
      .then((x) => {
        if (x.success) {
          setRefresh(2);
          AppContextX.showNotification({
            title: t("app.notification.success.title"),
            message: t("app.notification.success.message"),
            status: "success",
          });
        }
      });
  };
  const columns = [
    {
      title: t("page.product.columns.name.title"),
      width: 100,
      dataIndex: "name",
      key: "name",
      fixed: "left",
      sorter: true,
    },
    {
      title: t("page.product.columns.detail.title"),
      width: 300,
      dataIndex: "detail",
      key: "detail",
      fixed: "left",
      sorter: true,
    },
    {
      title: t("page.product.columns.imageUrl.title"),
      dataIndex: "imageUrl",
      key: "imageUrl",
      width: 150,
      sorter: true,
      render: (imageUrl) => {
        return <Image width={200} src={imageUrl} />;
      },
    },
    {
      title: t("page.product.columns.price.title"),
      dataIndex: "price",
      key: "price",
      width: 150,
      sorter: true,
    },
    {
      title: t("page.product.columns.promotion.title"),
      dataIndex: "promotion",
      key: "promotion",
      width: 150,
      sorter: true,
    },
    {
      title: t("page.product.columns.quantity.title"),
      dataIndex: "quantity",
      key: "quantity",
      width: 150,
      sorter: true,
    },
    {
      title: t("page.product.columns.dateCreated.title"),
      dataIndex: "dateCreated",
      key: "dateCreated",
      width: 150,
      sorter: true,
      render: (dateCreated) => {
        return <p>{FormatDatetime(dateCreated)}</p>;
      },
    },
    {
      title: t("page.product.columns.dateUpdate.title"),
      key: "dateUpdate",
      width: 150,
      sorter: true,
      render: (dateUpdate) => {
        return <p>{FormatDatetime(dateUpdate)}</p>;
      },
    },
    {
      title: t("page.product.columns.active.title"),
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
    {
      title: t("page.product.columns.edit.title"),
      // dataIndex: "active",
      key: "edit",
      width: 150,
      // sorter: true,
      render: (item) => {
        return (
          <ProductDialog
            edit={<EditOutlined />}
            refresh={() => setRefresh(2)}
            data={item}
          />
        );
      },
    },
    {
      title: "",
      // dataIndex: "active",
      key: "updateImages",
      width: 150,
      // sorter: true,
      render: (item) => {
        return <UploadEdit onUpdate={() => updateImages(item)} data={item} />;
      },
    },
  ];
  const onReset = () => {
    console.log("onReset");
  };
  const search = () => {
    setFilter({
      ...filter,
      name: inputRefTitle.current.input.value,
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
  return (
    <ProTable
      rowSelection={{
        selections: true,
        columnTitle: false,
      }}
      search={false}
      headerTitle={t("page.product.title", "Danh sách sản phẩm")}
      columns={columns}
      onReset={onReset}
      dataSource={data}
      rowKey="name"
      toolBarRender={() => [
        <Input
          ref={inputRefTitle}
          type="text"
          id="name"
          name="name"
          allowClear
          placeholder="name"
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
          {t("page.product.action.search")}
        </Button>,
        <Button icon={<ExportOutlined />}>
          {t("page.product.action.export")}
        </Button>,
        <ProductDialog
          edit={<Button>{t("page.product.action.add")}</Button>}
          refresh={() => setRefresh(2)}
        />,
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
export default ProductManeger;
