import './App.css';
import { Item } from './interfaces/item';
import BubbleSort from './components/bubbleSort';
import { Container } from '@material-ui/core';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';

const unsortedArray: Item[] = Array.from({ length: 30 }, () => ({ value: Math.floor(Math.random() * 300) + 10, status: "unsorted" }));

const theme = createTheme({
  typography: {
    button: {
      textTransform: 'none'
    }
  }
});

function App() {

  return (
    <ThemeProvider theme={theme}>
      <Container className="App">
        <BubbleSort items={unsortedArray} />
      </Container>
    </ThemeProvider>
  );
}

export default App;
