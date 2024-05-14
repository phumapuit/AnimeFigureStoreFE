import React from "react";

import { Card, Col, Row, Typography, Tooltip, Progress } from "antd";
import { RightOutlined } from "@ant-design/icons";
import Paragraph from "antd/lib/typography/Paragraph";

import Echart from "../../../components/admin/chart/EChart";
import LineChart from "../../../components/admin/chart/LineChart";

import ava1 from "../../../assets/images/logo-shopify.svg";
import ava2 from "../../../assets/images/logo-atlassian.svg";
import ava3 from "../../../assets/images/logo-slack.svg";
import ava4 from "../../../assets/images/logo-apple.svg";
import ava5 from "../../../assets/images/logo-jira.svg";
import ava6 from "../../../assets/images/logo-invision.svg";
import team1 from "../../../assets/images/team-1.jpg";
import team2 from "../../../assets/images/team-2.jpg";
import team3 from "../../../assets/images/team-3.jpg";
import team4 from "../../../assets/images/team-4.jpg";
import card from "../../../assets/images/info-card-1.jpg";

export default function Dashboard() {
    const { Title, Text } = Typography;
    const dollor = [
        <svg
            width="22"
            height="22"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            key={0}
        >
            <path
                d="M8.43338 7.41784C8.58818 7.31464 8.77939 7.2224 9 7.15101L9.00001 8.84899C8.77939 8.7776 8.58818 8.68536 8.43338 8.58216C8.06927 8.33942 8 8.1139 8 8C8 7.8861 8.06927 7.66058 8.43338 7.41784Z"
                fill="#fff"
            />
            <path
                d="M11 12.849L11 11.151C11.2206 11.2224 11.4118 11.3146 11.5666 11.4178C11.9308 11.6606 12 11.8861 12 12C12 12.1139 11.9308 12.3394 11.5666 12.5822C11.4118 12.6854 11.2206 12.7776 11 12.849Z"
                fill="#fff"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM11 5C11 4.44772 10.5523 4 10 4C9.44772 4 9 4.44772 9 5V5.09199C8.3784 5.20873 7.80348 5.43407 7.32398 5.75374C6.6023 6.23485 6 7.00933 6 8C6 8.99067 6.6023 9.76515 7.32398 10.2463C7.80348 10.5659 8.37841 10.7913 9.00001 10.908L9.00002 12.8492C8.60902 12.7223 8.31917 12.5319 8.15667 12.3446C7.79471 11.9275 7.16313 11.8827 6.74599 12.2447C6.32885 12.6067 6.28411 13.2382 6.64607 13.6554C7.20855 14.3036 8.05956 14.7308 9 14.9076L9 15C8.99999 15.5523 9.44769 16 9.99998 16C10.5523 16 11 15.5523 11 15L11 14.908C11.6216 14.7913 12.1965 14.5659 12.676 14.2463C13.3977 13.7651 14 12.9907 14 12C14 11.0093 13.3977 10.2348 12.676 9.75373C12.1965 9.43407 11.6216 9.20873 11 9.09199L11 7.15075C11.391 7.27771 11.6808 7.4681 11.8434 7.65538C12.2053 8.07252 12.8369 8.11726 13.254 7.7553C13.6712 7.39335 13.7159 6.76176 13.354 6.34462C12.7915 5.69637 11.9405 5.26915 11 5.09236V5Z"
                fill="#fff"
            />
        </svg>,
    ];
    const profile = [
        <svg
            width="22"
            height="22"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            key={0}
        >
            <path
                d="M9 6C9 7.65685 7.65685 9 6 9C4.34315 9 3 7.65685 3 6C3 4.34315 4.34315 3 6 3C7.65685 3 9 4.34315 9 6Z"
                fill="#fff"
            />
            <path
                d="M17 6C17 7.65685 15.6569 9 14 9C12.3431 9 11 7.65685 11 6C11 4.34315 12.3431 3 14 3C15.6569 3 17 4.34315 17 6Z"
                fill="#fff"
            />
            <path
                d="M12.9291 17C12.9758 16.6734 13 16.3395 13 16C13 14.3648 12.4393 12.8606 11.4998 11.6691C12.2352 11.2435 13.0892 11 14 11C16.7614 11 19 13.2386 19 16V17H12.9291Z"
                fill="#fff"
            />
            <path
                d="M6 11C8.76142 11 11 13.2386 11 16V17H1V16C1 13.2386 3.23858 11 6 11Z"
                fill="#fff"
            />
        </svg>,
    ];

    const count = [
        {
            today: "Thu nhập hôm nay",
            title: "$53,000",
            persent: "+30%",
            icon: dollor,
            bnb: "bnb2",
        },
        {
            today: "Tổng số khách hàng",
            title: "3,200",
            persent: "+20%",
            icon: profile,
            bnb: "bnb2",
        },
    ];

    const list = [
        {
            img: ava1,
            Title: "Soft UI Shopify Version",
            bud: "$14,000",
            progress: <Progress percent={60} size="small" />,
            member: (
                <div className="avatar-group mt-2">
                    <Tooltip placement="bottom" title="Ryan Tompson">
                        <img className="tootip-img" src={team1} alt="" />
                    </Tooltip>
                    <Tooltip placement="bottom" title="Romina Hadid">
                        <img className="tootip-img" src={team2} alt="" />
                    </Tooltip>
                    <Tooltip placement="bottom" title="Alexander Smith">
                        <img className="tootip-img" src={team3} alt="" />
                    </Tooltip>
                    <Tooltip placement="bottom" title="Jessica Doe">
                        <img className="tootip-img" src={team4} alt="" />
                    </Tooltip>
                </div>
            ),
        },
        {
            img: ava2,
            Title: "Progress Track",
            bud: "$3,000",
            progress: <Progress percent={10} size="small" />,
            member: (
                <div className="avatar-group mt-2">
                    <Tooltip placement="bottom" title="Ryan Tompson">
                        <img className="tootip-img" src={team1} alt="" />
                    </Tooltip>
                    <Tooltip placement="bottom" title="Romina Hadid">
                        <img className="tootip-img" src={team2} alt="" />
                    </Tooltip>
                </div>
            ),
        },
        {
            img: ava3,
            Title: "Fix Platform Errors",
            bud: "Not Set",
            progress: <Progress percent={100} size="small" status="active" />,
            member: (
                <div className="avatar-group mt-2">
                    <Tooltip placement="bottom" title="Ryan Tompson">
                        <img className="tootip-img" src={team1} alt="" />
                    </Tooltip>
                    <Tooltip placement="bottom" title="Romina Hadid">
                        <img className="tootip-img" src={team1} alt="" />
                    </Tooltip>
                    <Tooltip placement="bottom" title="Alexander Smith">
                        <img className="tootip-img" src={team3} alt="" />
                    </Tooltip>
                </div>
            ),
        },
        {
            img: ava4,
            Title: "Launch new Mobile App",
            bud: "$20,600",
            progress: <Progress percent={100} size="small" status="active" />,
            member: (
                <div className="avatar-group mt-2">
                    <Tooltip placement="bottom" title="Ryan Tompson">
                        <img className="tootip-img" src={team1} alt="" />
                    </Tooltip>
                    <Tooltip placement="bottom" title="Romina Hadid">
                        <img className="tootip-img" src={team2} alt="" />
                    </Tooltip>
                </div>
            ),
        },
        {
            img: ava5,
            Title: "Add the New Landing Page",
            bud: "$4,000",
            progress: <Progress percent={80} size="small" />,
            member: (
                <div className="avatar-group mt-2">
                    <Tooltip placement="bottom" title="Ryan Tompson">
                        <img className="tootip-img" src={team1} alt="" />
                    </Tooltip>
                    <Tooltip placement="bottom" title="Romina Hadid">
                        <img className="tootip-img" src={team2} alt="" />
                    </Tooltip>
                    <Tooltip placement="bottom" title="Alexander Smith">
                        <img className="tootip-img" src={team3} alt="" />
                    </Tooltip>
                    <Tooltip placement="bottom" title="Jessica Doe">
                        <img className="tootip-img" src={team4} alt="" />
                    </Tooltip>
                </div>
            ),
        },

        {
            img: ava6,
            Title: "Redesign Online Store",
            bud: "$2,000",
            progress: (
                <Progress
                    percent={100}
                    size="small"
                    status="exception"
                    format={() => "Cancel"}
                />
            ),
            member: (
                <div className="avatar-group mt-2">
                    <Tooltip placement="bottom" title="Ryan Tompson">
                        <img className="tootip-img" src={team1} alt="" />
                    </Tooltip>
                    <Tooltip placement="bottom" title="Romina Hadid">
                        <img className="tootip-img" src={team2} alt="" />
                    </Tooltip>
                </div>
            ),
        },
    ];

    return (
        <>
            <div className="layout-content">
                <Row className="rowgap-vbox" gutter={[24, 0]}>
                    {count.map((c, index) => (
                        <Col
                            key={index}
                            xs={24}
                            sm={24}
                            md={12}
                            lg={6}
                            xl={6}
                            className="mb-24"
                        >
                            <Card bordered={false} className="criclebox ">
                                <div className="number">
                                    <Row align="middle" gutter={[24, 0]}>
                                        <Col xs={18}>
                                            <span>{c.today}</span>
                                            <Title level={3}>
                                                {c.title} <small className={c.bnb}>{c.persent}</small>
                                            </Title>
                                        </Col>
                                        <Col xs={6}>
                                            <div className="icon-box">{c.icon}</div>
                                        </Col>
                                    </Row>
                                </div>
                            </Card>
                        </Col>
                    ))}
                </Row>

                <Row gutter={[24, 0]}>
                    <Col xs={24} sm={24} md={12} lg={12} xl={10} className="mb-24">
                        <Card bordered={false} className="criclebox h-full">
                            <Echart />
                        </Card>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={14} className="mb-24">
                        <Card bordered={false} className="criclebox h-full">
                            <LineChart />
                        </Card>
                    </Col>
                </Row>

                <Card bordered={false} className="criclebox cardbody h-full mb-24">
                    <div className="project-ant">
                        <div>
                            <Title level={5}>NHÀ CUNG CẤP</Title>
                        </div>
                    </div>
                    <div className="ant-list-box table-responsive">
                        <table className="width-100">
                            <thead>
                            <tr>
                                <th>TÊN CÔNG TY</th>
                                <th>TỔNG SẢN PHẨM</th>
                                <th>NGÀY ĐĂNG KÝ</th>
                                <th>TRẠNG THÁI</th>
                            </tr>
                            </thead>
                            <tbody>
                            {list.map((d, index) => (
                                <tr key={index}>
                                    <td>
                                        <h6>
                                            <img src={d.img} alt="" className="avatar-sm mr-10" />{" "}
                                            {d.Title}
                                        </h6>
                                    </td>
                                    <td>{d.member}</td>
                                    <td>
                                        <span className="text-xs font-weight-bold">{d.bud} </span>
                                    </td>
                                    <td>
                                        <div className="percent-progress">{d.progress}</div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </Card>

                <Row gutter={[24, 0]}>
                    <Col xs={24} md={12} sm={24} lg={12} xl={14} className="mb-24">
                        <Card bordered={false} className="criclebox h-full">
                            <Row gutter>
                                <Col
                                    xs={24}
                                    md={12}
                                    sm={24}
                                    lg={12}
                                    xl={14}
                                    className="mobile-24"
                                >
                                    <div className="h-full col-content p-20">
                                        <div className="ant-muse">
                                            <Text>Thiết kế bởi TPStore</Text>
                                            <Title level={5}>Template admin cho website</Title>
                                            <Paragraph className="lastweek mb-36">
                                                Hỗ trợ cho người dùng trong việc quản lý sản phẩm, khách hàng, nhà cung cấp và hoá đơn
                                            </Paragraph>
                                        </div>
                                        <div className="card-footer">
                                            <a className="icon-move-right" href="/">
                                                Xem thêm
                                                {<RightOutlined />}
                                            </a>
                                        </div>
                                    </div>
                                </Col>
                                <Col
                                    xs={24}
                                    md={12}
                                    sm={24}
                                    lg={12}
                                    xl={10}
                                    className="col-img"
                                >
                                    <div className="ant-cret text-right">
                                        <img src={card} alt="" className="border10" />
                                    </div>
                                </Col>
                            </Row>
                        </Card>
                    </Col>

                    <Col xs={24} md={12} sm={24} lg={12} xl={10} className="mb-24">
                        <Card bordered={false} className="criclebox card-info-2 h-full">
                            <div className="gradent h-full col-content">
                                <div className="card-content">
                                    <Title level={5}>Tối ưu hiệu suất</Title>
                                    <p>
                                        Quản lý chi tiết, sử dụng dễ dàng. Hãy nhanh chóng sử dụng để có thể đi đầu trong thị trường Figure Anime
                                    </p>
                                </div>
                                <div className="card-footer">
                                    <a className="icon-move-right" href="/">
                                        Xem thêm
                                        <RightOutlined />
                                    </a>
                                </div>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    );
}

