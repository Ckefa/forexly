import React, { useEffect, useState, useRef, useMemo } from "react";
import { Card, Button, Input } from "@/components/ui";
import { Modal, Spin, notification } from "antd";
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

type rechPar = {
  amount: number;
  status: boolean;
  order_track_id: string;
  checkout: string;
};

function Dashboard({ host, user, bal, update }: parVal) {
  const [packs, setPacks] = useState<packVal[] | null>(null);
  const [phone, setPhone] = useState<[] | null>(null);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadRech, setLoadRech] = useState<boolean>(false);
  const [income, setIncome] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [invest, setInvest] = useState<number>(0);
  const [recharge, setRecharge] = useState<rechPar[]>([]);
  const [checkout, setCheckout] = useState<boolean>(false);
  const [url, setUrl] = useState<string>("");

  const [api, contextHolder] = notification.useNotification();

  const withDm = useRef(null);
  const rechAm = useRef(null);

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
  const fetchRecharge = () => {
    setLoadRech(true);
    fetch(`${host}recharge`)
      .then((resp) => resp.json())
      .then((resp) => {
        console.log(resp);
        if (resp.pending) setRecharge(resp.pending);
        else setRecharge([]);

        setLoadRech(false);
      });
  };

  useEffect(() => {
    fetchLogin();
    fetchRecharge();
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

  const receive = (subid: string) => {
    fetch(`${host}receive/${subid}`)
      .then((resp) => resp.json())
      .then((resp) => {
        console.log(resp);
        setRefresh(!refresh);
      });
  };

  const onRecharge = () => {
    setLoadRech(true);
    let redLight = false;
    if (recharge.some((item) => !item.status)) {
      notify(
        "Please cancel all pending and failed recharge bofore requesting for anothor"
      );
      redLight = true;
    }

    if (redLight) return;

    const amount = (rechAm.current as null | HTMLInputElement)?.value;

    if (amount) {
      fetch(`${host}recharge`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: amount }),
      })
        .then((resp) => {
          return resp.json();
        })
        .then((resp) => {
          if (resp.pending) {
            setRecharge(resp.pending);
            checkOut(resp.pending.checkout);
          } else if (resp.new) {
            setRecharge(resp.new);
            checkOut(resp.new.checkout);
          } else console.log(resp);

          setRefresh(!refresh);
        });
    } else notify("invalid recharge amount");
  };

  const onClose = () => {
    setCheckout(false);
    fetch(`${host}recharge`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        order_track_id: recharge[0].order_track_id,
      }),
    })
      .then((resp) => resp.json())
      .then((resp) => {
        console.log(resp);
        if (resp.payment_status_code)
          notify(
            `recharge of ${resp.amount} ${resp.payment_status_description} ${resp.payment_status_code}`
          );
        else if (resp.payment_status_description)
          notify(
            `recharge of ${resp.amount}, description: ${resp.payment_status_description}`
          );
        else notify(resp.msg);
      });
  };

  const checkOut = (url: string) => {
    setUrl(url);
    setCheckout(true);
  };

  const cancelRecharge = (order_track_id: string) => {
    fetch(`${host}cancel/${order_track_id}`)
      .then((resp) => resp.json())
      .then((resp) => {
        console.log(resp);
        setRefresh(!refresh);
      });
  };

  const activeButton = (
    e: React.ChangeEvent<HTMLInputElement>,
    cls: string
  ) => {
    const value = e.target.value;
    const element = document.querySelector(`.${cls}`);
    value
      ? element?.classList.add("bg-green-500")
      : element?.classList.remove("bg-green-500");
  };

  const contextValue = useMemo(
    () => ({
      name: "Ckefa",
    }),
    []
  );

  const notify = (
    message: string,
    placement: NotificationPlacement = "topRight"
  ) => {
    api.info({
      message: "Trasnasction Status",
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
      <div className="mt-8">
        <div className="font-bold">My Products</div>
        {loading ? (
          <Spin className="ml-28" />
        ) : (
          <div className="flex gap-4">
            <div className="bg-gold bg-silver bg-diamond bg-bronze hidden" />
            {packs?.map((item) => (
              <Card>
                <div>pack: {item.name}</div>
                <div>price: {item.price} ksh</div>
                className=
                {`w-[200px] bg-${item.name} flex flex-col items-center`}
                <div>revenue: {item.revenue} ksh</div>
                <Button
                  className="w-full"
                  variant={item.status ? "secondary" : undefined}
                  onClick={() => receive(item.id)}
                >
                  {item.status ? "Received" : "Receive"}
                </Button>
              </Card>
            ))}
          </div>
        )}
      </div>

      <div className="mt-8">
        <div className="font-bold">Transactions</div>

        <Modal
          title="complete checkout"
          visible={checkout}
          onOk={onClose}
          onCancel={onClose}
        >
          <iframe src={url} width="100%" height="500" />
        </Modal>

        <Card className="flex p-4 gap-4">
          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              <Card className="p-4 flex flex-col gap-4">
                <div>Recharge my account</div>
                <Input
                  ref={rechAm}
                  onChange={(e) => activeButton(e, "recharge")}
                  placeholder="200"
                />
                <Button
                  onClick={() => onRecharge()}
                  variant="outline"
                  className="recharge border-blue-300"
                >
                  Recharge
                </Button>
              </Card>
              <Card className="p-4 flex flex-col gap-4">
                <div>Withdraw from my wallet</div>
                <Input
                  placeholder="200"
                  onChange={(e) => activeButton(e, "withdraw")}
                  ref={withDm}
                />
                <Button variant="outline" className="withdraw border-blue-300">
                  Withdraw
                </Button>
              </Card>
            </div>
            <Card className="p-4">
              <div>
                Copy and share below referral link to earn amazing rewards!
              </div>
              <div>https://forexly.myapp.com/register/uid</div>
            </Card>
          </div>

          <div className="flex-1">
            <div>Transaction History</div>
            <Card>
              <div className="flex px-4 gap-4 justify-between">
                <div>Type</div>
                <div>amount</div>
                <div>status</div>
                <div>action</div>
              </div>
              {loadRech ? (
                <Spin className="ml-28" />
              ) : (
                <div>
                  {recharge.map((item) => (
                    <div
                      key={item.order_track_id}
                      className="flex px-4 gap-4 justify-between"
                    >
                      <div>Recharge</div>
                      <div>{item.amount}</div>
                      <div>{item.status ? "successful" : "pending.."}</div>
                      <div className="flex gap-1">
                        {!item.status && (
                          <Button onClick={() => checkOut(item.checkout)}>
                            pay
                          </Button>
                        )}

                        <Button
                          onClick={() => cancelRecharge(item.order_track_id)}
                          variant={item.status ? "outline" : "destructive"}
                        >
                          {item.status ? "done" : "cancel"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>
        </Card>
      </div>
      <div className="mt-8">
        <div className="font-bold">Rewards</div>
        <div className="flex gap-4">
          <Card className="flex flex-col p-4 gap-4">
            <div>Redeem voucher</div>
            <Input />
            <Button variant="secondary" className="bg-diamond">
              Redeem
            </Button>
          </Card>

          <Card className="p-4">
            <div> Team Members: {0}</div>
            <div>My refferals Earnings: {0}</div>
            <div>My Redeemed vouchers: {0}</div>
          </Card>
        </div>
      </div>
    </Context.Provider>
  );
}

export default Dashboard;
