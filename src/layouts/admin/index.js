import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Layout, Drawer, Affix } from "antd";
import Sidenav from "../../components/admin/Sidenav";
import { Outlet } from "react-router-dom";
import HeaderAdmin from "../../components/admin/header";
import FooterAdmin from "../../components/admin/footer";

const { Header: AntHeader, Content, Sider } = Layout;

export default function Main() {
    const [open, setOpen] = useState(false);
    const [sidenavColor, setSidenavColor] = useState("#1890ff");
    const [sidenavType, setSidenavType] = useState("transparent");
    const [fixed, setFixed] = useState(false);

    const openDrawer = () => setOpen(!open);
    const handleSidenavType = (type) => setSidenavType(type);
    const handleSidenavColor = (color) => setSidenavColor(color);
    const handleFixedNavbar = (type) => setFixed(type);

    let { pathname } = useLocation();
    pathname = pathname.replace("/admin/", "");
    return (
        <Layout className={`layout-dashboard ${pathname === "profile" ? "layout-profile" : ""}`}>
            <Drawer title={false} placement="left" closable={false} onClose={() => setOpen(false)} open={open} key="left" width={250} className={`drawer-sidebar`} getContainer={false}>
                <Layout className={`layout-dashboard`}>
                    <Sider trigger={null} width={250} theme="light" className={`sider-primary ant-layout-sider-primary ${sidenavType === "#fff" ? "active-route" : ""}`} style={{ background: sidenavType }}>
                        <Sidenav color={sidenavColor} />
                    </Sider>
                </Layout>
            </Drawer>
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                onCollapse={(collapsed, type) => {
                    console.log(collapsed, type);
                }}
                trigger={null}
                width={250}
                theme="light"
                className={`sider-primary ant-layout-sider-primary ${sidenavType === "#fff" ? "active-route" : ""}`}
                style={{ background: sidenavType }}
            >
                <Sidenav color={sidenavColor} />
            </Sider>
            <Layout>
                {fixed ? (
                    <Affix>
                        <AntHeader className={`${fixed ? "ant-header-fixed" : ""}`}>
                            <HeaderAdmin onPress={openDrawer} name={pathname} subName={pathname} handleSidenavColor={handleSidenavColor} handleSidenavType={handleSidenavType} handleFixedNavbar={handleFixedNavbar} />
                        </AntHeader>
                    </Affix>
                ) : (
                    <AntHeader className={`${fixed ? "ant-header-fixed" : ""}`}>
                        <HeaderAdmin onPress={openDrawer} name={pathname} subName={pathname} handleSidenavColor={handleSidenavColor} handleSidenavType={handleSidenavType} handleFixedNavbar={handleFixedNavbar} />
                    </AntHeader>
                )}
                <Content className="content-ant">
                    <main>
                        <Outlet />
                    </main>
                </Content>
                <FooterAdmin />
            </Layout>
        </Layout>
    );
}
