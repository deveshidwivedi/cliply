import Image from "next/image";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div >
      <h2 className="bg-blue-700"> Good Morninining</h2>
      <Button className="bg-red-500">Hello</Button>
      <UserButton />
    </div>
  );
}
