import { Card, Radio, Table, Avatar } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductList } from "../../../reducers/actions/product";
import avatar from "../../../assets/images/avatarUser.png";
import Tooltip from "antd/es/tooltip";

const columns = [
    {
        title: "HỈNH ẢNH",
        dataIndex: "image",
        key: "image",
        width: "10%",
        fixed: "left",
    },
    {
        title: "TÊN SẢN PHẨM",
        dataIndex: "nameProduct",
        key: "nameProduct",
        width: "30%",
        ellipsis: {
            showTitle: false,
        },
        render: (nameProduct) => (
            <Tooltip placement="topLeft" title={nameProduct}>
                {nameProduct}
            </Tooltip>
        ),
        sorter: (a, b) => a.nameProduct.localeCompare(b.nameProduct),
        fixed: "left",
    },
    {
        title: "SỐ LƯỢNG",
        dataIndex: "quantity",
        key: "quantity",
        width: "10%",
        sorter: (a, b) => a.quantity - b.quantity,
    },

    {
        title: "ĐƠN GIÁ",
        key: "price",
        dataIndex: "price",
        width: "10%",
        sorter: (a, b) => a.price - b.price,
    },
    {
        title: "MÔ TẢ",
        key: "description",
        dataIndex: "description",
        width: "30%",
        ellipsis: {
            showTitle: false,
        },
        render: (description) => (
            <Tooltip placement="topLeft" title={description}>
                {description}
            </Tooltip>
        ),
    },
    {
        title: "GIẢM GIÁ",
        key: "discount",
        dataIndex: "discount",
        width: "10%",
        sorter: (a, b) => a.discount - b.discount,
    },
    {
        title: "THAO TÁC",
        key: "action",
        dataIndex: "action",
        width: "10%",
        align: "right",
        fixed: "right",
    },
];

export default function Product() {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const onSelectChange = (newSelectedRowKeys) => {
        console.log("selectedRowKeys changed: ", newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0; // DÙNG BIẾN NÀY LẤY DANH SÁCH MÃ ID ĐƯỢC CHECK, ĐỂ XÁC ĐỊNH DISABLE NUT DELETE ĐI HAY KHÔNG

    const dispatch = useDispatch();
    useEffect(() => {
        console.log("DISPATCH ACTION GET PRODUCT LIST");
        dispatch(getProductList());
    }, [dispatch]);

    const { productList, loading, error } = useSelector((state) => state.products);
    if (loading) {
        return <h1>TẢI LÂU VCLLLLLLLLLLLLLLLLLL</h1>;
    }
    if (error !== null) {
        return <h1>TẮT SERVER CMNRRRRRRRRRRRRRRRRRRR</h1>;
    }

    let dataProduct = [];
    productList?.data?.map((productItem, index) => {
        return dataProduct.push({
            key: productItem["productId"],
            image: (
                <>
                    <Avatar.Group>
                        <Avatar className="shape-avatar" shape="square" size={40} src={productItem["images"] ? "http://localhost:8080" + productItem["images"] : avatar} />
                    </Avatar.Group>{" "}
                </>
            ),
            nameProduct: productItem["product_name"],
            quantity: productItem["product_quantity"],
            price: productItem["product_price"],
            description: productItem["product_description"],
            discount: productItem["product_discount"] === null ? 0 : productItem["product_discount"],
            action: (
                <>
                    <a href="">Edit</a>
                </>
            ),
        });
    });
    const onChange = (e) => console.log(`radio checked:${e.target.value}`);
    return (
        <>
            <div className="tabled">
                <Card
                    bordered={false}
                    className="criclebox tablespace mb-24"
                    title="Danh sách người dùng"
                    extra={
                        <>
                            <Radio.Group onChange={onChange} defaultValue="a">
                                <Radio.Button value="a">Thêm tài khoản</Radio.Button>
                                <Radio.Button value="b">Xoá</Radio.Button>
                            </Radio.Group>
                        </>
                    }
                >
                    <div className="table-responsive">
                        <Table
                            columns={columns}
                            dataSource={dataProduct}
                            pagination={true}
                            showSorterTooltip={false}
                            scroll={{
                                x: 1500,
                                y: 500,
                            }}
                            rowSelection={rowSelection}
                            className="ant-border-space"
                        />
                    </div>
                </Card>
            </div>
        </>
    );
}
