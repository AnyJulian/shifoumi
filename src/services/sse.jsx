import React, { useEffect, useState } from 'react';
import { fetchEventSource } from "@microsoft/fetch-event-source";

const SubscribeMatchInfo = () => {
  const [data, setData] = useState(null);
  const storedIdMatch = localStorage.getItem('idMatch');
  const storedToken = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      await fetchEventSource(`http://fauques.freeboxos.fr:3000/matches/${storedIdMatch}/subscribe`, {
        method: "GET",
        headers: {
          "Content-Type": "text/event-stream",
          'Authorization': `Bearer ${storedToken}`,
        },
        onopen(res) {
          if (res.ok && res.status === 200) {
            console.log("Connection made ", res);
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
          setData(parsedData);
        },
        onclose() {
          console.log("Connection closed by the server");
        },
        onerror(err) {
          console.log("There was an error from server", err);
        },
      });
    };
    fetchData();
  }, [storedIdMatch, storedToken]);

  return (
    <div>
      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default SubscribeMatchInfo;
