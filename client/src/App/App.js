import { Home } from "../Pages/Home/Home";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";

function App() {
  return (
    <>
      <Container maxWidth="lg" width="%100">
        <Box sx={{ my: 4, backgroundColor: "primary.main" }}>
          <Home />
        </Box>
      </Container>
    </>
  );
}

export default App;
