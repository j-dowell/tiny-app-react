import axios from 'axios';
import { AUTHENTICATED, UNAUTHENTICATED } from '../actions';

// export const verifyUserToken = (token) => {
//   axios.get(`/token/${token}`)
//     .then(function(response) {
//       return response
//     })
//     .catch(function(error) {
//       console.log(error);
//     })
// }

// // export { verifyUserToken }
// export function verifyUserToken(token) {
//   console.log('toek')
//   return function(dispatch) {
//     return axios.get(`token/${token}`)
//     .then(response => {
//       if (response.auth) {
//         dispatch({
//           type: AUTHENTICATED
//         })
//       } else {
//         dispatch({
//           type: UNAUTHENTICATED
//         })
//       }
//     })
//   }
// }
// export async function verifyUserToken(token) {
//   const response = await axios.get(`/token/token`);
//   // const json = await response.json();
//   console.log(response.data);
//   return response.data;
// }
// module.exports.verifyUserToken = verifyUserToken;
// module.exports = {
//   verifyUserToken: verifyUserToken
// }