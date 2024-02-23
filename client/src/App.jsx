import { useState } from "react";
import ActionBtns from "./coomponents/ActionBtns";
import Card from "./coomponents/Card";

const URL = "http://localhost:8080/counselingSession";

function App() {
  const [sessions, setSessions] = useState([]);

  const getAllSessions = async () => {
    try {
      const res = await fetch(URL);
      const data = await res.json();
      setSessions(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>hi</h1>
      <button
        onClick={() => {
          getAllSessions();
        }}>
        Get all sessions
      </button>
      <div className="cards_container">
        {sessions.length > 0 ? (
          sessions.map((item) => (
            <Card
              key={item.id}
              crisis={item.crisis}
              clientName={item.clientName}
              counslerName={item.counslerName}
              date={item.date}
              sessionStatus={item.sessionStatus}
            />
          ))
        ) : (
          <div>No sessions found</div>
        )}
      </div>
      <ActionBtns />
    </div>
  );
}

export default App;
