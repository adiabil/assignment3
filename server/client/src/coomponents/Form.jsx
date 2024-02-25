import { useContext, useEffect, useState } from "react";
import { SessionContext } from "../context/SessionContext";
import { createSession, updateSession } from "../api/crud";
import { Button, MenuItem, Select, TextField } from "@mui/material";

const Form = ({ title, session = null }) => {
  const { state, dispatch } = useContext(SessionContext);
  const [sessions, setSessions] = useState({
    crisis: "",
    clientName: "",
    counslerName: "",
    date: new Date(),
    sessionStatus: "in process",
  });

  const generateNewId = () => {
    return Math.floor(Math.random() * 10000);
  };

  const handleSubmit = async () => {
    if (
      !sessions.crisis ||
      !sessions.clientName ||
      !sessions.counslerName ||
      !sessions.date ||
      !sessions.sessionStatus
    ) {
      alert("Please fill in all the fields");
      return;
    }
    if (session) {
      const result = await updateSession({
        ...sessions,
        id: state?.selected?.id,
      });
      if (result.message) {
        alert(
          `error while updating session:\n\n${result.status} ${result.message}`
        );
        return;
      }
      dispatch({
        type: "UPDATE_SESSION",
        payload: result,
      });
    } else {
      let newId = generateNewId();
      while (state?.items.some((session) => session.id === newId)) {
        newId = generateNewId();
      }

      const result = await createSession({
        ...sessions,
        id: newId,
      });

      if (result.message) {
        alert(
          `error while creating session:\n\n${result.status} ${result.message}`
        );
        return;
      }
      dispatch({
        type: "ADD_SESSION",
        payload: result,
      });
    }
    setSessions({
      crisis: "",
      clientName: "",
      counslerName: "",
      date: new Date(),
      sessionStatus: "in process",
    });
    dispatch({ type: "MODAL", payload: false });
  };

  useEffect(() => {
    if (session) {
      setSessions(session);
    }
  }, [session]);

  return (
    <div>
      <h2>{title}</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <TextField
          autoComplete="off"
          size="small"
          type="text"
          label="Crisis"
          required
          placeholder="Crisis"
          value={sessions.crisis}
          onChange={(e) => setSessions({ ...sessions, crisis: e.target.value })}
        />
        <TextField
          autoComplete="off"
          size="small"
          type="text"
          label="Client Name"
          required
          placeholder="Client Name"
          value={sessions.clientName}
          onChange={(e) =>
            setSessions({ ...sessions, clientName: e.target.value })
          }
        />
        <TextField
          autoComplete="off"
          size="small"
          type="text"
          label="Counsler Name"
          required
          placeholder="Counsler Name"
          value={sessions.counslerName}
          onChange={(e) =>
            setSessions({ ...sessions, counslerName: e.target.value })
          }
        />
        <TextField
          autoComplete="off"
          size="small"
          label="Date"
          type="date"
          required
          value={new Date(sessions.date).toISOString().split("T")[0]}
          onChange={(e) => setSessions({ ...sessions, date: e.target.value })}
        />

        <Select
          size="small"
          sx={{ label: { color: "red" } }}
          required
          value={sessions.sessionStatus}
          onChange={(e) => {
            setSessions({ ...sessions, sessionStatus: e.target.value });
          }}>
          <MenuItem value="in process">In Process</MenuItem>
          <MenuItem value="done">Done</MenuItem>
        </Select>
        <Button
          variant="contained"
          disabled={
            !sessions.crisis ||
            !sessions.clientName ||
            !sessions.counslerName ||
            !sessions.date
          }
          onClick={handleSubmit}
          style={{ marginTop: "10px" }}>
          Submit
        </Button>
      </form>
    </div>
  );
};
export default Form;
