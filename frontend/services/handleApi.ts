import axios from "axios";

// Axios Get Data Method
export const getData = async (path: string) => {
  let config: any = {
    method: "get",
    url: `${process.env.NEXT_PUBLIC_API_URL}${path}`,
    headers: {
      "Content-Type": "application/json",
    },
  };

  return await axios(config)
    .then((res) => res.data)
    .catch(function (error) {
      console.log(error);
    });
};

// Axios Post Data Method
export async function postData(path: string = "", data: any) {
  let config: any = {
    method: "post",
    url: `${process.env.NEXT_PUBLIC_API_URL}${path}`,
    headers: {
      "Content-Type": "application/json",
    },
    data,
  };

  try {
    const response = await axios(config);
    console.log(response);
    return response;
  } catch (error) {
    console.error(error.response);
    return error.response;
  }
}
