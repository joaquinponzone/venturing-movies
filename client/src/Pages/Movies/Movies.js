import React, { useEffect, useState } from "react";
import axios from "axios";
import AddMovieForm from "./components/AddMovieForm";
import UploadMoviesModal from "./components/UploadMoviesModal";
import EditMovieModal from "./components/EditMovieModal";
import DeleteMovieModal from "./components/DeleteMovieModal";
import PageHeader from "../../Components/PageHeader";
import LocalMoviesIcon from "@material-ui/icons/LocalMovies";
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
} from "@material-ui/core";
import Controls from "../../Components/controls/Controls";
import { Search } from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add";
import Popup from "../../Components/Popup";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import CloseIcon from "@material-ui/icons/Close";
import Notification from "../../Components/Notification";
import * as moviesServices from "../../services/moviesServices";
import { Pagination } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  toolBar: {
    width: "100%",
  },
  searchInput: {
    minWidth: 300,
    width: "50%",
    display: "flex",
    marginRight: "4rem",
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
      backgroundColor: "#fffbf2",
      cursor: "pointer",
    },
  },
  pagination: {
    "& > *": {
      marginTop: theme.spacing(2),
    },
    display: "flex",
    justifyContent: "center",
  },
}));

const headCells = [
  { id: "title", label: "Title" },
  { id: "description", label: "Description" },
  { id: "year", label: "Release Year" },
  { id: "action", label: "Actions" },
];

export default function Movies() {
  const classes = useStyles();
  const [movies, setMovies] = useState();
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState({
    upload: false,
    add: false,
    edit: false,
    itemForEdit: null,
    delete: false,
    itemForDelete: null,
  });

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [confirmDialog, setConfirmDialog] = useState({
    item: null,
    title: "",
    subTitle: "",
  });

  const pageSize = [5, 10, 25];
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(pageSize[page]);

  useEffect(() => {
    const baseURL = `http://localhost:3001/movies?page=${page}&limit=${rowsPerPage}${
      search && `&search=${search}`
    }`;
    axios.get(baseURL).then((response) => {
      let moviesFetched = response.data;
      setMovies(moviesFetched);
    });
  }, [page, rowsPerPage, search, openModal]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(1);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const openEditModal = (item) => {
    setOpenModal({ ...openModal, edit: true, itemForEdit: item });
  };
  const openDeleteModal = (item) => {
    setOpenModal({ ...openModal, delete: true, itemForDelete: item });
  };

  return (
    <>
      <PageHeader
        title="Movies DB"
        subTitle="Movies DataBase"
        icon={<LocalMoviesIcon fontSize="large" />}
      />
      <Paper elevation={1} className={classes.pageContent}>
        <Toolbar className={classes.toolBar}>
          <Controls.Input
            label="Search Movies"
            className={classes.searchInput}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            onChange={handleSearch}
          />
          <Controls.Button
            text="Upload .csv"
            variant="outlined"
            startIcon={<AddIcon />}
            className={classes.uploadButton}
            onClick={() => setOpenModal({ ...openModal, upload: true })}
          />
          <Controls.Button
            text="Add Movie"
            variant="outlined"
            startIcon={<AddIcon />}
            className={classes.newButton}
            onClick={() => setOpenModal({ ...openModal, add: true })}
          />
        </Toolbar>
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
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>{item.year}</TableCell>
                <TableCell>
                  <Controls.ActionButton
                    color="primary"
                    onClick={() => {
                      openEditModal(item);
                    }}
                  >
                    <EditOutlinedIcon fontSize="small" />
                  </Controls.ActionButton>
                  <Controls.ActionButton
                    color="secondary"
                    onClick={() => {
                      openDeleteModal(item);
                    }}
                  >
                    <CloseIcon fontSize="small" />
                  </Controls.ActionButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className={classes.pagination}>
          <Pagination
            count={
              movies?.length > rowsPerPage ? movies.length / rowsPerPage : 1
            }
            page={page}
            variant="outlined"
            shape="rounded"
          />
        </div>
      </Paper>
      <Popup
        title="Upload Movies"
        open={openModal.upload}
        setOpenModal={setOpenModal}
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

      {/* <ConfirmDialog
        open={openModal.delete}
        openModal={openModal}
        setOpenModal={setOpenModal}
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
        setNotify={setNotify}
      /> */}
    </>
  );
}
