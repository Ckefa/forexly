import React, { useEffect, useState, useMemo } from "react";
import { Card } from "@/components/ui";
import { Spin, notification } from "antd";
import type { NotificationPlacement } from "antd/es/notification/interface";

const Context = React.createContext({ name: "Default" });

type parVal = {
  host: string;
  user: string | null;
  bal: string | null;
  update: {
    setUser: React.Dispatch<React.SetStateAction<null>>;
    setBal: React.Dispatch<React.SetStateAction<null>>;
  };
};

type packVal = {
  id: string;
  name: string;
  price: number;
  income: number;
  status: boolean;
  description: string;
  days: number;
  revenue: number;
};

function Dashboard({ host, user, bal, update }: parVal) {
  const [packs, setPacks] = useState<packVal[] | null>(null);
  const [phone, setPhone] = useState<[] | null>(null);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [income, setIncome] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [invest, setInvest] = useState<number>(0);

  const [api, contextHolder] = notification.useNotification();
  const contextValue = useMemo(() => ({ name: "user" }), []);

  useEffect(() => {
    setRefresh(!refresh);
    console.log(packs);
  }, []);

  const fetchLogin = () => {
    setLoading(true);
    fetch(`${host}login`)
      .then((resp) => resp.json())
      .then((resp) => {
        if (resp.user) {
          update.setUser(resp.user.user);
          update.setBal(resp.user.bal);
          setPacks(resp.user.packs);
          setPhone(resp.user.phone);
          updateUser(resp.user.packs);
          setLoading(false);
        }
      });
  };

  useEffect(() => {
    fetchLogin();
    if (user) notify("login success");
  }, [refresh]);

  const updateUser = (packs: packVal[]) => {
    let invest = 0;
    let temp = 0;
    let total = 0;

    packs?.forEach((pack) => {
      invest += pack.price;
      total += pack.revenue;
      if (pack.status) temp += pack.income;
    });
    setInvest(invest);
    setIncome(temp);
    setTotal(total);
  };

  const notify = (
    message: string,
    placement: NotificationPlacement = "topRight"
  ) => {
    api.info({
      message: "Login Status",
      description: message,
      placement,
    });
  };

  return (
    <Context.Provider value={contextValue}>
      {contextHolder}
      <div className="font-bold">My Dashboard</div>

      <div className="flex gap-4">
        <Card className="flex-1 p-4">
          {loading ? (
            <Spin className="ml-28" />
          ) : (
            <React.Fragment>
              <div>User: {user}</div>
              <div>phone: {phone}</div>
              <div>Balance: {bal}</div>
            </React.Fragment>
          )}
        </Card>

        <Card className="flex-1 p-4">
          {loading ? (
            <Spin className="ml-28" />
          ) : (
            <React.Fragment>
              <div>Total Invenstments: {invest}</div>
              <div>Todays Income: {income}</div>
              <div>Total Earnings: {total}</div>
            </React.Fragment>
          )}
        </Card>
      </div>
    </Context.Provider>
  );
}

export default Dashboard;
