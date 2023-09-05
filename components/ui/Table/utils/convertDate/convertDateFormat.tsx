function convertDateFormat(myDate) {
  const dateObject = new Date(myDate);
  const formattedDate = dateObject.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
    hour: undefined,
    minute: undefined,
  });
  if(formattedDate=="Invalid Date"){
    return myDate
  }
  return formattedDate
}
module.exports = { convertDateFormat };
