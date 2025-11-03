/*

import { getDevlogById } from "@/app/api/devlogs/hooks";
import { notFound } from "next/navigation";
import AdminDevlogDetails from "./AdminDevlogDetails";

interface Props {
  params: Promise<{ id: string }>;
}

const DevlogEditPage = async (props: Props) => {
  const params = await props.params;
  const devlogId = params.id;
  if (!devlogId) {
    return notFound();
  }

  const devlog = await getDevlogById(devlogId);
  if (!devlog) {
    return notFound();
  }

  return <AdminDevlogDetails devlog={devlog} />;
};

export const dynamic = "force-dynamic";

export default DevlogEditPage;
*/

// keep file valid
//export const placeholder = true;
