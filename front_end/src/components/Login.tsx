import { Form } from "antd";
import { Link } from "react-router-dom";
import { Input, Button } from "@/components/ui";

function Login() {
  const onFinish = (data: unknown) => {
    console.log(data);
  };

  return (
    <div className="">
      <Form className="w-[20vw] mx-auto" layout="vertical" onFinish={onFinish}>
        <span></span>
        <Form.Item label="Phone" name="phone">
          <Input />
        </Form.Item>

        <Form.Item label="Password" name="passwd">
          <Input />
        </Form.Item>
        <Button type="submit">Login</Button>
        <div className="flex gap-4 items-center">
          <span>I have an account,</span>
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
