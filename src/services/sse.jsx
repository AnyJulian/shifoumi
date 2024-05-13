import React, { useEffect, useState } from 'react';

const SubscribeMatchInfo = () => {
  const [data, setData] = useState(null);
  const storedIdMatch = localStorage.getItem('idMatch');
  const storedToken = localStorage.getItem('token');

  console.log(storedIdMatch, storedToken)

  useEffect(() => {
    const sse = new EventSource(`http://fauques.freeboxos.fr:3000/matches/${storedIdMatch}/subscribe`, {
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${storedToken}`
      }
    });

    sse.onmessage = (event) => {
      const newData = getRealtimeData(JSON.parse(event.data));
      console.log(newData)
      setData(newData);
    };

    return () => {
      sse.close();
    };
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
