import './styles/style.sass'
import DomRenderer from "./components/DomRenderer"
import StateManager from './components/StateManager';
import IStateManager from './interfaces/IStateManager';

const stateManager: IStateManager = StateManager()
DomRenderer(stateManager);
