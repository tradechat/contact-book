import ContactsTable from "@/components/contactsTable";
import * as React from "react";
import { headCells, rows } from "@/models/contact";

export default function Contacts() {
  return <ContactsTable rows={rows} headCells={headCells}></ContactsTable>;
}
