import {Card, Radio, Table, Avatar, Button, Image} from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {changeStatusProduct, getProductList} from "../../../reducers/actions/product";
import avatar from "../../../assets/images/avatarUser.png";
import Tooltip from "antd/es/tooltip";
import {EditFilled, EyeFilled, EyeInvisibleFilled} from "@ant-design/icons";
import Swal from "sweetalert2";
import {changeStatusUser} from "../../../reducers/actions/user";
import {getCategoryList} from "../../../reducers/actions/category";
import ProductForm from "../../../components/admin/form/productForm";

export default function Product() {

    const disabled = "Tạm ngưng";
    const enable = "Còn hàng";
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
            width: "20%",
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
            title: "DANH MỤC",
            dataIndex: "category",
            key: "category",
            width: "15%",
            ellipsis: {
                showTitle: false,
            },
            render: (category) => (
                <Tooltip placement="topLeft" title={category}>
                    {category}
                </Tooltip>
            ),
            sorter: (a, b) => a.nameProduct.localeCompare(b.nameProduct),
            fixed: "left",
        },
        {
            title: "GIẢM GIÁ",
            key: "discount",
            dataIndex: "discount",
            width: "10%",
            sorter: (a, b) => a.discount - b.discount,
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


    const { productList, loading, error } = useSelector((state) => state.products);
    const { categoryList } = useSelector((state) => state.categoryReducer);
    const [open, setOpen] = useState(false);
    const [productIdEdit, setProductIdEdit] = useState(0);

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const onSelectChange = (newSelectedRowKeys) => {
        console.log("selectedRowKeys changed: ", newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        getCheckboxProps: (record) => ({
            disabled: record.status === disabled,
        }),

        selectedRowKeys,
        onChange: onSelectChange,
    };

    const openFormAdd = () => {
        setOpen(true);
    };
    const openFormEdit = (event) => {
        setOpen(true);
        const productId = event.currentTarget.getAttribute("data-product-id");
        setProductIdEdit(productId);
    };
    const handleMultipleStatusProduct = () => {
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
                await dispatch(changeStatusProduct(selectedRowKeys));
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
    const handleStatusProduct = (event) => {
        const productId = event.currentTarget.getAttribute("data-product-id");
        let arrProductId = [parseInt(productId)];
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
                await dispatch(changeStatusProduct(arrProductId));
                setSelectedRowKeys([]);
                await Swal.fire({
                    title: "Đã thay đổi",
                    text: "Thông tin đã được cập nhập",
                    icon: "success",
                    allowOutsideClick: false,
                    confirmButtonColor: "#28a745",
                });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                arrProductId = [];
            }
        });
    };

    useEffect(() => {
        console.log("DISPATCH ACTION GET PRODUCT LIST");
        dispatch(getProductList());
        dispatch(getCategoryList());
    }, []);



    if (loading) {
        return <h1>TẢI LÂU VCLLLLLLLLLLLLLLLLLL</h1>;
    }
    // if (error !== null) {
    //     return <h1>TẮT SERVER CMNRRRRRRRRRRRRRRRRRRR</h1>;
    // }

    let dataProduct = [];
    let srcImg = "";
    productList.map((productItem, index) => {
        srcImg = "http://localhost:8080" + productItem["images"];
        return dataProduct.push({
            key: productItem["productId"],
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
            nameProduct: productItem["product_name"],
            quantity: productItem["product_quantity"],
            price: productItem["product_price"],
            description: productItem["product_description"],
            category: productItem["categoryDTO"]?productItem["categoryDTO"]["categoryName"]:"",
            discount: productItem["product_discount"] ? "Không giảm" : productItem["product_discount"],
            status: productItem["deleted"] ? disabled : enable,
            action: (
                <>
                    <Tooltip title="Edit">
                        <Button
                            disabled = {productItem["deleted"]}
                            type="primary"
                            shape="circle"
                            size="large"
                            icon={<EditFilled />}
                            data-product-id={productItem["productId"]}
                            onClick={productItem["deleted"]?(e)=>e.preventDefault():(event) => openFormEdit(event)} />
                    </Tooltip>
                    <Tooltip title={productItem["deleted"] ? "Active" : "Disabled"}>
                        <Button
                            type="primary"
                            shape="circle"
                            size="large"
                            icon={productItem["deleted"] ? <EyeFilled /> : <EyeInvisibleFilled />}
                            data-product-id={productItem["productId"]}
                            style={productItem["deleted"] ? { backgroundColor: "#28a745", marginLeft: "8px" } : { backgroundColor: "#ff7875", marginLeft: "8px" }}
                            onClick={(event) => handleStatusProduct(event)}
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
                            <Radio.Group>
                                <Radio.Button onClick={() => openFormAdd()}>Thêm sản phẩm</Radio.Button>
                                <Radio.Button disabled={selectedRowKeys?.length === 0} onClick={() => handleMultipleStatusProduct()}>Tắt trạng thái</Radio.Button>
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
                            rowSelection={{...rowSelection}}
                            className="ant-border-space"
                        />
                    </div>
                </Card>
            </div>

            <ProductForm
                open={open}
                productIdEdit={productIdEdit}
                onSetProductIdEdit = {setProductIdEdit}
                dataCategory={categoryList}
                onHandleCloseForm={handleCloseForm}
            />
        </>
    );
}
