import { mountSharedBottomUi } from "./shared-bottom-ui.js?v=20260919-425&closing=20260922-505";
import { bindSharedFixedShell } from "./shared-fixed-shell.js?v=20260913-244";
import { mountSharedConceptMenu, bindSharedConceptMenu } from "./shared-concept-menu.js?v=20260919-423";
import { sharedRouteRegistry } from "./shared-site-data.js?v=20260913-251";

const menuHost = document.getElementById("shared-concept-menu-root");
const bottomHost = document.getElementById("shared-bottom-ui-root");
mountSharedConceptMenu(menuHost, sharedRouteRegistry.items.path);
bindSharedFixedShell(mountSharedBottomUi(bottomHost, sharedRouteRegistry.items.path));
bindSharedConceptMenu(document);
