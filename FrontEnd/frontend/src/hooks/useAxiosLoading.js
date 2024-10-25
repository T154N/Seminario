// import { useState, useEffect } from 'react';
// import axios from 'axios';

// let loadingCount = 0;

// export const useAxiosLoading = () => {
//     const [loading, setLoading] = useState(false);

//     useEffect(() => {
//         const requestInterceptor = axios.interceptors.request.use(config => {
//             loadingCount++;
//             setLoading(true);
//             return config;
//         });

//         const responseInterceptor = axios.interceptors.response.use(
//             response => {
//                 loadingCount--;
//                 if (loadingCount === 0) {
//                     setLoading(false);
//                 }
//                 return response;
//             },
//             error => {
//                 loadingCount--;
//                 if (loadingCount === 0) {
//                     setLoading(false);
//                 }
//                 return Promise.reject(error);
//             }
//         );

//         return () => {
//             axios.interceptors.request.eject(requestInterceptor);
//             axios.interceptors.response.eject(responseInterceptor);
//         };
//     }, []);

//     return loading;
// };
