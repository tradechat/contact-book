import { Breadcrumbs, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";

interface PathProps {
  name?: string;
}

const Paths = ({ name }: PathProps) => {
  const router = useRouter();
  const { asPath, query } = router;
  const isIdentifier = (segment: string) => {
    return (
      segment.length > 20 ||
      /^[a-fA-F0-9-]{8,36}$/.test(segment) ||
      /^[0-9]+$/.test(segment)
    );
  };

  console.log(asPath);

  const pathArray = asPath
    .split("?")[0]
    .split("/")
    .filter((segment) => segment && !isIdentifier(segment));

  const generatePathLabel = (segment: string) => {
    if (segment === "contacts" && query.action === "export") {
      return "Contactes / Export via email";
    }

    if (segment === "view") {
      return name;
    }

    if (asPath.startsWith("/company") && segment == "edite") {
      return "Edite";
    }

    if (segment === "edite") {
      return name;
    }

    if (segment === "user") {
      if (query.mode === "add") {
        return "Invite new user";
      }
      return name;
    }
    return segment.charAt(0).toUpperCase() + segment.slice(1);
  };

  return (
    <Breadcrumbs
      sx={{ pb: "20px", mb: "30px", borderBottom: "solid 1px #D9D9D9" }}
      aria-label="breadcrumb"
    >
      {pathArray.length !== 0 ? (
        <Link
          style={{ color: "#000000", fontSize: "24px", textDecoration: "none" }}
          href="/"
        >
          Home
        </Link>
      ) : (
        <Typography sx={{ color: "#000000", fontSize: "24px" }}>
          Statistical Dashboard
        </Typography>
      )}

      {pathArray.map((segment, index) => {
        const href = "/" + pathArray.slice(0, index + 1).join("/");
        const isLast = index === pathArray.length - 1;
        return isLast ? (
          <Typography key={href} sx={{ color: "#000000", fontSize: "24px" }}>
            {generatePathLabel(segment)}
          </Typography>
        ) : (
          <Link
            style={{
              color: "#000000",
              fontSize: "24px",
              textDecoration: "none",
            }}
            key={href}
            href={href}
          >
            {generatePathLabel(segment)}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default Paths;
