import { Form } from "antd";
import { Link, Navigate } from "react-router-dom";
import { Input, Button } from "@/components/ui";
import { useState } from "react";

type parVal = {
  host: string;
};
function Login({ host }: parVal) {
  const [home, setHome] = useState(false);

  const onFinish = (data: unknown) => {
    fetch(`${host}login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((resp) => resp.json())
      .then((resp) => {
        console.log(resp);
        if (resp.msg.includes("success")) setHome(true);
      });
  };

  if (home) return <Navigate to="/myaccount" />;

  return (
    <div className="">
      <Form className="w-[20vw] mx-auto" layout="vertical" onFinish={onFinish}>
        <span></span>
        <Form.Item label="Phone" name="phone">
          <Input required />
        </Form.Item>

        <Form.Item label="Password" name="passwd">
          <Input required />
        </Form.Item>
        <Button type="submit">Login</Button>
        <div className="flex gap-4 items-center">
          <span>New member,</span>
          <Link to="/register">
            <Button variant="outline" className="border-primary">
              Register
            </Button>
          </Link>
        </div>
      </Form>
    </div>
  );
}

export default Login;
