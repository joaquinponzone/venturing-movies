//Import Dependencies
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Paper,
  makeStyles,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
  InputAdornment,
  Table,
  TableHead,
  Select,
  MenuItem,
  Typography,
  Grid,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import LocalMoviesTwoToneIcon from "@material-ui/icons/LocalMoviesTwoTone";

import { Search } from "@material-ui/icons";
import { Pagination } from "@material-ui/lab";

//Import Components
import AddMovieForm from "./components/AddMovieForm";
import UploadMoviesModal from "./components/UploadMoviesModal";
import EditMovieModal from "./components/EditMovieModal";
import DeleteMovieModal from "./components/DeleteMovieModal";
import PageHeader from "../../Components/PageHeader";
import Controls from "../../Components/controls/Controls";
import Notification from "../../Components/Notification";
import Popup from "../../Components/Popup";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
    width: "%80",
    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(3, 0),
    },
  },
  toolBar: {
    width: "100%",
    display: "flex",
    // flexDirection: "column",
  },
  searchInput: {
    marginRight: theme.spacing(3),
    marginTop: theme.spacing(0.5),
    [theme.breakpoints.down("sm")]: {
      marginRight: "0",
      marginBottom: theme.spacing(3),
    },
    minWidth: "155px",
    height: "3.2rem",
  },
  uploadButton: {
    marginRight: theme.spacing(3),
    [theme.breakpoints.down("sm")]: {
      marginRight: "0",
      marginBottom: theme.spacing(3),
    },
  },
  addButton: {
    marginRight: theme.spacing(3),
    [theme.breakpoints.down("sm")]: {
      marginRight: "0",
      marginBottom: theme.spacing(3),
    },
  },
  table: {
    marginTop: theme.spacing(3),
    "& thead th": {
      fontWeight: "600",
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.primary.light,
    },
    "& tbody td": {
      fontWeight: "300",
    },
    "& tbody tr:hover": {
      backgroundColor: theme.palette.selection.main,
      cursor: "pointer",
    },
  },
  paginationContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  pageSize: {
    margin: theme.spacing(2),
    "& .MuiOutlinedInput-root": {
      height: "2rem",
    },
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
}));

export default function Movies() {
  const classes = useStyles();

  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [movies, setMovies] = useState();
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState({
    upload: false,
    add: false,
    edit: false,
    delete: false,
    item: null,
  });

  useEffect(() => {
    const baseURL = `http://localhost:3001/movies?page=${page}&limit=${pageSize}${
      search && `&search=${search}`
    }`;
    axios.get(baseURL).then((response) => {
      setTotalPages(response.data.pages);
      setMovies(response.data.movies);
    });
  }, [page, search, openModal, pageSize]);

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  useEffect(() => {}, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangePageSize = (event) => {
    setPageSize(event.target.value);
    setPage(1);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const openActionModal = (item, action) => {
    setOpenModal({ ...openModal, item, [action]: true });
  };

  const headCells = [
    { id: "action", label: "Actions" },
    { id: "title", label: "Title" },
    { id: "description", label: "Description" },
    { id: "year", label: "Release Year" },
  ];

  return (
    <>
      <PageHeader
        title="Movies DB"
        subTitle="Movies DataBase"
        icon={<LocalMoviesTwoToneIcon fontSize="large" />}
      />
      <Paper elevation={1} className={classes.pageContent}>
        <Grid
          container
          spacing={3}
          style={{ overflowY: "hidden" }}
          flexDirection="row"
        >
          <Grid item sm={12}>
            <Toolbar className={classes.toolBar}>
              <Grid container justifyContent="center" alignContent="center">
                <Grid item xs={12} md={3} className={classes.searchInput}>
                  <Controls.Input
                    label="Search Movies"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Search />
                        </InputAdornment>
                      ),
                    }}
                    onChange={handleSearch}
                  />
                </Grid>
                <Grid item xs={12} md={3} className={classes.uploadButton}>
                  <Controls.Button
                    text="Upload .csv"
                    variant="outlined"
                    startIcon={<AddIcon />}
                    onClick={() => setOpenModal({ ...openModal, upload: true })}
                  />
                </Grid>
                <Grid item xs={12} md={3} className={classes.addButton}>
                  <Controls.Button
                    text="Add Movie"
                    variant="outlined"
                    startIcon={<AddIcon />}
                    onClick={() => setOpenModal({ ...openModal, add: true })}
                  />
                </Grid>
              </Grid>
            </Toolbar>
          </Grid>
          <Grid item sm={12}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  {headCells.map((headCell) => (
                    <TableCell key={headCell.id}>{headCell.label}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {movies?.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Controls.ActionButton
                        color="primary"
                        onClick={() => {
                          openActionModal(item, "edit");
                        }}
                      >
                        <EditOutlinedIcon fontSize="small" />
                      </Controls.ActionButton>
                      <Controls.ActionButton
                        color="secondary"
                        onClick={() => {
                          openActionModal(item, "delete");
                        }}
                      >
                        <CloseIcon fontSize="small" />
                      </Controls.ActionButton>
                    </TableCell>
                    <TableCell>{item.title}</TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell>{item.year}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Grid>
          <Grid item sm={12}>
            <div className={classes.paginationContainer}>
              <Pagination
                count={totalPages}
                page={page}
                variant="outlined"
                shape="rounded"
                size="large"
                showFirstButton
                showLastButton
                onChange={handleChangePage}
              />
              <div className={classes.pageSize}>
                <Typography
                  variant="subtitle1"
                  style={{ fontWeight: "300", margin: "1rem" }}
                >
                  Page Size:{" "}
                </Typography>
                <Select
                  value={pageSize}
                  onChange={handleChangePageSize}
                  variant="outlined"
                >
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={30}>30</MenuItem>
                </Select>
              </div>
            </div>
          </Grid>
        </Grid>
      </Paper>

      {/* PopUps */}
      <Popup
        title="Upload Movies"
        open={openModal.upload}
        setOpen={setOpenModal}
      >
        <UploadMoviesModal setOpenModal={setOpenModal} setNotify={setNotify} />
      </Popup>
      <Popup title="Add Movie" open={openModal.add} setOpen={setOpenModal}>
        <AddMovieForm setOpenModal={setOpenModal} setNotify={setNotify} />
      </Popup>
      <Popup title="Edit Movie" open={openModal.edit} setOpen={setOpenModal}>
        <EditMovieModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          setNotify={setNotify}
        />
      </Popup>
      <Popup
        title="Delete Movie"
        open={openModal.delete}
        setOpen={setOpenModal}
      >
        <DeleteMovieModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          setNotify={setNotify}
        />
      </Popup>
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
}
