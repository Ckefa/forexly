import { Navigate } from "react-router-dom";
import { useState } from "react";

import { Form, Input } from "antd";
import { Button } from "@/components/ui";
import { Link } from "react-router-dom";

type parVal = { host: string };

function Register({ host }: parVal) {
  const [login, setLogin] = useState(false);

  const onFinish = (data: unknown) => {
    console.log(data);
    fetch(`${host}register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((resp) => resp.json())
      .then((resp) => {
        console.log(resp.msg);
        if (resp.msg.includes("success")) setLogin(true);
      });
  };

  if (login) return <Navigate to="/login" />;

  return (
    <div className="">
      <Form className="w-[20vw] mx-auto" layout="vertical" onFinish={onFinish}>
        <span></span>
        <Form.Item label="Phone" name="phone">
          <Input required />
        </Form.Item>
        <Form.Item label="Username" name="user">
          <Input required />
        </Form.Item>
        <Form.Item label="Set Password" name="passwd">
          <Input required />
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
