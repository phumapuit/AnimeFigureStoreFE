import React, { useEffect, useRef } from "react";
import { Modal, Form, Input, Button, Alert, Select, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addUser, getUserDetail, updateUser } from "../../../reducers/actions/user";
import Swal from "sweetalert2";

const UserForm = React.memo(({ open, onHandleCloseForm, isAdd, isEdit, userIdEdit, callAPI, setCallAPI, dataRole }) => {
    console.log("call ALL: ", open, isAdd, isEdit, userIdEdit, callAPI);
    const dispatch = useDispatch();
    useEffect(() => {
        console.log("RENDER FORM USER FORM WITH isADD = ", isAdd, " AND isEDIT = ", isEdit);
        if (isEdit) {
            dispatch(getUserDetail(userIdEdit));
            setCallAPI(false);
        }
    }, [setCallAPI]);
    const { userDetail } = useSelector((state) => state.users);
    const options = [];
    dataRole.map((item) => {
        options.push({ value: item["roleId"], label: item["roleName"] });
    });

    const handleCloseForm = () => {
        if (onHandleCloseForm) {
            onHandleCloseForm(!open);
        }
        setCallAPI(false);
    };
    const handleAddUser = async (dataNewUser) => {
        await dispatch(addUser(dataNewUser));
        onHandleCloseForm(!open);
        Swal.fire({
            title: "Thêm thành công",
            text: "Thông tin đã được cập nhập",
            icon: "success",
        }).then(() => {
            setCallAPI(false);
        });
    };
    const handleUpdateUser = async (dataUserUpdate) => {
        await dispatch(updateUser(dataUserUpdate));
        Swal.fire({
            title: "Thay đổi thành công",
            text: "Thông tin đã được cập nhập",
            icon: "success",
        }).then(() => {
            setCallAPI(false);
        });
    };

    const buttonRef = useRef({});

    const handleSubmit = async (values) => {
        console.log("DATA POST FROM USER FORM: ", values);
        if (isAdd) {
            await handleAddUser(values);
        } else if (isEdit) {
            await handleUpdateUser(values);
        } else {
            console.log("Lỗi: isAdd: ", isAdd, " isEdit: ", isEdit);
        }
    };

    return (
        <Modal title="Title" maskClosable={false} open={open} onCancel={() => handleCloseForm()} onOk={() => buttonRef.current.click()}>
            <Form
                name="trigger"
                style={{
                    maxWidth: 600,
                }}
                layout="vertical"
                autoComplete="off"
                onFinish={handleSubmit}
            >
                <Form.Item
                    hasFeedback
                    label="Email"
                    name="email"
                    validateDebounce={1000}
                    rules={[
                        {
                            required: true,
                            message: "Thông tin không được bỏ trống",
                        },
                        {
                            type: "email",
                            message: "Email không hợp lệ",
                        },
                        {
                            max: 15,
                            message: "Độ dài từ 10 - 15 ký tự",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    hasFeedback
                    label="Mật khẩu"
                    name="password"
                    validateFirst
                    rules={[
                        {
                            required: true,
                            message: "Thông tin không được bỏ trống",
                        },
                        {
                            type: "string",
                            max: 15,
                            min: 10,
                            message: "Độ dài từ 10 - 15 ký tự",
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    hasFeedback
                    label="Vị trí"
                    name="roleId"
                    validateFirst
                    rules={[
                        {
                            required: true,
                            message: "Thông tin không được bỏ trống",
                        },
                    ]}
                >
                    <Select
                        mode="multiple"
                        size="large"
                        style={{
                            width: "100%",
                        }}
                        options={options}
                    />
                </Form.Item>
                <Form.Item hidden>
                    <Button ref={buttonRef} type="ghost" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
});

export default UserForm;
