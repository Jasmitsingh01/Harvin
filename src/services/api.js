import * as React from 'react';
import { toast } from 'react-toastify';
import { renderToString } from 'react-dom/server';
import ErrorMessages from '../shared/error-messages';
import { ResponseStatus } from '../enums';

const fetcher = async (
  url,
  showError = true,
  method = 'GET',
  body,
  isImageUpload = false
) => {
  const options = {
    method: method,
    headers: isImageUpload
      ? {}
      : {
          'Content-Type': 'application/json;charset=utf-8',
        },
    body: isImageUpload ? body : JSON.stringify(body),
  };

  // eslint-disable-next-line no-undef
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  if (typeof window !== 'undefined') {
    if (localStorage.token && options.headers) {
      options.headers['Authorization'] = `Bearer ${localStorage.token}`;
    }
  }

  try {
    const response = await fetch(baseUrl + url, options);
    const json = await response?.json();
    console.log('json', json);

    if (isImageUpload) {
      if (response.ok) {
        return { data: json };
      }

      if (json && json.messages) {
        showError && toast.error(json.messages);
        throw new Error(json.messages);
      } else {
        showError && toast.error(response.statusText);
        throw new Error(response.statusText);
      }
    } else {
      if (response.status === ResponseStatus[404]) {
        throw new Error(renderToString(<ErrorMessages message={'notfound'} />));
      }
      if (response.status === ResponseStatus[400]) {
        throw json;
      }
      if (response.status === ResponseStatus[500]) {
        throw new Error(
          renderToString(<ErrorMessages message={'serverError'} />)
        );
      }
      if (response.ok) {
        return { data: json };
      }
      showError && toast.error(json.messages);
      throw json;
    }
  } catch (e) {
    // showError && toast.error(e.message || e.stack);
    showError;

    throw e;
  }
};

const fetcherPlainText = async (
  url,
  showError = true,
  method = 'GET',
  body
) => {
  const options = {
    method: method,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(body),
  };

  // eslint-disable-next-line no-undef
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  if (typeof window !== 'undefined') {
    if (localStorage.token && options.headers) {
      options.headers['Authorization'] = `Bearer ${localStorage.token}`;
    }
  }

  try {
    const response = await fetch(baseUrl + url, options);

    // If Content-Type is not JSON, assume it's a string response
    const text = await response.text();
    return { data: text };
  } catch (e) {
    showError && toast.error(e.message || e.stack);
    throw e;
  }
};

export const fetcherSWR = async (url, showError = false, body) => {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(body),
  };
  if (typeof window !== 'undefined') {
    if (localStorage.token && options.headers) {
      options.headers['Authorization'] = `Bearer ${localStorage.token}`;
    }
  }

  // eslint-disable-next-line no-undef
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  let response = null;
  try {
    response = await fetch(baseUrl + url, options);
    const json = await response.json();
    if (response.ok) {
      return json;
    }
    if (response.status === ResponseStatus[404]) {
      throw new Error(renderToString(<ErrorMessages message={'notfound'} />));
    }
    if (response.status === ResponseStatus[400]) {
      throw new Error(renderToString(<ErrorMessages message={'badRequest'} />));
    }
    if (response.status === ResponseStatus[500]) {
      throw new Error(
        renderToString(<ErrorMessages message={'serverError'} />)
      );
    }
    showError && toast.error(json.messages);
    throw new Error(json.messages);
  } catch (e) {
    showError && toast.error(e.message || e.stack);
    throw new Error(e.message || e.stack);
  }
};

const api = {
  get(url, showError = false) {
    return fetcher(url, showError);
  },
  post(url, data, showError = true) {
    return fetcher(url, showError, 'POST', data);
  },
  put(url, data, showError = true) {
    return fetcher(url, showError, 'PUT', data);
  },
  delete(url, data, showError = true) {
    return fetcher(url, showError, 'DELETE', data);
  },
  postPlainText(url, data, showError = true) {
    return fetcherPlainText(url, showError, 'POST', data);
  },
  postFormData(url, formData, showError = true) {
    return fetcher(url, showError, 'POST', formData, true);
  },
};
export default api;
