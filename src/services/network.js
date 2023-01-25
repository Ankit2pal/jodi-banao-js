import axios from 'axios';
// Http call to regenerate Token with REFRESH_TOKEN
function reGenerateToken() {
  const httpObject = {
    url: '/auth/regenerate_token',
    data: {
      _method: 'POST',
      user: {
        refresh_token: '' //Get the refresh token
      }
    }
  };
  httpRequest(httpObject)
    .then(() => {
      //Set both the ACCESS_TOKEN AND REFRESH_TOKEN
      window.location.reload();
    })
    .catch(() => {
      //Delete both tokens
      window.location.replace('/login');
    });
}

// Response Interceptors
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    if (error.response) {
      if (error.response.status === 401) {
        reGenerateToken();
      }
    }
    return Promise.reject(error);
  }
);

/**
 * API calling module
 * @param  {Object} httpObj          [HTTP confirguration object]
 * @param  {Function} successHandler [Success Callback]
 * @param  {Function} errorHandler   [Failure Callback]
 * @return {Objet Callback}          [Return Object Callback]
 */
export default function httpRequest(httpObj, successHandler, errorHandler) {
  const serverUrl = `${process.env.REACT_APP_API_PROTOCOL}://${process.env.REACT_APP_API_HOST}/`;
  const httpData = JSON.stringify(httpObj.data);

  return axios
    .request({
      url: httpObj.url,
      method: httpObj.method || 'POST',
      baseURL: httpObj.baseURL || serverUrl,
      headers: {
        ...{ 'Content-Type': 'application/json' }
      },
      params: httpObj.params,
      timeout: 40000,
      data: httpData
    })
    .then(successHandler)
    .catch(errorHandler);
}
