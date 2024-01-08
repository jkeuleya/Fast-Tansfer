import api from "../hooks/axios";
import { FileUpload, SalesProps } from "../types/types";
interface Credentials {
  email: string;
  password: string;
}

interface FileUploadResponse {
  data?: FileUpload;
  status?: number;
  statusText?: string;
  error?: string;
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
    return console.log(error, "login");
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
    return response.data;
  } catch (error) {
    return error;
  }
};
export const getStripeurl = async (): Promise<{
  url?: string;
  status?: number;
  statusText?: string;
  error?: string;
}> => {
  try {
    const response = await api.get("/registration/confirm");
    return {
      url: response.data.url,
      status: response.status,
      statusText: response.statusText,
    };
  } catch (error) {
    return {
      //@ts-ignore
      error: error.message,
    };
  }
};
export const getAgainStatus = async (): Promise<{
  data?: {
    confirmation_status: boolean;
  };
  status?: number;
  statusText?: string;
  error?: string;
}> => {
  try {
    const response = await api.get("/session/confirmation_status");
    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
    };
  } catch (error) {
    return {
      //@ts-ignore
      error: error.message,
    };
  }
};
export const uploadAndGetFile = async (
  method: "GET" | "POST",
  file?: string,
  price?: string
): Promise<
  | FileUploadResponse
  | {
      data?: SalesProps[];
      status?: number;
      statusText?: string;
      error?: string;
    }
> => {
  try {
    if (method === "GET") {
      const response = await api.get<SalesProps[]>("/uploads");
      return {
        data: response.data,
        status: response.status,
        statusText: response.statusText,
      };
    } else if (method === "POST") {
      const document = file;
      const formData = new FormData();

      // Append the file to the FormData object
      formData.append("document", document!);

      // Append other form fields
      formData.append("price", price!);

      const response = await api.post("/uploads", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      });

      return {
        data: response.data,
        status: response.status,
        statusText: response.statusText,
      };
    } else {
      throw new Error("Invalid parameters for the request.");
    }
  } catch (error) {
    return {
      status: 401,
      statusText: "Unauthorized",
      //@ts-ignore
      error: error.message,
    };
  }
};
