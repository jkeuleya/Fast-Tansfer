import api from "../hooks/axios";
import { SalesProps } from "../types/types";
interface Credentials {
  email: string;
  password: string;
}

interface FileUploadResponse {
  fileId: string;
  success: boolean;
}

export const login = async (credentials: Credentials): Promise<any> => {
  try {
    const response = await api.post("/session", {
      session: {
        email: credentials.email,
        password: credentials.password,
      },
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

export const register = async (credentials: Credentials): Promise<any> => {
  try {
    const response = await api.post("/registration", {
      registration: {
        email: credentials.email,
        password: credentials.password,
      },
    });
    console.log(response.data, "response.data from register");

    return response.data;
  } catch (error) {
    return error;
  }
};

export const uploadAndGetFile = async (
  method: "GET" | "POST",
  file?: string,
  price?: string
): Promise<FileUploadResponse | SalesProps[]> => {
  try {
    if (method === "GET") {
      const response = await api.get<SalesProps[]>("/uploads");
      return response.data;
    } else if (method === "POST") {
      const document = file;

      const formData = new FormData();
      formData.append("upload[document]", document!);
      formData.append("upload[price]", price!);

      const response = await fetch(
        "https://fast-transfer-api-staging-b93efabd8361.herokuapp.com/api/v1/uploads",
        {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.json(), "response from uploadAndGetFile");

      //@ts-ignore
      return [response.data]; // Wrap the response in an array for consistency with GET response
    } else {
      throw new Error("Invalid parameters for the request.");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
