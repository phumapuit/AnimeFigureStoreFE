import {Card, Radio, Table, Avatar, Button, Image } from "antd";
import {EditFilled, EyeFilled, EyeInvisibleFilled, ZoomInOutlined, ZoomOutOutlined} from "@ant-design/icons";
// import avatar from "../../../assets/images/avatarUser.png";
import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import {changeStatusUser, getUserRoleList, getUsersList, resetUserDetail} from "../../../reducers/actions/user";
import Tooltip from "antd/es/tooltip";
import moment from "moment";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import UserForm from "../../../components/admin/form/userForm";

export default function User() {
    const disabled = "Tạm ngưng";
    const enable = "Hoạt động";
    const avatar = "http://localhost:8080/user-photos/default_avatar.jpg"
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
            width: "10%",
            ellipsis: {
                showTitle: false,
            },
            render: (nameUser) => (
                <Tooltip placement="topLeft" title={nameUser}>
                    {nameUser}
                </Tooltip>
            ),
            sorter: (a, b) => a.nameUser.localeCompare(b.nameUser),
            fixed: "left",
        },
        {
            title: "SỐ ĐIỆN THOẠI",
            key: "phoneNumberUser",
            dataIndex: "phoneNumberUser",
            width: "10%",
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
            // width: "15%",
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
            title: "NGÀY SINH",
            key: "dateOfBirdUser",
            dataIndex: "dateOfBirdUser",
            width: "10%",
            sorter: (a, b) => moment(a.dateOfBirdUser, "DD/MM/YYYY").toDate() - moment(b.dateOfBirdUser, "DD/MM/YYYY").toDate(),
        },
        {
            title: "VAI TRÒ",
            dataIndex: "role",
            key: "role",
            width: "10%",
            ellipsis: {
                showTitle: false,
            },
            render: (role) => (
                <Tooltip placement="topLeft" title={role}>
                    {role}
                </Tooltip>
            ),
            sorter: (a, b) => a.role.localeCompare(b.role),
        },
        {
            title: "TRẠNG THÁI",
            key: "status",
            dataIndex: "status",
            width: "8%",
            align: "right",
            fixed: "right",
            render(text, record){
                return{
                    props:{
                        style: {color: text === disabled ? "#ff7875" : "#28a745", fontWeight: '600' }
                    },
                    children: <span>{text}</span>
                }
            }
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
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("DISPATCH ACTION GET USER LIST");
        dispatch(getUsersList());
        dispatch(getUserRoleList());
    }, []);
    const { usersList, rolesList, loading, error } = useSelector((state) => state.users);
    const [open, setOpen] = useState(false);
    const [userIdEdit, setUserIdEdit] = useState(0);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const hasSelected = selectedRowKeys.length > 0; // DÙNG BIẾN NÀY LẤY DANH SÁCH MÃ ID ĐƯỢC CHECK, ĐỂ XÁC ĐỊNH DISABLE NUT DELETE ĐI HAY KHÔNG

    const onChange = (e) => console.log(`radio checked:${e.target.value}`);
    const onSelectChange = (newSelectedRowKeys) => {
        console.log("selectedRowKeys changed: ", newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
        getCheckboxProps: (record) => ({
            disabled: record.status === disabled, // Disable checkbox if user is "off"
        }),

        selectedRowKeys,
        onChange: onSelectChange,
    };
    const openFormAdd = () => {
        setOpen(true);
    };
    const openFormEdit = (event) => {
        setOpen(true);
        const userId = event.currentTarget.getAttribute("data-user-id");
        setUserIdEdit(userId);
    };
    const handleMultipleStatusUser = () => {
        Swal.fire({
            title: "Bạn có muốn thay đổi?",
            text: "Bạn có thể thay đổi lại !",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#28a745",
            cancelButtonColor: "#dc3545",
            confirmButtonText: "Đồng ý",
            cancelButtonText: "Huỷ bỏ",
            reverseButtons: true,
            allowOutsideClick: false,
        }).then(async (result) => {
            if (result.isConfirmed) {
                await dispatch(changeStatusUser(selectedRowKeys));
                setSelectedRowKeys([]);
                await Swal.fire({
                    title: "Đã thay đổi",
                    text: "Thông tin đã được cập nhập",
                    icon: "success",
                    allowOutsideClick: false,
                    confirmButtonColor: "#28a745",
                });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                setSelectedRowKeys([]);
                await Swal.fire({
                    title: "Huỷ bỏ",
                    text: "Dữ liệu đã được giữ nguyên",
                    icon: "error",
                    allowOutsideClick: false,
                    confirmButtonColor: "#dc3545",
                });
            }
        });
    };
    const handleStatusUser = (event) => {
        const userId = event.currentTarget.getAttribute("data-user-id");
        let arrUserId = [parseInt(userId)];
        Swal.fire({
            title: "Bạn có muốn thay đổi?",
            text: "Bạn có thể thay đổi lại !",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#28a745",
            cancelButtonColor: "#dc3545",
            confirmButtonText: "Đồng ý",
            cancelButtonText: "Huỷ bỏ",
            reverseButtons: true,
            allowOutsideClick: false,
        }).then(async (result) => {
            if (result.isConfirmed) {
                await dispatch(changeStatusUser(arrUserId));
                setSelectedRowKeys([]);
                await Swal.fire({
                    title: "Đã thay đổi",
                    text: "Thông tin đã được cập nhập",
                    icon: "success",
                    allowOutsideClick: false,
                    confirmButtonColor: "#28a745",
                });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                arrUserId = [];
            }
        });

        // return (event)=>{
        //     const clickElement = event.target;
        //     const parentRow = clickElement.parentElement.closest('tr');
        //     const tableCells = parentRow?.querySelectorAll('td');
        //
        //     if (userIsDeleted && tableCells) {
        //         userIsDeleted=false;  // Toggling the state
        //         console.log(userIsDeleted)
        //         tableCells.forEach((cell) => {
        //             cell.style.setProperty('background-color', 'revert-layer');
        //             parentRow.querySelector('.ant-checkbox-input').removeAttribute('disabled');
        //         });
        //     } else if (tableCells) {
        //         userIsDeleted=true;  // Toggling the state
        //         console.log(userIsDeleted)
        //         tableCells.forEach((cell) => {
        //             cell.style.setProperty('background-color', '#ff7875');
        //             parentRow.querySelector('.ant-checkbox-input').setAttribute('disabled','true');
        //         });
        //     }
        // }
    };

    if (loading) {
        return <h1>TẢI LÂU VCLLLLLLLLLLLLLLLLLL</h1>;
    }
    // if (error !== null) {
    //     return <h1>TẮT SERVER CMNRRRRRRRRRRRRRRRRRRR</h1>;
    // }
    let dataUser = [];
    let srcImg = "";
    usersList.map((userItem) => {
        srcImg = "http://localhost:8080" + userItem["avatar"];
        return dataUser.push({
            key: userItem["userId"],
            image: (
                <>
                    <Image
                        width={40}
                        height={40}
                        src={srcImg}
                        fallback={avatar}
                    />
                </>
            ),
            nameUser: userItem["fullName"],
            emailUser: userItem["email"],
            addressUser: userItem["address"],
            phoneNumberUser: userItem["phoneNumber"],
            dateOfBirdUser: userItem["dob"],
            role: userItem["roleList"]
                ? userItem["roleList"].map(role => role["roleName"]).join(", ")
                : "Không rõ",

            status: userItem["deleted"] ? disabled : enable,

            action: (
                <>
                    <Tooltip title="Edit">
                        <Button
                            disabled = {userItem["deleted"]}
                            type="primary"
                            shape="circle"
                            size="large"
                            icon={<EditFilled />}
                            data-user-id={userItem["userId"]}
                            onClick={userItem["deleted"]?(e)=>e.preventDefault():(event) => openFormEdit(event)} />
                    </Tooltip>
                    <Tooltip title={userItem["deleted"] ? "Active" : "Disabled"}>
                        <Button
                            type="primary"
                            shape="circle"
                            size="large"
                            icon={userItem["deleted"] ? <EyeFilled /> : <EyeInvisibleFilled />}
                            data-user-id={userItem["userId"]}
                            style={userItem["deleted"] ? { backgroundColor: "#28a745", marginLeft: "8px" } : { backgroundColor: "#ff7875", marginLeft: "8px" }}
                            onClick={(event) => handleStatusUser(event)}
                            danger
                        />
                    </Tooltip>
                </>
            ),
        });
    });

    const handleCloseForm = (falseValue) => {
        setOpen(falseValue);
    };
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
                                <Radio.Button onClick={() => openFormAdd()}>Thêm tài khoản</Radio.Button>
                                <Radio.Button disabled={selectedRowKeys.length === 0} onClick={() => handleMultipleStatusUser()}>Tắt trạng thái</Radio.Button>
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
                            rowSelection={{ ...rowSelection }}
                            className="ant-border-space"
                        />
                    </div>
                </Card>
            </div>

            <UserForm
                open={open}
                userIdEdit={userIdEdit}
                onSetUserIdEdit = {setUserIdEdit}
                dataRole={rolesList}
                onHandleCloseForm={handleCloseForm}
            />
        </>
    );
}
