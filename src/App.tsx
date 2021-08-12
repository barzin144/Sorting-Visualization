import './App.css';
import { Item } from './interfaces/item';
import BubbleSort from './components/bubbleSort';
import { Container } from '@material-ui/core';

const unsortedArray :Item[] = Array.from({ length: 30 }, () => ({ value: Math.floor(Math.random() * 300) + 10, status: "unsorted" }));

function App() {

  return (
    <Container className="App">
      <BubbleSort items={unsortedArray} />
    </Container>
  );
}

export default App;
