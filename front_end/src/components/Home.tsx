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
          <Link className="mx-auto" to="/register">
            <Button className="bg-primary text-white rounded-full py-2 px-6 text-lg font-semibold hover:bg-foreground transition duration-300">
              Get Started
            </Button>
          </Link>
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
              At ForexLy, we don't just trade Forex; we're passionate about
              helping you unlock your financial potential. Join our community of
              seasoned experts and traders, and embark on a journey towards
              financial growth like never before.
            </p>
            <p className="text-lg">
              What sets us apart is our commitment to your success. Our team of
              experts has years of experience navigating the intricate world of
              Forex trading. We provide you with the knowledge, tools, and
              support needed to make informed trading decisions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
