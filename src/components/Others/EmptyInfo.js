import React from "react";
import Typography from "@material-ui/core/Typography";

export const EmptyInfo = ({
  title = "No registros aún",
  variantMessage = "h2",
  align = "center",
}) => {
  return (
    <div>
      <Typography
        variant={variantMessage}
        align={align}
        style={{ marginTop: 30 }}
      >
        {title}
      </Typography>
    </div>
  );
};
