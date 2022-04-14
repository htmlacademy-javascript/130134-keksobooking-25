const fetchData = () => fetch('https://25.javascript.pages.academy/keksobooking/data')
  .then((response) => {
    if (response.ok) {
      return response.json();
    }

    throw new Error(`Код ответа ${response.status} - ${response.statusText}`);
  });

const sendData = (body) => fetch('https://25.javascript.pages.academy/keksobooking',
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
