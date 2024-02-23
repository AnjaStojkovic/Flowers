import { FormControlLabel, Switch } from "@mui/material";
import { useState } from "react";

const MySwitch = () => {
  const [checked, setChecked] = useState(false);

  const handleChange = (event: any) => {
    setChecked(event.target.checked);
  };

  return (
    <FormControlLabel
      label="Turn notifications"
      className="settings__first__notifications--text"
      control={<Switch checked={checked} onChange={handleChange} />}
    />
  );
};

export default MySwitch;
