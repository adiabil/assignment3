import { useContext } from "react";
import { getAllSessions } from "./api/crud";
import { SessionContext } from "./context/SessionContext";
import Form from "./coomponents/Form";
import Modal from "./coomponents/Modal";
import DataTable from "./coomponents/DataTable";
import { Box, Button, CssBaseline } from "@mui/material";

function App() {
  const { state, dispatch } = useContext(SessionContext);
  const { items } = state;

  const handleClick = async () => {
    const data = await getAllSessions();
    dispatch({ type: "SET_SESSIONS", payload: data });
  };

  return (
    <Box className="App">
      <CssBaseline />
      <header>
        <h1>Session Manager - MERN Stack</h1>
        <Button onClick={handleClick} variant="contained" sx={{ textTransform: "none"}}>Get all sessions</Button>
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
