import React, { createContext, useState } from "react";
import {
  greenThemeLight,
  greenThemeDark,
  blueThemeLight,
  blueThemeDark,
  redThemeLight,
  redThemeDark,
  orangeThemeLight,
  orangeThemeDark,
  purpleThemeLight,
  purpleThemeDark,
  pinkThemeLight,
  pinkThemeDark,
  yellowThemeLight,
  yellowThemeDark,
  bwThemeLight,
  bwThemeDark,
} from "../theme/theme";

export const ThemeContext = createContext();

// Danh sách tất cả theme
export const themeList = [
  { name: "Blue Dark", theme: blueThemeDark },
  { name: "Blue Light", theme: blueThemeLight },
  { name: "Green Dark", theme: greenThemeDark },
  { name: "Green Light", theme: greenThemeLight },
  { name: "Red Dark", theme: redThemeDark },
  { name: "Red Light", theme: redThemeLight },
  { name: "Orange Dark", theme: orangeThemeDark },
  { name: "Orange Light", theme: orangeThemeLight },
  { name: "Purple Dark", theme: purpleThemeDark },
  { name: "Purple Light", theme: purpleThemeLight },
  { name: "Pink Dark", theme: pinkThemeDark },
  { name: "Pink Light", theme: pinkThemeLight },
  { name: "Yellow Dark", theme: yellowThemeDark },
  { name: "Yellow Light", theme: yellowThemeLight },
  { name: "BW Dark", theme: bwThemeDark },
  { name: "BW Light", theme: bwThemeLight },
];

function ThemeContextProvider(props) {
  const [theme, setTheme] = useState(blueThemeDark);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const setHandleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  // Hàm đổi theme — truyền xuống các component con
  const changeTheme = (selectedTheme) => {
    setTheme(selectedTheme);
  };

  const value = { theme, drawerOpen, setHandleDrawer, changeTheme, themeList };
  return (
    <ThemeContext.Provider value={value}>
      {props.children}
    </ThemeContext.Provider>
  );
}

export default ThemeContextProvider;
