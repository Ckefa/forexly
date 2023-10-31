import { Link } from "react-router-dom";

import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { hero1, trend } from "@/assets";

function Home() {
  return (
    <div className="flex flex-col gap-8">
      <Card className="p-4 min-h-[50vh] grid grid-cols-1 lg:grid-cols-2 items-center gap-8 bg-secondary">
        <div className="flex flex-col justify-center ">
          <h1 className="text-4xl font-bold text-primary mb-4">
            Elevate Your Trading Game
          </h1>
          <p className="text-lg text-foreground mb-6">
            Join our Forex trading community and unlock a world of opportunities
            in the financial markets.
          </p>
          <div className="flex justify-center py-4 gap-4">
            <Link to="/login">
              <Button variant="outline" className="text-lg font-semibold">
                Login
              </Button>
            </Link>
            <Link className="" to="/register">
              <Button
                className="bg-primary text-white rounded-full
               text-lg font-semibold "
              >
                Get Started
              </Button>
            </Link>
          </div>
        </div>
        <img src={hero1} className="rounded" />
      </Card>

      <div className="p-4 flex flex-col justify-center items-center">
        <div className="text-4xl font-semibold mb-4">About Us</div>
        <div className="min-height-[40vw] flex flex-col-reverse lg:grid lg:grid-cols-2 gap-8">
          <img src={trend} className="object-cover w-full h-full rounded-3xl" />
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              Unleash Your Financial Potential with Us
            </h2>
            <p className="text-lg mb-6">
              We deliver our Commitment to our investors and actualise our plans
              of transforming their financial status by achieving their Crypto
              profit on the agreed time.We analyze the market, keep a close eye
              on the world economy, and provide detailed Signals with Precise
              Entry Prices, Stop Loss and Take Profit. Have your interested
              investment plan that you would wish to get started with.
            </p>
            <p className="text-lg">
              Deposit your investment amount using your preferred payment wallet
              before our trading session shift begins.After 5hrs of the agreed
              time through our spectacular strategies and experience, we shall
              be having back your Crypto profit through your Preferred payment
              wallet you used while depositing your investment Deposit amount
              after 10% will be deducted as our commission. Thank you.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
