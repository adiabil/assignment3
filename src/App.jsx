import { useContext, useState } from "react";
import { getAllSessions, getSessionById } from "./api/crud";
import { SessionContext } from "./context/SessionContext";
import Form from "./coomponents/Form";
import Modal from "./coomponents/Modal";
import DataTable from "./coomponents/DataTable";
import { Box, Button, CssBaseline, TextField } from "@mui/material";

function App() {
  const { state, dispatch } = useContext(SessionContext);
  const [searchId, setSearchId] = useState("");
  const { items } = state;
  // const [ search, setSearch]  = useState("");
  // const handleSearch = async ()
  const handleClick = async () => {
    const data = await getAllSessions();
    dispatch({ type: "SET_SESSIONS", payload: data });
  };

  const fetchById = async () => {
    const data = await getSessionById({
      id: searchId,
    });
    console.log(data);
    dispatch({ type: "SET_SESSIONS", payload: [data] });
  };

  // const handleClick2 = async () => {
  //   const data = await getSessionById();
  //   dispatch({ type: "SET_SESSIONS", payload: data });
  // };

  return (
    <Box className="App">
      <CssBaseline />
      <header>
        <h1>Session Manager</h1>
        {/* <Button onClick={handleClick} variant="contained" sx={{ textTransform: "none"}}>Search</Button> */}
        <Button
          onClick={handleClick}
          variant="contained"
          sx={{ textTransform: "none" }}>
          Get all sessions
        </Button>
        <div className="search_stack">
          <TextField
            size="small"
            label="Search by id"
            variant="outlined"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
          <Button
            onClick={fetchById}
            variant="contained"
            sx={{ textTransform: "none" }}>
            Get sessions by id
          </Button>
        </div>
      </header>
      <div className="cards_container">
        {items.length > 0 ? (
          <DataTable />
        ) : (
          <div className="no_sessions">No sessions found</div>
        )}
      </div>
      <Form title="Add new session" />
      <Modal />
    </Box>
  );
}

export default App;
