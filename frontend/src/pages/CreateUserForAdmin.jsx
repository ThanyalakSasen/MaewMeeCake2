import { useState } from "react";
import { InputField } from "../components/InputField";
import { InputDate } from "../components/InputDate";
import SideBarMenu from "../components/SideBarMenu";
import { SelectInput } from "../components/Select";
import NavBar from "../components/NavBar";
import { Row, Col } from "react-bootstrap";

export default function CreateUserForAdmin() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [birthdate, setDateOfBirth] = useState("");
  const [role, setRole] = useState("");
  const [position, setPosition] = useState("");
  const [startWorkDate, setStartWorkDate] = useState("");
  const [empployeeType, setEmployeeType] = useState("");
  const [empployeeSalary, setEmployeeSalary] = useState("");

  const [password, setPassword] = useState("");
  const [passwordLength] = useState(6);
  const [useNumbers] = useState(true);
  const [useLowercase] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");

  const generatePassword = () => {
    let charset = "";
    let newPassword = "";

    if (useNumbers) charset += "0123456789";
    if (useLowercase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (!charset) return;

    for (let i = 0; i < passwordLength; i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    setPassword(newPassword);
  };

  const copyToClipboard = async () => {
    if (!password) return;

    await navigator.clipboard.writeText(password);
    setSuccessMessage("คัดลอกรหัสผ่านเรียบร้อยแล้ว!");
    setTimeout(() => setSuccessMessage(""), 2000);
  };

  const positionOptions = [
    { value: "พนักงานครัว", label: "พนักงานครัว" },
    { value: "พนักงานบริการ", label: "พนักงานบริการ" },
    { value: "ผู้จัดการ", label: "ผู้จัดการ" },
  ];

  const roleOptions = [
    { value: "Employee", label: "พนักงาน" },
    { value: "Customer", label: "ลูกค้า" },
  ];

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handlePositionChange = (e) => {
    setPosition(e.target.value);
  };
  


  return (
    <Row>
      <Col md={2}>
        <SideBarMenu />
      </Col>

      <Col md={10} >
      <div style={{ backgroundColor: "#F0F0FA", minHeight: "100vh" }}></div>
      <Row>

          <div className="p-3">
            <NavBar titleMain="เพิ่มผู้ใช้ใหม่" />
          </div>
      </Row>
      <Row>
        <Col md={6} className="mx-auto mb-4">
        <div className="p-4 bg-white rounded">
            <InputField
              label="ชื่อ-นามสกุล"
              placeholder="กรอกชื่อ-นามสกุล"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
            />

            <InputField
              label="อีเมล"
              placeholder="กรอกอีเมล"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <InputField
              label="เบอร์โทรศัพท์"
              placeholder="กรอกเบอร์โทรศัพท์"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <InputField
              label="รหัสผ่าน"
              type="text"
              value={password}
              readOnly
            />

            <div className="mt-3">
              <button onClick={generatePassword} className="me-2">
                🔐 สร้างรหัสผ่านอัตโนมัติ
              </button>

              <button onClick={copyToClipboard} disabled={!password}>
                📋 คัดลอกรหัสผ่าน
              </button>
            </div>
            <InputDate
              label="วันเกิด"
              value={birthdate}
              onChange={(e) => setDateOfBirth(e.target.value)}
            />

            <SelectInput
              options={positionOptions}
              value={positionOptions}
              placeholder={"เลือกตำแหน่งงาน"}
              label="ตำแหน่งงาน"
              onChange={(e) =>
                setPosition(e.target.value)
              }
              disabled={false}
            />
            <InputDate
              label="วันที่เริ่มงาน"
              value={startWorkDate}
              onChange={(e) => setStartWorkDate(e.target.value)}
            />
            <InputField
              label="ประเภทพนักงาน"
              placeholder="กรอกประเภทพนักงาน"
              value={empployeeType}
              onChange={(e) => setEmployeeType(e.target.value)}
            />
            <InputField
              label="เงินเดือน"
              placeholder="กรอกเงินเดือน"
              value={empployeeSalary}
              onChange={(e) => setEmployeeSalary(e.target.value)}
            />

            {successMessage && (
              <p className="text-success mt-2">{successMessage}</p>
            )}
          </div>
        </Col>
        <Col md={6} className="mx-auto mb-4" style={{ textAlign: "right" }}>
        </Col>
      </Row>
      </Col>
    </Row>
  );
}
