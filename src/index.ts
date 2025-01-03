import './styles/style.sass'
import DomRenderer from "./components/DomRenderer"
import StateManager from './components/StateManager';
import IStateManager from './interfaces/IStateManager';
import InteractionHandler from "./components/InteractionHandler"

const stateManager: IStateManager = StateManager()
const interactionHandler = InteractionHandler(stateManager)

DomRenderer(stateManager);

export { interactionHandler }
