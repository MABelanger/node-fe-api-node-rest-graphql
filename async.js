function getItems() {
  return new Promise((resolve, reject) => {
    setTimeout(()=>{
      resolve([1, 2, 3]);
    }, 1000);
  });
}

const processRequest = async () => {
  const item1 = await getItems();
  const item2 = await getItems();
  return [item1, item2];
}

processRequest()
  .then((items)=>{
    console.log(items)
  })
