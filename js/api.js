const getAdList = (onSuccess) => {
  fetch('https://25.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      onSuccess(data);
    });
};


export {getAdList};
