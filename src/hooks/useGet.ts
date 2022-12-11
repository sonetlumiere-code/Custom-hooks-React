import { useEffect, useState } from 'react'
import axios from 'axios'

export const useGet = <T>(url: string) => {
  interface IStatus {
    loading: boolean;
    error: null | any;
    data: null | T[]
  }

  const [status, setStatus] = useState<IStatus>({
    loading: true,
    error: null,
    data: null
  });
  
  useEffect(() => {
    getData();
  }, []);
  
  const getData = async () => {
    try {
      const res = await axios(url);
      setStatus({
        loading: false,
        error: null,
        data: res.data
      });
    } catch (error) {
      setStatus({
        loading: false,
        error: error,
        data: null
      });
      console.error(error);
    }
  }

  return [status.data, status.loading, status.error]
}
