const FETCH_ADDRESS = 'https://25.javascript.pages.academy/keksobooking/data';
const SEND_ADDRESS = 'https://25.javascript.pages.academy/keksobooking';

const fetchData = () => fetch(FETCH_ADDRESS)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }

    throw new Error(`Код ответа ${response.status} - ${response.statusText}`);
  });

const sendData = (body) => fetch(SEND_ADDRESS,
  {
    method: 'POST',
    body,
  },
)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Код ответа ${response.status} - ${response.statusText}`);
    }
  });


export {fetchData, sendData};
