import React, { useEffect, useRef, useState } from "react";
import { Col, Row, Modal, Form, Input, Button, Alert, Select, Tag, DatePicker, message, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { addUser, getUserDetail, resetUserDetail, updateUser } from "../../../reducers/actions/user";
import Swal from "sweetalert2";
import ImgCrop from "antd-img-crop";
import avatar from "../../../assets/images/avatarUser.png";
import moment from "moment";
import { v4 as uuidv4 } from 'uuid';

const UserForm = ({ open, onHandleCloseForm, userIdEdit, dataRole, onSetUserIdEdit }) => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const buttonRef = useRef({});

    const [options, setOptions] = useState([]);
    const [canAddUser, setCanAddUser] = useState(false);
    const [canEditUser, setCanEditUser] = useState(false);
    const [typeCallAPI, setTypeCallAPI] = useState("");
    const [showInputPassword, setShowInputPassword] = useState(true);
    const [fileList, setFileList] = useState([]);
    const { userDetail, errorAddUser, errorUpdateUser } = useSelector((state) => state.users);

    useEffect(() => {
        console.log("Render when UserIdEdit change! UserIdEdit now is: ", userIdEdit);
        if (userIdEdit !== 0) {
            if (onSetUserIdEdit) {
                dispatch(getUserDetail(userIdEdit));
                setTypeCallAPI("edit");
                setShowInputPassword(false);
            }
        }
    }, [userIdEdit]);
    useEffect(() => {
        console.log("Render when userDetail change! UserDetail now is: ", userDetail);
        if (userDetail != null) {
            let url = `http://localhost:8080${userDetail['avatar']}`;
            (async () => {
                await loadImg(url);
            })();

            form.setFieldsValue({
                userId: userDetail["userId"],
                email: userDetail["email"],
                password: userDetail["password"],
                roleId: userDetail["roleList"].map(role => role["roleId"]),
                fullName: userDetail["fullName"],
                address: userDetail["address"],
                phoneNumber: userDetail["phoneNumber"],
                dob: moment(userDetail["dob"], "DD/MM/YYYY"),
            });
            setTypeCallAPI("edit");
        }
    }, [userDetail]);
    useEffect(() => {
        console.log("Render when DataRole change! DataRole now is: ", dataRole);
        const roleList = [];
        dataRole.map((item) => {
            roleList.push({ value: item["roleId"], label: item["roleName"] });
        });
        setOptions(roleList);
    }, [dataRole]);
    useEffect(() => {
        console.log("Render when ErrorAddUser change! ErrorAddUser now is: ", errorAddUser);
        if (canAddUser) {
            if (errorAddUser != null) {
                Swal.fire({
                    title: "Thất bại",
                    text: `${errorAddUser}`,
                    icon: "error",
                    allowOutsideClick: false,
                    confirmButtonColor: "#dc3545",
                }).then(() => {
                    resetUserForm();
                });
            } else {
                Swal.fire({
                    title: "Thêm thành công",
                    text: "Thông tin đã được cập nhập",
                    icon: "success",
                    allowOutsideClick: false,
                }).then(() => {
                    setCanAddUser(false);
                    resetUserForm();
                });
            }
        }
    }, [errorAddUser, canAddUser]);
    useEffect(() => {
        console.log("Render when ErrorUpdateUser change! ErrorUpdateUser now is: ", errorUpdateUser);
        if (canEditUser) {
            if (errorUpdateUser != null) {
                Swal.fire({
                    title: "Thất bại",
                    text: `${errorUpdateUser}`,
                    icon: "error",
                    allowOutsideClick: false,
                    confirmButtonColor: "#dc3545",
                }).then(() => {
                    resetUserForm();
                });
            } else {
                Swal.fire({
                    title: "Thay đổi thành công",
                    text: "Thông tin đã được cập nhập",
                    icon: "success",
                    allowOutsideClick: false,
                }).then(() => {
                    setCanAddUser(false);
                    dispatch(resetUserDetail());
                    resetUserForm();
                });
            }
        }
    }, [errorUpdateUser, canEditUser]);
    useEffect(() => {
        if (userIdEdit === 0 && open) {
            setTypeCallAPI("add");
            (async () => {
                await loadImg('http://localhost:8080/user-photos/default_avatar.jpg');
            })();
        }
        else if (userIdEdit !==0 && open){
            setTypeCallAPI("edit");
        }
    }, [userIdEdit, open]);

    const loadImg = async (linkImg) => {
        const imageUrl = linkImg;
        const fileName = linkImg.split('/').pop();

        // Fetch the image data from the URL
        const response = await fetch(imageUrl);
        console.log("resp: ",response)
        const blob = await response.blob();
        const file = new File([blob], fileName, { type: blob.type });

        // Create an Ant Design file object
        const defaultFile = {
            uid: uuidv4(),  // Unique identifier for the file
            name: fileName,
            status: 'done',
            url: imageUrl,
            originFileObj: file
        };

        setFileList([defaultFile]);

    };

    const handleChange = (info) => {
        let file = info.file;
        setFileList([file]);
    };

    const onPreview = async (file) => {
        let src = file.url;
        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
    };

    async function validationFile(file) {
        const isImg = file.type === "image/jpeg" || file.type === "image/png";
        if (!isImg) {
            await message.error("Chỉ có thể upload ảnh JPG/PNG!");
            return Upload.LIST_IGNORE;
        }
        const sizeImg = file.size / 1024 / 1024 < 30;
        if (!sizeImg) {
            // IMG MUST <= 30MB
            await message.error("Ảnh phải có dung lượng nhỏ hơn 30MB!");
            return Upload.LIST_IGNORE;
        }
        return isImg && sizeImg;
    }

    const dummyRequest = async ({ file, onSuccess }) => {
        await validationFile(file);
        setTimeout(() => {
            onSuccess("ok");
        }, 0);
    };

    const phoneNumberValidator = (_, value) => {
        const phoneRegex = /^[0-9]{10,15}$/;
        if (!value) {
            return Promise.reject();
        } else if (!phoneRegex.test(value)) {
            return Promise.reject();
        } else {
            return Promise.resolve();
        }
    };

    const tagRender = (props) => {
        const { label, value, closable, onClose } = props;
        const onPreventMouseDown = (event) => {
            event.preventDefault();
            event.stopPropagation();
        };
        return (
            <Tag
                color="red"
                onMouseDown={onPreventMouseDown}
                closable={closable}
                onClose={onClose}
                style={{
                    marginInlineEnd: 4,
                }}
            >
                {label}
            </Tag>
        );
    };

    const resetUserForm = () => {
        form.resetFields();
        setFileList([]);
        setShowInputPassword(true);
    };

    const handleCloseForm = () => {
        if (onHandleCloseForm) {
            onHandleCloseForm(!open);
        }
        if (userDetail != null) {
            dispatch(resetUserDetail());
        }
        resetUserForm();
        onSetUserIdEdit(0);
    };

    const handleAddUser = async (dataNewUser) => {
        await dispatch(addUser(dataNewUser));
        setCanAddUser(true);
        handleCloseForm();
    };

    const handleUpdateUser = async (dataUserUpdate) => {
        await dispatch(updateUser(dataUserUpdate));
        setCanEditUser(true);
        handleCloseForm();
    };

    const handleSubmit = async (values) =>{
        values['dob'] = moment(values['dob']).format('DD/MM/YYYY');

        const formData = new FormData();

        const json = JSON.stringify(values);
        const blob = new Blob([json], {
            type: 'application/json'
        });

        formData.append('avatar', fileList[0].originFileObj)
        formData.append('data', blob);

        if (typeCallAPI === "add") {
            console.log("DATA POST FROM USER FORM ADD: ", formData.get('data'), " - ", formData.get('avatar'));
            await handleAddUser(formData);
        } else if (typeCallAPI === "edit") {
            console.log("DATA POST FROM USER FORM EDIT: ", formData.get('data'), " - ", formData.get('avatar'));
            await handleUpdateUser(formData);
        } else {
            console.log("Error! TypeCallAPI now is: ", typeCallAPI);
        }
    };
    //ant


    return (
        <Modal title="Title" maskClosable={false} open={open} onCancel={() => handleCloseForm()} onOk={() => buttonRef.current.click()}>
            <Form
                name="trigger"
                style={{maxWidth: 600,}}
                labelCol={{span: 5,}}
                wrapperCol={{span: 18}}
                layout="horizontal"
                autoComplete="off"
                onFinish={handleSubmit}
                form={form}
                getcontainer="false"
                size="small"
            >
                <Row>
                    <Col flex={2} >
                        <Form.Item>
                            <ImgCrop rotationSlider>
                                <Upload
                                    customRequest={dummyRequest}
                                    listType="picture-card"
                                    fileList={fileList}
                                    onChange={handleChange}
                                    onPreview={onPreview}
                                    beforeUpload={validationFile}
                                    maxCount={1}
                                >
                                    <Button icon={<UploadOutlined/>}>Select</Button>
                                </Upload>

                            </ImgCrop>
                        </Form.Item>

                    </Col>
                    <Col flex={3}>
                        {userIdEdit!==0 && (
                        <Form.Item
                            hasFeedback
                            label="ID"
                            name="userId"
                            validateDebounce={1000}
                        >
                            <Input disabled={userIdEdit!==0} />
                        </Form.Item>
                        )}
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
                                    max: 50,
                                    message: "Độ dài từ 10 - 15 ký tự",
                                },
                            ]}
                        >
                            <Input disabled={userIdEdit!==0} />
                        </Form.Item>
                        {showInputPassword && (
                            <Form.Item
                                hidden={typeCallAPI === "edit"}
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
                                        max: 50,
                                        min: 10,
                                        message: "Độ dài từ 10 - 15 ký tự",
                                    },
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>
                        )}

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
                                tagRender={tagRender}
                                size="large"
                                style={{
                                    width: "100%",
                                }}
                                options={options}
                            />
                        </Form.Item>
                        <Form.Item
                            hasFeedback
                            label="Tên đầy đủ"
                            name="fullName"
                            validateDebounce={1000}
                            rules={[
                                {
                                    required: true,
                                    message: "Thông tin không được bỏ trống",
                                },
                                {
                                    max: 50,
                                    min: 10,
                                    message: "Độ dài từ 10 - 15 ký tự",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            hasFeedback
                            label="Địa chỉ"
                            name="address"
                            validateDebounce={1000}
                            rules={[
                                {
                                    required: true,
                                    message: "Thông tin không được bỏ trống",
                                },
                                {
                                    max: 50,
                                    min: 10,
                                    message: "Độ dài từ 10 - 15 ký tự",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            hasFeedback
                            label="SĐT"
                            name="phoneNumber"
                            validateDebounce={1000}
                            rules={[
                                {
                                    validator: phoneNumberValidator,
                                    message: "SĐT không hợp lệ",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            hasFeedback
                            label="Ngày sinh"
                            name="dob"
                            validateDebounce={1000}
                            rules={[
                                {
                                    required: true,
                                    message: "Thông tin không được bỏ trống",
                                },
                                {
                                    type: "date",
                                    message: "Ngày không hợp lệ",
                                },
                            ]}
                        >
                            <DatePicker format="DD/MM/YYYY" size="large" />
                        </Form.Item>
                        <Form.Item hidden>
                            <Button ref={buttonRef} type="ghost" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
};
const areEqual = (prevProps, nextProps) => {
    return prevProps.open === nextProps.open && prevProps.userIdEdit === nextProps.userIdEdit && prevProps.dataRole === nextProps.dataRole;
};
export default React.memo(UserForm, areEqual);
