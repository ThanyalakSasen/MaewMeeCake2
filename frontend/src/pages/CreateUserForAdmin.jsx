import React from "react";
import { InputField } from "../components/InputField";
import InputDate from "../components/inputDate";
import { Select } from "../components/select";
import ButtonSubmit from "../components/button";
import SideBarMenu from "../components/SideBarMenu";
import NavBar from "../components/NavBar";
import { Row, Col, Container, Form } from "react-bootstrap";

export default function CreateUserForAdmin() {
  return (
    <Row>
      <Col md={2}>
        <SideBarMenu />
      </Col>
      <Col md={10}>
        <div style={{ backgroundColor: "#F0F0FA" }}>
          <div className="p-3">
            <NavBar titleMain="เพิ่มผู้ใช้ใหม่" />
          </div>
          <div style={{ backgroundColor: "#F0F0FA", borderRadius: "10px" }}>
            
          </div>
        </div>
      </Col>
    </Row>
  );
}
