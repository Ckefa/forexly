import { Card } from "./ui";
import { lite, silver, gold, diamond, bronze } from "@/assets";

type Package = {
  name: string;
  price: string;
  description: string;
  img: string;
};

function Myaccount() {
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

  return (
    <div className="flex flex-col">
      <div className="mx-auto font-bold">MyAccount</div>

      <div className="flex flex-col gap-8">
        <div>
          <div className="font-semibold">Active Subscription</div>
          <div>
            You dont have any active package
            <br />
            Please Choose any package of your choice below!
          </div>
        </div>

        <div>
          <div className="font-semibold">Available Packages</div>
          <div className="grid grid-cols-3 gap-4 px-4">
            {packages.map((item) => (
              <Card
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
