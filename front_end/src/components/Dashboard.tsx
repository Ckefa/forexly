import { Card, Button, Input } from "@/components/ui";
import React, { useEffect, useState, useRef } from "react";

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
  const [income, setIncome] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [invest, setInvest] = useState<number>(0);
  const [recharge, setRecharge] = useState([]);

  const withDm = useRef(null);
  const rechAm = useRef(null);

  useEffect(() => {
    setRefresh(!refresh);
    console.log(packs);
  }, []);

  useEffect(() => {
    console.log("Fetching user details....");
    fetch(`${host}login`)
      .then((resp) => resp.json())
      .then((resp) => {
        if (resp.user) {
          update.setUser(resp.user.user);
          update.setBal(resp.user.bal);
          setPacks(resp.user.packs);
          setPhone(resp.user.phone);
          updateUser(resp.user.packs);
        }
      });
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
    if (rechAm) {
      fetch(`${host}recharge`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then((resp) => {
          return resp.json();
        })
        .then((resp) => {
          if (resp.pending) setRecharge(resp.pending);
          else if (resp.new) setRecharge(resp.new);
          else console.log(resp);
        });
    }
  };

  if (recharge.length > 0) {
    const newWindowHeigth = window.innerHeight;
    const newWindowWidth = window.innerWidth * 0.8;
    const newWindow = window.open(
      "",
      "payment Varification",
      `width=${newWindowWidth}, height=${newWindowHeigth}`
    );
    newWindow?.document.write(`
      <html>
        <body>
          <div>
            <iframe
              title="Checkout Iframe"
              src="${recharge[0]}"
              width="100%"
              height="400"
              allowFullScreen
            ></iframe>
          </div>
        </body>
      </html>
    `);
  }

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

  return (
    <div>
      <div className="font-bold">My Dashboard</div>
      <div className="flex gap-4">
        <Card className="flex-1 p-4">
          <div>User: {user}</div>
          <div>phone: {phone}</div>
          <div>Balance: {bal}</div>
        </Card>

        <Card className="flex-1 p-4">
          <div>Total Invenstments: {invest}</div>
          <div>Todays Income: {income}</div>
          <div>Total Earnings: {total}</div>
        </Card>
      </div>
      <div className="mt-8">
        <div className="font-bold">My Products</div>
        <div className="flex gap-4">
          <div className="bg-gold bg-silver bg-diamond bg-bronze hidden" />
          {packs?.map((item) => (
            <Card
              className={`w-[200px] bg-${item.name} flex flex-col items-center`}
            >
              <div>pack: {item.name}</div>
              <div>price: {item.price} ksh</div>
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
      </div>

      <div className="mt-8">
        <div className="font-bold">Transactions</div>

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
                  onClick={onRecharge}
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
              </div>
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
    </div>
  );
}

export default Dashboard;
