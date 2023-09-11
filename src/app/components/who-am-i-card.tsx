"use client";
import { inferProcedureOutput } from "@trpc/server";
import { trpc } from "../_trpc/client";
import { Card, CardHeader, CardContent, CardTitle } from "./ui/card";
import { Refresh, User } from "@icon-park/react";
import { AppRouter } from "@/server";

type WhoAmICardProps = {
  pingInfo: inferProcedureOutput<AppRouter["whoAmI"]["getPing"]>;
};

export default function WhoAmICard({ pingInfo }: WhoAmICardProps) {
  const {
    data: pingInfoUpdated,
    refetch,
    isFetching,
  } = trpc.whoAmI.getPing.useQuery(undefined, {
    refetchOnWindowFocus: false,
    enabled: false, // disable this query from automatically running
  });

  const getPingInfo = () => {
    return pingInfoUpdated ? pingInfoUpdated : pingInfo;
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">User info</CardTitle>
        <div className="flex flex-row gap-x-1 items-center">
          <User theme="filled" size={22} />
          <Refresh
            className={`cursor-pointer ${isFetching && "animate-spin"}`}
            onClick={() => refetch()}
            theme="filled"
            size={14}
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {isFetching ? "Refreshing" : getPingInfo().name}
        </div>
        <p className="text-xs text-muted-foreground">{getPingInfo().ping}</p>
      </CardContent>
    </Card>
  );
}
