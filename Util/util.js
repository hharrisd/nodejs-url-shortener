function validateUrl(value) {
  let urlPattern = new RegExp(
    "^(https?:\\/\\/)?" + // validate protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // validate domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // validate OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // validate port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // validate query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  );

  return !!urlPattern.test(value);
}

function encode_int_to_base62(id) {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let hash_digits = [];
  let hash_string = "";
  let dividend = id;
  let remainder = 0;

  while (dividend > 0) {
    remainder = dividend % chars.length;
    dividend = ~~(dividend / chars.length);
    hash_digits = [remainder, ...hash_digits];
  }

  for (let digit of hash_digits) {
    hash_string += chars.charAt(digit);
  }

  return hash_string.padStart(6, "=");
}

function dateDisplayed(timestamp) {
  let date = new Date(timestamp);
  return (
    date.getMonth() +
    1 +
    "/" +
    date.getDate() +
    "/" +
    date.getFullYear() +
    " " +
    date.getHours() +
    ":" +
    date.getMinutes() +
    ":" +
    date.getSeconds()
  );
}
module.exports = { validateUrl, encode_int_to_base62, dateDisplayed };
