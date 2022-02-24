import Navigation from './navigation'
import history from './utils/history';
import { Router } from 'react-router-dom';

function App() {
  return (
    
      <Router history={history}>
        <Navigation />
      </Router>
  );
}

export default App;