import { fetchEventSource } from "@microsoft/fetch-event-source";

const subscribeToMatchInfo = async ({ storedIdMatch, storedToken, handleEvent }) => {
  await fetchEventSource(`http://fauques.freeboxos.fr:3000/matches/${storedIdMatch}/subscribe`, {
    method: "GET",
    headers: {
      "Content-Type": "text/event-stream",
      'Authorization': `Bearer ${storedToken}`,
    },
    onopen(res) {
      if (res.ok && res.status === 200) {
        console.log("Connection en temps réel - maintient du service ok");
      } else if (
        res.status >= 400 &&
        res.status < 500 &&
        res.status !== 429
      ) {
        console.log("Client side error ", res);
      }
    },
    onmessage(event) {
      const parsedData = JSON.parse(event.data);
      console.log("Received event:", parsedData);

      if (Array.isArray(parsedData)) {
        parsedData.forEach(item => {
          handleEvent(item);
        });
      } else {
        handleEvent(parsedData);
      }
    },
    onclose() {
      console.log("Connection closed by the server");
    },
    onerror(err) {
      console.log("There was an error from server", err);
    },
  });
};

export default subscribeToMatchInfo;
