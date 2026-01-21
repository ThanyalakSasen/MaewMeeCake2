import SideBarMenu from "../components/SideBarMenu";
import NavBar from "../components/NavBar";
import Table from "react-bootstrap/Table";
import { Container, Row, Col, Button } from "react-bootstrap";
import { InputField } from "../components/InputField";
import ButtonSubmit from "../components/button";
import { useNavigate } from "react-router-dom";
import { FiEdit, FiTrash2 } from "react-icons/fi";

export default function EmployeeManage() {
  const navigate = useNavigate();

  return (
    <Container fluid className="p-0" style={{ minHeight: "100vh" }}>
      <Row className="g-0" style={{ minHeight: "100vh" }}>
        
        {/* Sidebar */}
        <Col md={2} lg={2} className="bg-white">
          <SideBarMenu />
        </Col>

        {/* Content */}
        <Col md={10} lg={10} style={{ backgroundColor: "#F0F0FA" }}>
          
          {/* Navbar */}
          <div className="p-3">
            <NavBar titleMain="รายชื่อพนักงาน" />
          </div>

          {/* Search + Button */}
          <div
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "10px",
              margin: "0 20px 20px",
            }}
          >
            <Row className="align-items-center">
              <Col md={6}>
                <form style={{ display: "flex", gap: "10px" }}>
                  <InputField />
                  <ButtonSubmit textButton="ค้นหา" />
                </form>
              </Col>
              <Col md={6} className="text-end">
                <Button
                  variant="success"
                  onClick={() => navigate("/create-employee")}
                >
                  เพิ่มพนักงาน
                </Button>
              </Col>
            </Row>
          </div>

          {/* Table */}
          <div
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "10px",
              margin: "0 20px 20px",
            }}
          >
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>รหัสพนักงาน</th>
                  <th>ชื่อ-นามสกุล</th>
                  <th>อีเมล</th>
                  <th>เบอร์โทรศัพท์</th>
                  <th>จัดการ</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Mark Otto</td>
                  <td>mark@mail.com</td>
                  <td>099-999-9999</td>
                  <td>
                    <Button size="sm" variant="warning" className="me-2">
                      <FiEdit /> แก้ไข
                    </Button>
                    <Button size="sm" variant="danger">
                      <FiTrash2 /> ลบ
                    </Button>
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>

        </Col>
      </Row>
    </Container>
  );
}
