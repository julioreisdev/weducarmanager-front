import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

export interface ISidebarItems {
  id: string;
  name: string;
  route: string;
  icon: OverridableComponent<SvgIconTypeMap<"", "svg">> & {
    muiName: string;
  };
}
