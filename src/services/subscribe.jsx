import React, { useEffect, useState } from 'react';

const SubscribeMatche = () => {
  const [data, setData] = useState(null);
  const eventSource = new EventSource(`http://fauques.freeboxos.fr:3000/matches/${storedidMatch}/subscribe`);
  const storedToken = localStorage.getItem('token');
  const storedidMatch = localStorage.getItem('idMatch');

  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${storedToken}`);
    myHeaders.append("Content-Type", "text/event-stream");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    fetch(`http://fauques.freeboxos.fr:3000/matches/${storedidMatch}/subscribe`, requestOptions)
      .then(response => response.text())
      .then(result => setData(result))
      .catch(error => console.log('error', error));
  }, []);

  return (
    <div>
      {data ? data : 'Chargement...'}
    </div>
  );
};

export default SubscribeMatche;

//non utilisé