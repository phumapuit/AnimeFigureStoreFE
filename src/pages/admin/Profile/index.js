import React from "react";

import { Row, Col, Card, Button, List, Descriptions, Avatar, Radio } from "antd";

import { FacebookOutlined, TwitterOutlined, InstagramOutlined } from "@ant-design/icons";

import BgProfile from "../../../assets/images/bg-profile.jpg";
import profilavatar from "../../../assets/images/face-1.jpg";
import convesionImg from "../../../assets/images/face-3.jpg";
import convesionImg2 from "../../../assets/images/face-4.jpg";
import convesionImg3 from "../../../assets/images/face-5.jpeg";
import project1 from "../../../assets/images/home-decor-1.jpeg";
import project2 from "../../../assets/images/home-decor-2.jpeg";
import project3 from "../../../assets/images/home-decor-3.jpeg";

export default function Profile() {
    const download = [
        <svg width="15" height="15" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" key="0">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3 17C3 16.4477 3.44772 16 4 16H16C16.5523 16 17 16.4477 17 17C17 17.5523 16.5523 18 16 18H4C3.44772 18 3 17.5523 3 17ZM6.29289 9.29289C6.68342 8.90237 7.31658 8.90237 7.70711 9.29289L9 10.5858L9 3C9 2.44772 9.44771 2 10 2C10.5523 2 11 2.44771 11 3L11 10.5858L12.2929 9.29289C12.6834 8.90237 13.3166 8.90237 13.7071 9.29289C14.0976 9.68342 14.0976 10.3166 13.7071 10.7071L10.7071 13.7071C10.5196 13.8946 10.2652 14 10 14C9.73478 14 9.48043 13.8946 9.29289 13.7071L6.29289 10.7071C5.90237 10.3166 5.90237 9.68342 6.29289 9.29289Z"
                fill="#111827"
            />
        </svg>,
    ];

    const pencil = [
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" key={0}>
            <path d="M13.5858 3.58579C14.3668 2.80474 15.6332 2.80474 16.4142 3.58579C17.1953 4.36683 17.1953 5.63316 16.4142 6.41421L15.6213 7.20711L12.7929 4.37868L13.5858 3.58579Z" className="fill-gray-7" />
            <path d="M11.3787 5.79289L3 14.1716V17H5.82842L14.2071 8.62132L11.3787 5.79289Z" className="fill-gray-7" />
        </svg>,
    ];

    const data = [
        {
            title: "Nguyễn Huỳnh Phú",
            avatar: convesionImg,
            description: "Leader of project",
        },
        {
            title: "Lê Văn Thuận",
            avatar: convesionImg2,
            description: "Manager of project",
        },
    ];

    const project = [
        {
            img: project1,
            titlesub: "Link: ",
            title: "Booking Movie",
            description: "As Uber works through a huge amount of internal management turmoil.",
        },
        {
            img: project2,
            titlesub: "Link: ",
            title: "Laptop Management",
            description: "Music is something that every person has his or her own specific opinion about.",
        },
        {
            img: project3,
            titlesub: "Link:",
            title: "Anime Figure Store",
            description: "Different people have different taste, and various types of music, Zimbali Resort",
        },
    ];

    return (
        <>
            <div className="profile-nav-bg" style={{ backgroundImage: "url(" + BgProfile + ")" }} />

            <Card
                className="card-profile-head"
                styles={{ body: { display: "none" } }}
                title={
                    <Row justify="space-between" align="middle" gutter={[24, 0]}>
                        <Col span={24} md={12} className="col-info">
                            <Avatar.Group>
                                <Avatar size={74} shape="square" src={profilavatar} />

                                <div className="avatar-info">
                                    <h4 className="font-semibold m-0">Username</h4>
                                    <p>Administrator</p>
                                </div>
                            </Avatar.Group>
                        </Col>
                        <Col
                            span={24}
                            md={12}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "flex-end",
                            }}
                        >
                            <Radio.Group defaultValue="a">
                                <Radio.Button value="a">Đồ án</Radio.Button>
                            </Radio.Group>
                        </Col>
                    </Row>
                }
            />

            <Row gutter={[24, 0]}>
                <Col span={24} md={16} className="mb-24">
                    <Card
                        bordered={false}
                        title={<h6 className="font-semibold m-0">Profile Information</h6>}
                        className="header-solid h-full card-profile-information"
                        extra={<Button type="link">{pencil}</Button>}
                        style={{ body: {paddingTop: 0, paddingBottom: 16 }}}
                    >
                        <p className="text-dark">
                            {" "}
                            Hi, I’m Alec Thompson, Decisions: If you can’t decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality).{" "}
                        </p>
                        <hr className="my-25" />
                        <Descriptions title="Oliver Liam">
                            <Descriptions.Item label="Full Name" span={3}>
                                Sarah Emily Jacob
                            </Descriptions.Item>
                            <Descriptions.Item label="Mobile" span={3}>
                                (44) 123 1234 123
                            </Descriptions.Item>
                            <Descriptions.Item label="Email" span={3}>
                                sarahjacob@mail.com
                            </Descriptions.Item>
                            <Descriptions.Item label="Location" span={3}>
                                Việt Nam
                            </Descriptions.Item>
                            <Descriptions.Item label="Social" span={3}>
                                <a href="#pablo" className="mx-5 px-5">
                                    {<TwitterOutlined />}
                                </a>
                                <a href="#pablo" className="mx-5 px-5">
                                    {<FacebookOutlined style={{ color: "#344e86" }} />}
                                </a>
                                <a href="#pablo" className="mx-5 px-5">
                                    {<InstagramOutlined style={{ color: "#e1306c" }} />}
                                </a>
                            </Descriptions.Item>
                        </Descriptions>
                    </Card>
                </Col>
                <Col span={24} md={8} className="mb-24">
                    <Card bordered={false} title={<h6 className="font-semibold m-0">Thành viên dự án</h6>} className="header-solid h-full" style={{ body:{paddingTop: 0, paddingBottom: 16}}}>
                        <List
                            itemLayout="horizontal"
                            dataSource={data}
                            split={false}
                            className="conversations-list"
                            renderItem={(item) => (
                                <List.Item actions={[<Button type="link">{download} CV</Button>]}>
                                    <List.Item.Meta avatar={<Avatar shape="square" size={48} src={item.avatar} />} title={item.title} description={item.description} />
                                </List.Item>
                            )}
                        />
                    </Card>
                </Col>
            </Row>
            <Card
                bordered={false}
                className="header-solid mb-24"
                title={
                    <>
                        <h6 className="font-semibold">Đồ án cá nhân</h6>
                        <p>Thiết kế website</p>
                    </>
                }
            >
                <Row gutter={[24, 24]}>
                    {project.map((p, index) => (
                        <Col span={24} md={12} xl={8} key={index}>
                            <Card bordered={false} className="card-project" cover={<img alt="example" src={p.img} />}>
                                <div className="card-tag">{p.titlesub}</div>
                                <h5>{p.title}</h5>
                                <p>{p.description}</p>
                                <Row gutter={[6, 0]} className="card-footer">
                                    <Col span={12}>
                                        <Button type="button">VIEW PROJECT</Button>
                                    </Col>
                                    <Col span={12} className="text-right">
                                        <Avatar.Group className="avatar-chips">
                                            <Avatar size="small" src={convesionImg2} />
                                            <Avatar size="small" src={convesionImg3} />
                                        </Avatar.Group>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Card>
        </>
    );
}
