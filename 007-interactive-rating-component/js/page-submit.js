const mensage = document.getElementById('mensage');
const selectedNumber = localStorage.getItem('number');

mensage.textContent = `You selected ${selectedNumber} of 5`;
 