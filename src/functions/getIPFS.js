// import IPFS from "ipfs-mini";

// const ipfs = new IPFS({
//   host: "ipfs.infura.io",
//   port: 5001,
//   protocol: "https",
// });

// const addData = (data) =>
//   new Promise((resolve, reject) => {
//     ipfs.add(data, (err, hash) => {
//       if (!err) {
//         const img = `https://ifps.infura.io/ipfs/${hash}`;
//         resolve(img);
//       } else {
//         console.log(err);
//         reject(err);
//       }
//     });
//   });

//

import { create } from "ipfs-http-client";

/* Create an instance of the client */
const client = create("https://ipfs.infura.io:5001/api/v0");

const addData = (data) => {
  console.log("adding");
  return new Promise((resolve, reject) => {
    client
      .add(data)
      .then((added) => {
        const url = `https://ifps.infura.io/ipfs/${added.path}`;
        resolve(url);
      })
      .catch((err) => reject(err));
  });
};

export default addData;
