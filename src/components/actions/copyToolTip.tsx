import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";

interface CustomTooltipProps extends TooltipProps {
  email?: string;
}

export const LightTooltip = styled(
  ({ className, email, ...props }: CustomTooltipProps) => (
    <Tooltip
      {...props}
      onClick={() => {
        navigator.clipboard.writeText(email!);
      }}
      classes={{ popper: className }}
    />
  )
)(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#ffffff00",
    color: "#000",
    fontSize: 16,
    height: "4px",
    fontWeight: "400",
  },
}));
