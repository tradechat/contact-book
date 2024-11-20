export interface Contact {
  id: number;
  favorite?: boolean;
  image: string;
  firstName: string;
  lastName: string;
  email: string;
  email2?: string;
  phone: string;
  mobile?: string;
  address?: string;
  address2?: string;
  status?: string;
  action?: string;
}

export function createContact(
  id: number,
  favorite: boolean,
  image: string,
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  status: string,
  action: string
): Contact {
  return {
    id,
    email,
    firstName,
    lastName,
    phone,
    status,
    action,
    favorite,
    image,
  };
}

export const rows = [
  createContact(
    1,
    true,
    "image1.png",
    "Ricardo",
    "Jones",
    "ricardo.jones@example.com",
    "+49 123 456 789",
    "Active",
    "view"
  ),
  createContact(
    2,
    false,
    "image2.png",
    "Sophia",
    "Smith",
    "sophia.smith@example.com",
    "+49 987 654 321",
    "Inactive",
    "edit"
  ),
  createContact(
    3,
    true,
    "image3.png",
    "Liam",
    "Brown",
    "liam.brown@example.com",
    "+49 456 789 123",
    "Active",
    "view"
  ),
  createContact(
    4,
    false,
    "image4.png",
    "Olivia",
    "Garcia",
    "olivia.garcia@example.com",
    "+49 654 321 987",
    "Active",
    "delete"
  ),
  createContact(
    5,
    true,
    "image5.png",
    "Mason",
    "Martinez",
    "martinez@example.com",
    "+49 321 654 987",
    "Active",
    "view"
  ),
  createContact(
    6,
    false,
    "image6.png",
    "Emma",
    "Davis",
    "emma.davis@example.com",
    "+49 789 123 456",
    "Inactive",
    "edit"
  ),
  createContact(
    7,
    false,
    "image6.png",
    "Emma",
    "Davis",
    "emma.davis@example.com",
    "+49 789 123 456",
    "Inactive",
    "edit"
  ),
  createContact(
    8,
    false,
    "image6.png",
    "Emma",
    "Davis",
    "emma.davis@example.com",
    "+49 789 123 456",
    "Inactive",
    "edit"
  ),
  createContact(
    9,
    false,
    "image6.png",
    "Emma",
    "Davis",
    "emma.davis@example.com",
    "+49 789 123 456",
    "Inactive",
    "edit"
  ),
  createContact(
    10,
    false,
    "image6.png",
    "Emma",
    "Davis",
    "emma.davis@example.com",
    "+49 789 123 456",
    "Inactive",
    "edit"
  ),
  createContact(
    11,
    false,
    "image6.png",
    "Emma",
    "Davis",
    "emma.davis@example.com",
    "+49 789 123 456",
    "Inactive",
    "edit"
  ),
  createContact(
    12,
    false,
    "image6.png",
    "Emma",
    "Davis",
    "emma.davis@example.com",
    "+49 789 123 456",
    "Inactive",
    "edit"
  ),
  createContact(
    13,
    false,
    "image6.png",
    "Emma",
    "Davis",
    "emma.davis@example.com",
    "+49 789 123 456",
    "Inactive",
    "edit"
  ),
];

export interface HeadCell {
  disablePadding: boolean;
  id: keyof Contact;
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
    id: "favorite",
    numeric: false,
    disablePadding: true,
    label: "Favorite",
    align: "center",
  },
  {
    id: "image",
    numeric: true,
    disablePadding: true,
    label: "Image",
    align: "center",
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
    id: "phone",
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
