import Link from "next/link";
import Header from "./components/layout/header";

export default function Home() {
  return (
    <div>
      <Header> Home </Header>
      <div className="p-3">
        <Link href={"/who-am-i"}>Testing</Link>
      </div>
    </div>
  );
}
