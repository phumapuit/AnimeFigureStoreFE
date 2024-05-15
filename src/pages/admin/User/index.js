import { Card, Radio, Table, Avatar, Typography } from "antd";
import avatar from "../../../assets/images/avatarUser.png";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersList } from "../../../reducers/actions/user";
import Tooltip from "antd/es/tooltip";
import moment from "moment";
// table code start
const columns = [
    {
        title: "HỈNH ẢNH",
        dataIndex: "image",
        key: "image",
        width: "10%",
        fixed: "left",
    },
    {
        title: "TÊN NGƯỜI DÙNG",
        dataIndex: "nameUser",
        key: "nameUser",
        width: "15%",
        ellipsis: {
            showTitle: false,
        },
        render: (nameProduct) => (
            <Tooltip placement="topLeft" title={nameProduct}>
                {nameProduct}
            </Tooltip>
        ),
        sorter: (a, b) => a.nameUser.localeCompare(b.nameUser),
        fixed: "left",
    },
    {
        title: "EMAIL",
        dataIndex: "emailUser",
        key: "emailUser",
        width: "15%",
        ellipsis: {
            showTitle: false,
        },
        render: (emailUser) => (
            <Tooltip placement="topLeft" title={emailUser}>
                {emailUser}
            </Tooltip>
        ),
        sorter: (a, b) => a.emailUser.localeCompare(b.emailUser),
    },
    {
        title: "ĐỊA CHỈ",
        dataIndex: "addressUser",
        key: "addressUser",
        width: "15%",
        ellipsis: {
            showTitle: false,
        },
        render: (emailUser) => (
            <Tooltip placement="topLeft" title={emailUser}>
                {emailUser}
            </Tooltip>
        ),
        sorter: (a, b) => a.addressUser.localeCompare(b.addressUser),
    },

    {
        title: "SỐ ĐIỆN THOẠI",
        key: "phoneNumberUser",
        dataIndex: "phoneNumberUser",
        width: "15%",
    },
    {
        title: "NGÀY SINH",
        key: "dateOfBirdUser",
        dataIndex: "dateOfBirdUser",
        sorter: (a, b) => moment(a.dateOfBirdUser, "DD/MM/YYYY").toDate() - moment(b.dateOfBirdUser, "DD/MM/YYYY").toDate(),
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

export default function User() {
    // GET DATA FORM userREDUCER STORE
    const dispatch = useDispatch();
    useEffect(() => {
        console.log("DISPATCH ACTION GET USER LIST");
        dispatch(getUsersList());
    }, [dispatch]);
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

    const { usersList, loading, error } = useSelector((state) => state.users);
    if (loading) {
        return <h1>TẢI LÂU VCLLLLLLLLLLLLLLLLLL</h1>;
    }
    if (error !== null) {
        return <h1>TẮT SERVER CMNRRRRRRRRRRRRRRRRRRR</h1>;
    }
    let dataUser = [];
    let dateFormat = "";
    usersList?.data?.map((userItem, index) => {
        return dataUser.push({
            key: userItem["userId"],
            image: (
                <>
                    <Avatar.Group>
                        <Avatar className="shape-avatar" shape="square" size={40} src={userItem["images"] ? "http://localhost:8080" + userItem["images"] : avatar} />
                    </Avatar.Group>{" "}
                </>
            ),
            nameUser: userItem["fullName"],
            emailUser: userItem["email"],
            addressUser: userItem["address"],
            phoneNumberUser: userItem["phoneNumber"],
            dateOfBirdUser: userItem["dob"],
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
                            dataSource={dataUser}
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
