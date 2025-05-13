import Image from "next/image";
import Logo from "@/public/assets/logo/logo-cup-hijau.png";
import BGHome from "@/public/assets/images/bg-home.webp";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative flex flex-col justify-center items-center h-full">
      <Image
        src={BGHome}
        alt="Landing Image"
        className="w-full absolute -z-10 opacity-75"
        priority
      />
      <Card className="w-80 md:w-96 py-10">
        <CardContent className="flex flex-col justify-center items-center gap-10">
          <Image src={Logo} width={100} height={100} alt="Kopikan Logo" />
          <div className="text-3xl font-semibold text-center">
            Good Morning Haikal!
          </div>
          <Button>
            <Link href={"/login"}>Login Disini</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
