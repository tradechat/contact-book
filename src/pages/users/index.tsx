import UsersTable from "@/components/usersTabel";
import { headCells, rows } from "@/models/user";
import * as React from "react";

export default function Users() {
  return <UsersTable rows={rows} headCells={headCells}></UsersTable>;
}
