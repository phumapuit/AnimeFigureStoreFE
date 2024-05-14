import { Row, Col, Card, Radio, Table, Upload, message, Button, Avatar, Typography } from "antd";
import avatar from "../../../assets/images/avatarUser.png";
import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersList } from "../../../reducers/actions/user";
import userReducer from "../../../reducers/UserReducer";

const { Title } = Typography;

// table code start
const columns = [
    {
        title: "TÊN NGƯỜI DÙNG",
        dataIndex: "nameUser",
        key: "nameUser",
        width: "32%",
    },
    {
        title: "ĐỊA CHỈ",
        dataIndex: "addressUser",
        key: "addressUser",
    },

    {
        title: "SỐ ĐIỆN THOẠI",
        key: "phoneNumberUser",
        dataIndex: "phoneNumberUser",
    },
    {
        title: "NGÀY SINH",
        key: "dateOfBirdUser",
        dataIndex: "dateOfBirdUser",
    },
];

export default function User() {
    // GET DATA FORM userREDUCER STORE
    const dispatch = useDispatch();
    useEffect(() => {
        console.log("DISPATCH ACTION GET USER LIST");
        dispatch(getUsersList());
    }, [dispatch]);

    const { usersList, loading, error } = useSelector((state) => state.users);
    if (loading){
        return <h1>TẢI LÂU VCLLLLLLLLLLLLLLLLLL</h1>
    }
    if (error!== null){
        return <h1>TẮT SERVER CMNRRRRRRRRRRRRRRRRRRR</h1>
    }
    let dataUser = [];
    usersList?.data?.map((userItem, index) => {
        return dataUser.push({
            key: userItem['userId'],
            nameUser: (
                <>
                    <Avatar.Group>
                        <Avatar className="shape-avatar" shape="square" size={40} src={userItem.fullName ? "http://localhost:8080"+userItem['avatar'] : avatar} />
                        <div className="avatar-info">
                            <Title level={5}>{userItem['fullName']}</Title>
                            <p>{userItem['email']}</p>
                        </div>
                    </Avatar.Group>{" "}
                </>
            ),
            addressUser: (
                <>
                    <div className="author-info">
                        <Title level={5}>{userItem['address']}</Title>
                    </div>
                </>
            ),

            phoneNumberUser: (
                <>
                    <Button type="primary" className="tag-primary">
                        {userItem['phoneNumber']}
                    </Button>
                </>
            ),
            dateOfBirdUser: (
                <>
                    <div className="ant-employed">
                        <span>{userItem['dob']}</span>
                        <a href="">Edit</a>
                    </div>
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
                        <Table columns={columns} dataSource={dataUser} pagination={true} className="ant-border-space" />
                    </div>
                </Card>
            </div>
        </>
    );
}
