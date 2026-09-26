import { mountSharedBottomUi } from "./shared-bottom-ui.js?v=20260919-425&closing=20260922-530&contact=20260926-546&privacy=20260926-552&footer=20260927-586";
import { bindSharedFixedShell } from "./shared-fixed-shell.js?v=20260926-546";
import { mountSharedConceptMenu, bindSharedConceptMenu } from "./shared-concept-menu.js?v=20260926-551";
import { sharedRouteRegistry } from "./shared-site-data.js?v=20260913-251";

const path = sharedRouteRegistry.access.path;
mountSharedConceptMenu(document.getElementById("shared-concept-menu-root"), path);
bindSharedFixedShell(mountSharedBottomUi(document.getElementById("shared-bottom-ui-root"), path));
bindSharedConceptMenu(document);
