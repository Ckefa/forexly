import { useState, useEffect } from "react";
import { botswana } from "@/assets";
import { Card } from "@/components/ui";
import { Spin } from "antd";

type parVal = {
  host: string;
  update: {
    setUser: React.Dispatch<React.SetStateAction<null>>;
    setBal: React.Dispatch<React.SetStateAction<null>>;
  };
};

function Myaccount({ host, update }: parVal) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`${host}login`)
      .then((resp) => resp.json())
      .then((resp) => {
        console.log(resp);
        if (resp.user) {
          update.setUser(resp.user.user);
          update.setBal(resp.user.bal);
          setLoading(false);
        }
      });
  }, []);

  return (
    <div className="flex flex-col">
      <div>
        <div className="font-semibold">My Account</div>
        {loading && <Spin />}
        <div className="flex justify-center gap-4">
          <img src={botswana} className="w-[50vw] h-35 " />
        </div>
      </div>

      <div className="flex flex-col">
        <div className="font-semibold text-[18pt] text-primary mx-auto">
          How To Deposit
        </div>
        <Card className="mx-auto p-4">
          <ul>
            <li>Dial *145#</li>
            <li>
              Choose option <b>2 'Orange Money'</b> Transactions
            </li>
            <li>Please enter your secret code</li>
            <li>
              Choose option <b>'5 Internatinal Money Transfer'</b>
            </li>
            <li>
              Choose country <b>Kenya</b>
            </li>
            <li>Recipinent Number +254713293959</li>
            <li>Enter amount....</li>
            <li>Agent name AMOS</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
export default Myaccount;
