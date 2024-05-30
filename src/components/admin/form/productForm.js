import React, { useEffect, useRef, useState } from "react";
import { Col, Row, Modal, Form, Input, Button, Select, Tag, DatePicker, message, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import ImgCrop from "antd-img-crop";
import avatar from "../../../assets/images/avatarUser.png";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import {addProduct, getProductDetail, resetProductDetail, updateProduct} from "../../../reducers/actions/product";

const ProductForm = ({ open, onHandleCloseForm, productIdEdit, dataCategory, onSetProductIdEdit }) => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const buttonRef = useRef({});

    const TYPE_ADD = "add";
    const TYPE_EDIT = "edit";

    const [options, setOptions] = useState([]);
    const [typeCallAPI, setTypeCallAPI] = useState("");
    const [fileList, setFileList] = useState([]);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const { productDetail, loadingUpdateProduct, loadingAddProduct, errorAddProduct, errorUpdateProduct } = useSelector((state) => state.products);

    useEffect(() => {
        if (productIdEdit !== 0) {
            console.log("Render when UserIdEdit change! UserIdEdit now is: ", productIdEdit);
            if (onSetProductIdEdit) {
                dispatch(getProductDetail(productIdEdit));
                // setShowInputPassword(false);
            }
        }
    }, [productIdEdit]);
    useEffect(() => {
        if (productDetail != null) {
            console.log("Render when productDetail change! productDetail now is: ", productDetail);
            let url = `http://localhost:8080${productDetail["images"]}`;
            (async () => {
                await loadImg(url);
            })();

            form.setFieldsValue({
                productId: productDetail["productId"],
                product_name: productDetail["product_name"],
                product_price: productDetail["product_price"],
                product_quantity: productDetail["product_quantity"],
                category_id: productDetail["categoryDTO"]["categoryId"],
                product_description: productDetail["product_description"],
                product_discount: productDetail["product_discount"],
                created_date: productDetail["created_date"]? moment(productDetail["created_date"], "DD/MM/YYYY"): moment("2024-05-13 13:25:26"),
            });
        }
    }, [productDetail]);
    useEffect(() => {
        if (dataCategory.length > 0){
            console.log("Render when DataCategory change! DataCategory now is: ", dataCategory);
            const categoryList = [];
            dataCategory.map((item) => {
                categoryList.push({ value: item["categoryId"], label: item["categoryName"] });
            });
            setOptions(categoryList);
        }
    }, [dataCategory]);
    useEffect(() => {
        if (typeCallAPI === TYPE_ADD) {
            console.log("Render when ErrorAddProduct change! ErrorAddProduct now is: ", errorAddProduct);
            if (errorAddProduct != null && !loadingAddProduct) {
                Swal.fire({
                    title: "Thất bại",
                    text: `${errorAddProduct}`,
                    icon: "error",
                    allowOutsideClick: false,
                    confirmButtonColor: "#dc3545",
                }).then(() => {
                    handleCloseForm();
                });
            } else {
                if (errorAddProduct === null && !loadingAddProduct) {
                    Swal.fire({
                        title: "Thêm thành công",
                        text: "Thông tin đã được cập nhập",
                        icon: "success",
                        allowOutsideClick: false,
                    }).then(() => {
                        handleCloseForm();
                    });
                }
            }
        }
    }, [errorAddProduct, confirmLoading]);
    useEffect(() => {
        if (typeCallAPI === TYPE_EDIT) {
            console.log("Render when ErrorUpdateProduct change! errorUpdateProduct now is: ", errorUpdateProduct);
            if (errorUpdateProduct != null && !loadingUpdateProduct) {
                Swal.fire({
                    title: "Thất bại",
                    text: `${errorUpdateProduct}`,
                    icon: "error",
                    allowOutsideClick: false,
                    confirmButtonColor: "#dc3545",
                }).then(() => {
                    handleCloseForm();
                });
            } else {
                if (errorUpdateProduct === null && !loadingUpdateProduct) {
                    Swal.fire({
                        title: "Thay đổi thành công",
                        text: "Thông tin đã được cập nhập",
                        icon: "success",
                        allowOutsideClick: false,
                    }).then(() => {
                        dispatch(resetProductDetail());
                        handleCloseForm();
                    });
                }
            }
        }
    }, [errorUpdateProduct, confirmLoading]);
    useEffect(() => {
        loadingUpdateProduct ? setConfirmLoading(true) : setConfirmLoading(false);
    }, [loadingUpdateProduct]);
    useEffect(() => {
        loadingAddProduct ? setConfirmLoading(true) : setConfirmLoading(false);
    }, [loadingAddProduct]);
    useEffect(() => {
        if (productIdEdit === 0 && open) {
            setTypeCallAPI(TYPE_ADD);
            (async () => {
                await loadImg("http://localhost:8080/user-photos/default_avatar.jpg");
            })();
        } else if (productIdEdit !== 0 && open) {
            setTypeCallAPI(TYPE_EDIT);
        }
    }, [productIdEdit, open]);

    const loadImg = async (linkImg) => {
        const imageUrl = linkImg;
        const fileName = linkImg.split("/").pop();

        // Fetch the image data from the URL
        const response = await fetch(imageUrl);
        console.log("resp: ", response);
        const blob = await response.blob();
        const file = new File([blob], fileName, { type: blob.type });

        // Create an Ant Design file object
        const defaultFile = {
            uid: uuidv4(), // Unique identifier for the file
            name: fileName,
            status: "done",
            url: imageUrl,
            originFileObj: file,
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
    };

    const handleCloseForm = () => {
        if (onHandleCloseForm) {
            onHandleCloseForm(!open);
        }
        if (productDetail != null) {
            dispatch(resetProductDetail());
        }
        resetUserForm();
        setConfirmLoading(false);
        setTypeCallAPI("");
        onSetProductIdEdit(0);
    };

    const handleAddProduct = async (dataNewProduct, handleValue) => {
        await dispatch(addProduct(dataNewProduct, handleValue));
    };

    const handleUpdateProduct = async (dataProductUpdate, handleValue) => {
        await dispatch(updateProduct(dataProductUpdate, handleValue));
    };

    const handleSubmit = async (values) => {
        values["category_id"] = values["category_id"].toString();
        values["created_date"] = moment(values["created_date"]).format("DD/MM/YYYY");
        const handleValue = {...values,
            categoryDTO: {
                categoryId: values["category_id"],
                categoryName: options.find(element => element.value === parseInt(values["category_id"])).label
            },
            deleted: false,
        };

        const formData = new FormData();

        const json = JSON.stringify(values);
        const blob = new Blob([json], {
            type: "application/json",
        });

        formData.append("avatar", fileList[0].originFileObj);
        formData.append("data", blob);

        if (typeCallAPI === TYPE_ADD) {
            console.log("DATA POST FROM PRODUCT FORM ADD: ", values, " - ", formData.get("avatar"));
            await handleAddProduct(formData, handleValue);
        } else if (typeCallAPI === TYPE_EDIT) {
            console.log("DATA POST FROM PRODUCT FORM EDIT: ", values, " - ", formData.get("avatar"));
            await handleUpdateProduct(formData, handleValue);
        } else {
            console.log("Error! TypeCallAPI now is: ", typeCallAPI);
        }
    };

    const [selectedValues, setSelectedValues] = useState([]);
    const handleChangeSelect = (value) => {
        setSelectedValues(value); // value will be an array
    };

    return (
        <Modal centered={true} width={800} confirmLoading={confirmLoading} maskClosable={false} open={open} onCancel={() => handleCloseForm()} onOk={() => buttonRef.current.click()}>
            <Form
                id='user-form'
                name="trigger"
                style={{ maxWidth: 800 }} labelCol={{ span: 5 }} wrapperCol={{ span: 18 }}
                layout="horizontal"
                autoComplete="off"
                onFinish={handleSubmit}
                form={form}
                getcontainer="false"
                size="small"
                initialValues={{
                    category_id: [1],
                }}
            >
                <Row  gutter={{
                    xs: 8,
                    sm: 16,
                    md: 24,
                    lg: 32,
                }}>
                    <Col span={24} sm={8}>
                        <ImgCrop rotationSlider={false}>
                            <Upload multiple={false} accept=".jpg,.png,.jpeg" customRequest={dummyRequest} listType="picture-card" fileList={fileList} onChange={handleChange} onPreview={onPreview} beforeUpload={validationFile} maxCount={1}>
                                <Button style={{width: '100%'}} icon={<UploadOutlined />}>Upload</Button>
                            </Upload>
                        </ImgCrop>
                    </Col>
                    <Col span={24} sm={16}>
                        {productIdEdit !== 0 && (
                            <Form.Item hasFeedback label="ID" name="productId" validateDebounce={1000}>
                                <Input disabled={productIdEdit !== 0} />
                            </Form.Item>
                        )}
                        <Form.Item
                            hasFeedback
                            label="Tên sản phẩm"
                            name="product_name"
                            validateDebounce={1000}
                            rules={[
                                {
                                    required: true,
                                    message: "Thông tin không được bỏ trống",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            hasFeedback
                            label="Danh mục"
                            name="category_id"
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
                                onChange={handleChangeSelect}
                                maxCount = {1}
                            />
                        </Form.Item>
                        <Form.Item
                            hasFeedback
                            label="Mô tả"
                            name="product_description"
                            validateDebounce={1000}
                            rules={[
                                {
                                    required: true,
                                    message: "Thông tin không được bỏ trống",
                                }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            hasFeedback
                            label="Số lượng"
                            name="product_quantity"
                            validateDebounce={1000}
                            rules={[
                                {
                                    required: true,
                                    message: "Thông tin không được bỏ trống",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            hasFeedback
                            label="Giá sản phẩm"
                            name="product_price"
                            validateDebounce={1000}
                            rules={[
                                {
                                    required: true,
                                    message: "Thông tin không được bỏ trống",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            hasFeedback
                            label="Giảm giá"
                            name="product_discount"
                            validateDebounce={1000}
                            rules={[
                                {
                                    required: true,
                                    message: "Thông tin không được bỏ trống",
                                }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            hasFeedback
                            label="Ngày tạo"
                            name="created_date"
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
                            <DatePicker style={{width: "100%"}} format="DD/MM/YYYY" size="large" />
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
    return prevProps.open === nextProps.open && prevProps.productIdEdit === nextProps.productIdEdit && prevProps.dataCategory === nextProps.dataCategory;
};
export default React.memo(ProductForm, areEqual);
