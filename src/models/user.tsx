export interface User {
  id?: string;
  favorite?: boolean;
  image: string;
  firstName: string;
  lastName: string;
  email: string;
  email2?: string;
  phoneNumber: string;
  mobile?: string;
  address?: string;
  address2?: string;
  status?: string;
  action?: string;
  role?: string;
}

export function createUser(
  id: string,
  favorite: boolean,
  image: string,
  firstName: string,
  lastName: string,
  email: string,
  phoneNumber: string,
  status: string,
  action: string,
  role?: string
): User {
  return {
    id,
    email,
    firstName,
    lastName,
    phoneNumber,
    status,
    action,
    favorite,
    image,
    role,
  };
}

export const rows = [
  // createUser(
  //   1,
  //   true,
  //   "image1.png",
  //   "Ricardo",
  //   "Jones",
  //   "ricardo.jones@example.com",
  //   "+49 123 456 789",
  //   "Pending",
  //   "view",
  //   "admin"
  // ),
  // createUser(
  //   2,
  //   false,
  //   "image2.png",
  //   "Sophia",
  //   "Smith",
  //   "sophia.smith@example.com",
  //   "+49 987 654 321",
  //   "Active",
  //   "edit"
  // ),
  // createUser(
  //   3,
  //   true,
  //   "image3.png",
  //   "Liam",
  //   "Brown",
  //   "liam.brown@example.com",
  //   "+49 456 789 123",
  //   "Locked",
  //   "view"
  // ),
  // createUser(
  //   4,
  //   false,
  //   "image4.png",
  //   "Olivia",
  //   "Garcia",
  //   "olivia.garcia@example.com",
  //   "+49 654 321 987",
  //   "Active",
  //   "delete"
  // ),
  // createUser(
  //   5,
  //   true,
  //   "image5.png",
  //   "Mason",
  //   "Martinez",
  //   ".martinez@example.com",
  //   "+49 321 654 987",
  //   "Active",
  //   "view"
  // ),
  // createUser(
  //   6,
  //   false,
  //   "image6.png",
  //   "Emma",
  //   "Davis",
  //   "emma.davis@example.com",
  //   "+49 789 123 456",
  //   "Inactive",
  //   "edit"
  // ),
  // createUser(
  //   7,
  //   false,
  //   "image6.png",
  //   "Emma",
  //   "Davis",
  //   "emma.davis@example.com",
  //   "+49 789 123 456",
  //   "Inactive",
  //   "edit"
  // ),
  // createUser(
  //   8,
  //   false,
  //   "image6.png",
  //   "Emma",
  //   "Davis",
  //   "emma.davis@example.com",
  //   "+49 789 123 456",
  //   "Inactive",
  //   "edit"
  // ),
  // createUser(
  //   9,
  //   false,
  //   "image6.png",
  //   "Emma",
  //   "Davis",
  //   "emma.davis@example.com",
  //   "+49 789 123 456",
  //   "Inactive",
  //   "edit"
  // ),
  // createUser(
  //   10,
  //   false,
  //   "image6.png",
  //   "Emma",
  //   "Davis",
  //   "emma.davis@example.com",
  //   "+49 789 123 456",
  //   "Inactive",
  //   "edit"
  // ),
  // createUser(
  //   11,
  //   false,
  //   "image6.png",
  //   "Emma",
  //   "Davis",
  //   "emma.davis@example.com",
  //   "+49 789 123 456",
  //   "Inactive",
  //   "edit"
  // ),
  // createUser(
  //   12,
  //   false,
  //   "image6.png",
  //   "Emma",
  //   "Davis",
  //   "emma.davis@example.com",
  //   "+49 789 123 456",
  //   "Inactive",
  //   "edit"
  // ),
  // createUser(
  //   13,
  //   false,
  //   "image6.png",
  //   "Emma",
  //   "Davis",
  //   "emma.davis@example.com",
  //   "+49 789 123 456",
  //   "Inactive",
  //   "edit"
  // ),
];

export interface HeadCell {
  disablePadding: boolean;
  id: keyof User;
  label: string;
  numeric: boolean;
  align?: "left" | "center" | "right" | "inherit" | "justify";
}

export const headCells: HeadCell[] = [
  {
    id: "id",
    numeric: true,
    disablePadding: true,
    label: "ID",
  },

  {
    id: "firstName",
    numeric: true,
    disablePadding: true,
    label: "First Name",
  },
  {
    id: "lastName",
    numeric: true,
    disablePadding: true,
    label: "Last Name",
  },
  {
    id: "email",
    numeric: true,
    disablePadding: true,
    label: "Email",
    align: "center",
  },
  {
    id: "phoneNumber",
    numeric: true,
    disablePadding: true,
    label: "Phone",
  },
  {
    id: "status",
    numeric: true,
    disablePadding: true,
    label: "Status",
    align: "center",
  },
  {
    id: "action",
    numeric: true,
    disablePadding: true,
    label: "Action",
  },
];
