import { Layout, Row, Col } from "antd";
import { HeartFilled } from "@ant-design/icons";
import React from "react";

export default function FooterAdmin() {
    const { Footer: AntFooter } = Layout;

    return (
        <AntFooter style={{ background: "#fafafa" }}>
            <Row className="just">
                <Col xs={24} md={12} lg={12}>
                    <div className="copyright">
                        © 2024, thiết kế bởi
                        {<HeartFilled />}
                        <a href="#" className="font-weight-bold" target="_blank">TPStore</a>
                        cho tín đồ Wjbu
                    </div>
                </Col>
                <Col xs={24} md={12} lg={12}>
                    <div className="footer-menu">
                        <ul>
                            <li className="nav-item">
                                <a href="/" className="nav-link text-muted" target="_blank">
                                    TPStore
                                </a>
                            </li>
                        </ul>
                    </div>
                </Col>
            </Row>
        </AntFooter>
    );
}
