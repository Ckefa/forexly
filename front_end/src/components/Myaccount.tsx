import { useState, useEffect } from "react";
import { lite, silver, gold, diamond, bronze } from "@/assets";
import { Card } from "@/components/ui";
import { Navigate } from "react-router-dom";

type Package = {
  name: string;
  price: string;
  description: string;
  img: string;
};

type packVal = {
  id: string;
  name: string;
  price: string;
  status: boolean;
  description: string;
  days: number;
  revenue: number;
};

type parVal = {
  host: string;
  update: {
    setUser: React.Dispatch<React.SetStateAction<null>>;
    setBal: React.Dispatch<React.SetStateAction<null>>;
  };
};

function Myaccount({ host, update }: parVal) {
  const [packs, setPack] = useState<packVal[] | null>(null);
  const [dash, setDash] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);

  const packages: Package[] = [
    { name: "lite", price: "500ksh", description: "package a", img: lite },
    { name: "silver", price: "800ksh", description: "package b", img: silver },
    { name: "bronze", price: "1000ksh", description: "package c", img: bronze },
    { name: "gold", price: "1500ksh", description: "package d", img: gold },
    {
      name: "diamond",
      price: "2000ksh",
      description: "package e",
      img: diamond,
    },
  ];

  useEffect(() => {
    fetch(`${host}login`)
      .then((resp) => resp.json())
      .then((resp) => {
        console.log(resp);
        if (resp.user) {
          update.setUser(resp.user.user);
          update.setBal(resp.user.bal);
          if (resp.user.packs) setPack(resp.user.packs);
        }
      });
  }, []);

  const subscribe = (name: string) => {
    fetch(`${host}subscribe/${name}`)
      .then((resp) => resp.json())
      .then((resp) => console.log(resp));

    setRefresh(!refresh);
  };

  if (dash) return <Navigate to="/dashboard" />;
  return (
    <div className="flex flex-col">
      <div className="mx-auto font-bold">MyAccount</div>

      <div className="flex flex-col gap-8">
        <div>
          <div className="font-semibold">Active Subscription</div>
          {packs ? (
            <div className="flex gap-4">
              <div className="bg-gold bg-silver bg-diamond bg-bronze hidden" />
              {packs?.map((pack) => (
                <Card
                  onClick={() => setDash(true)}
                  className={`bg-${pack.name} w-[200px] flex flex-col items-center`}
                >
                  <div>{pack.name}</div>
                  <div>{pack.price} ksh</div>
                  <div>Days Left: {pack.days}</div>
                </Card>
              ))}
            </div>
          ) : (
            <div>
              You dont have any active package
              <br />
              Please Choose any package of your choice below!
            </div>
          )}
        </div>

        <div>
          <div className="font-semibold">Available Packages</div>
          <div className="grid grid-cols-3 gap-4 px-4">
            {packages.map((item) => (
              <Card
                onClick={() => subscribe(item.name)}
                className={`w-[20rem] bg-${item.name} flex flex-col items-center`}
                key={item.name}
              >
                <div>{item.name}</div>
                <img className="w-full h-32" src={item.img} />
                <div>{item.price}</div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Myaccount;
