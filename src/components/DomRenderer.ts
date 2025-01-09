import IStateManager from "../interfaces/IStateManager";
import displaySidebar from "../ui/DisplaySidebar"
import displayMain from "../ui/displayMain";
import hideSidebar from "../utils/hideSidebar";
import { overlay } from "../ui/htmlElements";

const DomRenderer = (stateManager: IStateManager) => {
  overlay.addEventListener('click', () => hideSidebar())

  displayMain(stateManager)
  displaySidebar(stateManager)
}

export default DomRenderer
