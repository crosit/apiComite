const today = new Date();
const year = today.getFullYear();
let month = today.getMonth() + 1;
let day = today.getDate();

// Añadir ceros iniciales si el mes o el día tienen un solo dígito
if (month < 10) {
  month = '0' + month;
}
if (day < 10) {
  day = '0' + day;
}

const formattedDate = year + '-' + month + '-' + day;

function getToday() {
  return formattedDate;
}
module.exports = getToday