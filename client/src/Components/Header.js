import PropTypes from "prop-types";
import {
  AppBar,
  Toolbar,
  Grid,
  InputBase,
  makeStyles,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background,
  },
  searchInput: {
    opacity: "0.6",
    padding: `0px ${theme.spacing(1)}px`,
    fontSize: "0.8rem",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
    },
    "& .MuiSvgIcon-root": {
      marginRight: theme.spacing(1),
    },
  },
}));

export default function Header({ setSearch }) {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar>
        <Grid container alignItems="center">
          <Grid item>
            <InputBase
              placeholder="Search movies"
              className={classes.searchInput}
              startAdornment={<SearchIcon fontSize="small" />}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = { setSearch: PropTypes.func };
