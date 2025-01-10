import './styles/style.sass'
import DomRenderer from "./components/DomRenderer"
import StateManager from './components/StateManager';
import IStateManager from './interfaces/IStateManager';
import InteractionHandler from "./components/InteractionHandler"
import Todo from './components/Todo';
import Project from './components/Project';
import TagsList from './components/TagsList';

const stateManager: IStateManager = StateManager()
const interactionHandler = InteractionHandler(stateManager)

const testTodo = Todo('title', 'desc', new Date(), 'high', Project('test'), TagsList)
const id = testTodo.getId()

localStorage.setItem(id, JSON.stringify(testTodo.getTodo()))
console.log(JSON.parse(localStorage.getItem(id) || ''))

DomRenderer(stateManager)

export { interactionHandler }
