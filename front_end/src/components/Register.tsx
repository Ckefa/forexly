import { Form } from "antd";
import { Input, Button } from "@/components/ui";
import { Link } from "react-router-dom";

type parVal = { host: string };

function Register({ host }: parVal) {
  const onFinish = (data: unknown) => {
    console.log(data);
    fetch(`${host}register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((resp) => resp.json())
      .then((resp) => console.log(resp));
  };

  return (
    <div className="">
      <Form className="w-[20vw] mx-auto" layout="vertical" onFinish={onFinish}>
        <span></span>
        <Form.Item label="Phone" name="phone">
          <Input />
        </Form.Item>
        <Form.Item label="Username" name="user">
          <Input />
        </Form.Item>
        <Form.Item label="Set Password" name="passwd">
          <Input />
        </Form.Item>
        <Button type="submit">Register</Button>
        <div className="flex gap-4 items-center">
          <span>I have an account,</span>
          <Link to="/login">
            <Button variant="outline" className="border-primary">
              Login
            </Button>
          </Link>
        </div>
      </Form>
    </div>
  );
}

export default Register;
