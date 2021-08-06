import './App.css';
import { Item } from './interfaces/item';
import BubbleSort from './components/bubbleSort';

const unsortedArray :Item[] = Array.from({ length: 30 }, () => ({ value: Math.floor(Math.random() * 300) + 10, status: "unsorted" }));

function App() {

  return (
    <div className="App container-fluid">
      <BubbleSort items={unsortedArray} />
    </div>
  );
}

export default App;
