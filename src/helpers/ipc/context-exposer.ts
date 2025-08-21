import { exposeThemeContext } from "./theme/theme-context";
import { exposeWindowContext } from "./window/window-context";
import { exposeUserContext } from "./user/user-context";

export default function exposeContexts() {
  exposeWindowContext();
  exposeThemeContext();
  exposeUserContext();
}
