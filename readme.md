# URL Shortener Service
A backend service built with NodeJS

## Used tools

- NodeJS
- MongoDB
- Express JS
- Mongoose
- Joi

## Hashing method

To create shorts-codes instead of generating random strings, a model to keep a sequence of numbers was created. Each time there is a valid request, that sequence is increased (as an auto-increment field on an RDBMS), and that new value is encoded to create a hash with the indicated characters using this algorithm:

```js
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
```

The final padding is used to fulfill the requirement of having a hash code length of six characters when the generated hash length is lower.

For high data volume scenarios, the sequence of numbers can be managed separately in a Key Generation Service (KGS) orchestrated with tools like [Apache ZooKeeper](https://zookeeper.apache.org/) to assign ranges to different instances that can run in parallel and avoid collisions.