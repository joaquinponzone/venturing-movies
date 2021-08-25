import { Grid } from "@material-ui/core";
import { useState } from "react";
import { makeStyles } from "@material-ui/core";
import Controls from "../../../Components/controls/Controls";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "80%",
      margin: theme.spacing(1),
    },
  },
}));

export default function EditMovieModal({ openModal, setOpenModal }) {
  const classes = useStyles();
  const [movieToDisplay] = useState(openModal.item);

  const handleClose = (event) => {
    event.preventDefault();
    setOpenModal({ ...openModal, view: false, item: null });
  };

  return (
    <form className={classes.root} autoComplete="off">
      <Grid container direction="column" alignItems="center">
        <Grid item>
          <Controls.Input
            name="title"
            required
            label="Title"
            defaultValue={movieToDisplay.title}
            InputProps={{
              readOnly: true,
            }}
          />
          <Controls.Input
            multiline
            maxRows={8}
            name="description"
            label="Description"
            defaultValue={movieToDisplay.description}
            InputProps={{
              readOnly: true,
            }}
          />
          <Controls.Input
            name="year"
            type="number"
            label="Year"
            defaultValue={movieToDisplay.year}
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
        <Grid item>
          <Controls.Button
            text="Go Back"
            variant="outlined"
            onClick={handleClose}
          />
        </Grid>
      </Grid>
    </form>
  );
}
