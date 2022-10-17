import data from './data.json';

export default function handler(req, res) {
  // const response = await fetch('http://localhost:4200/users');
  // console.log(response);
  // const users = await response.json();

  res.status(200).json(data);
  // res.status(200).json(users);
  // res.status(200);
}

// export default function handler(req, res) {
//   fetch('http://localhost:4200/users').then((r) => {
//     res.status(200).json(r);
//   });

//   // const users = await response.json();

//   // res.status(200).json(data);
//   // res.status(200);
// }
