import { Row, Col, Card, Radio, Table, Upload, message, Progress, Button, Avatar, Typography } from "antd";

import { Link } from "react-router-dom";

// Images
import ava1 from "../../../assets/images/logo-shopify.svg";
import ava2 from "../../../assets/images/logo-atlassian.svg";
import ava3 from "../../../assets/images/logo-slack.svg";
import ava5 from "../../../assets/images/logo-jira.svg";
import ava6 from "../../../assets/images/logo-invision.svg";
import face from "../../../assets/images/face-1.jpg";
import face2 from "../../../assets/images/face-2.jpg";
import face3 from "../../../assets/images/face-3.jpg";
import face4 from "../../../assets/images/face-4.jpg";
import face5 from "../../../assets/images/face-5.jpeg";
import face6 from "../../../assets/images/face-6.jpeg";
import pencil from "../../../assets/images/pencil.svg";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getUsersList} from "../../../reducers/actions/user";
import {getProductList} from "../../../reducers/actions/product";
import avatar from "../../../assets/images/avatarUser.png";

const { Title } = Typography;

// table code start
const columns = [
    {
        title: "TÊN SẢN PHẨM",
        dataIndex: "nameProduct",
        key: "nameProduct",
        width: "30%",
    },
    {
        title: "SỐ LƯỢNG",
        dataIndex: "quantity",
        key: "quantity",
    },

    {
        title: "ĐƠN GIÁ",
        key: "price",
        dataIndex: "price",
    },
    {
        title: "MÔ TẢ",
        key: "description",
        dataIndex: "description",
        width: "30%",
    },
    {
        title: "GIẢM GIÁ",
        key: "discount",
        dataIndex: "discount",
    },
];

export default function Product() {
    const dispatch = useDispatch();
    useEffect(() => {
        console.log("DISPATCH ACTION GET PRODUCT LIST");
        dispatch(getProductList());
    }, [dispatch]);

    const { productList, loading, error } = useSelector((state) => state.products);
    if (loading){
        return <h1>TẢI LÂU VCLLLLLLLLLLLLLLLLLL</h1>
    }
    if (error!== null){
        return <h1>TẮT SERVER CMNRRRRRRRRRRRRRRRRRRR</h1>
    }
    let dataProduct = [];
    productList?.data?.map((productItem, index) => {
        return dataProduct.push({
            key: productItem['productId'],
            nameProduct: (
                <>
                    <Avatar.Group>
                        <Avatar className="shape-avatar" shape="square" size={40} src={productItem['images'] ? "http://localhost:8080"+productItem['images'] : avatar} />
                        <div className="avatar-info">
                            <Title level={5}>{productItem['product_name']}</Title>
                        </div>
                    </Avatar.Group>{" "}
                </>
            ),
            quantity: (
                <>
                    <div className="author-info">
                        <Title level={5}>{productItem['product_quantity']}</Title>
                    </div>
                </>
            ),

            price: (
                <>
                    <Button type="primary" className="tag-primary">
                        {productItem['product_price']}
                    </Button>
                </>
            ),
            description: (
                <>
                    <div className="author-info">
                        <Title level={5}>{productItem['product_description']}</Title>
                    </div>
                </>
            ),
            discount: (
                <>
                    <div className="ant-employed">
                        <span>{productItem['product_discount']===null?"Không":productItem['product_discount']}</span>
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
                        <Table columns={columns} dataSource={dataProduct} pagination={true} className="ant-border-space" />
                    </div>
                </Card>
            </div>
        </>
    );
}
