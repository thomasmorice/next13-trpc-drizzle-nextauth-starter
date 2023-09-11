import { serverClient } from "../_trpc/server-client";
import Header from "../components/layout/header";
import UserInfoCard from "../components/who-am-i-card";

export default async function WhoAmI() {
  let ping = await serverClient.whoAmI.getPing();

  return (
    <>
      <Header> Who am I </Header>
      <div className="p-3">
        <UserInfoCard pingInfo={ping} />
      </div>
    </>
  );
}
