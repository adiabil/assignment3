const URL = "http://localhost:8080/counselingSession";

export const getAllSessions = async () => {
  try {
    const res = await fetch(URL);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createSession = async (session) => {
  try {
    const res = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(session),
    });
    const data = await res.json();
    if (res.status === 201 || res.status === 200) {
      return data;
    }
    return { message: data.message, status: res.status };
  } catch (error) {
    console.log(error);
    alert(`error while creating session:\n\n${res.status} ${data.message}`);
  }
};

export const deleteSession = async ({ id }) => {
  try {
    const res = await fetch(`${URL}/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (res.status === 201 || res.status === 200) {
      return data.message;
    }
    return { message: data.message, status: res.status };
  } catch (error) {
    console.log(error);
    alert(`error while deleting session:\n\n${res.status} ${data.message}`);
  }
};

export const updateSession = async ({ id, ...session }) => {
  try {
    const res = await fetch(`${URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(session),
    });
    const data = await res.json();
    if (res.status === 201 || res.status === 200) {
      return data;
    }
    return { message: data.message, status: res.status };
  } catch (error) {
    console.log(error);
    alert(`error while updating session:\n\n${res.status} ${data.message}`);
  }
}