import { async } from 'regenerator-runtime';
import { TIME_OUT } from './config';

// const { version } = require('process');

//     if (!response.ok) throw new Error(`${data.message}(${response.status})`);
//     return data;
//   } catch (err) {
//     alert(err);
//   }
// };

// version 2.0

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};
export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPromise = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);

    const response = await Promise.race([fetchPromise, timeout(TIME_OUT)]);

    const data = await response.json();

    if (!response.ok) throw new Error(`${data.message} ${response.status}`);
    return data;
  } catch (err) {
    throw err;
  }
};

// export const getJSON = async function (url) {
//   try {
//     // const fetchPromise = fetch(url);
//     const response = await Promise.race([fetch(url), timeout(TIME_OUT)]);
//     // const response = await fetch(url);

//     const data = await response.json();

//     if (!response.ok) throw new Error(`${data.message} ${response.status}`);
//     return data;
//   } catch (err) {
//     throw err;
//     // alert(err);
//   }
// };
// export const sendJSON = async function (url, uploadData) {
//   try {
//     // const fetchPromise = fetch(url);
//     const response = await Promise.race([
//       fetch(url, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(uploadData),
//       }),
//       timeout(TIME_OUT),
//     ]);
//     // const response = await fetch(url);

//     const data = await response.json();

//     if (!response.ok) throw new Error(`${data.message} ${response.status}`);
//     return data;
//   } catch (err) {
//     throw err;
//     // alert(err);
//   }
// };
