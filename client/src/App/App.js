import { Home } from "../Pages/Home/Home";
import Movies from "../Pages/Movies/Movies";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  appMain: {
    minWidth: 400,
    width: "100%",
  },
});

function App() {
  const classes = useStyles();

  return (
    <>
      <div className={classes.appMain}>
        <Movies />
      </div>
    </>
  );
}

export default App;
