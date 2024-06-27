// @deno-types="npm:@types/stripe"
import Stripe from "npm:stripe@^15.2.0";

export { Stripe };

// const maxRetries = 3;
// const b = 2;
// const delay = 100;

// async function addExponentialBackOff(
//   func: (values: object) => void,
//   values: object,
//   retries: number
// ) {
//   try {
//     await func(values);
//   } catch (_) {
//     if (retries > maxRetries) {
//       setTimeout(() => {
//         addExponentialBackOff(func, values, retries + 1);
//       }, b ** retries * delay);
//     }
//   }
// }

// export { addExponentialBackOff };
