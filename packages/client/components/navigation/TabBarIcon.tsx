import { type IconProps } from "@expo/vector-icons/build/createIconSet";
import { type ComponentProps } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

const TabBarIcon = ({
  style,
  ...rest
}: IconProps<ComponentProps<typeof Ionicons>["name"]>) => {
  return <Ionicons size={28} style={[{ marginBottom: -3 }, style]} {...rest} />;
};

export default TabBarIcon;
