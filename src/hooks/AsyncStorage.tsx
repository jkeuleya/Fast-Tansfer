import AsyncStorage from "@react-native-async-storage/async-storage";

interface LoginData {
  status: string;
  token: string;
}

// Function to add login data (status and token)
export const addLoginData = (status: string, token: string) => {
  const loginData: LoginData = { status, token };

  AsyncStorage.setItem("loginData", JSON.stringify(loginData), (error) => {
    if (error) {
      console.error("Error setting login data:", error);
    } else {
      console.log("Login data set successfully.");
    }
  });
};

// Function to add register token
export const addRegisterToken = (token: string) => {
  AsyncStorage.setItem("registerToken", JSON.stringify({ token }), (error) => {
    if (error) {
      console.error("Error setting register token:", error);
    } else {
      console.log("Register token set successfully.");
    }
  });
};

// Function to get login status and token
export const getLoginData = async (): Promise<LoginData | null> => {
  try {
    const dataString = await AsyncStorage.getItem("loginData");
    if (dataString) {
      const loginData: LoginData = JSON.parse(dataString);
      return loginData;
    }
    return null;
  } catch (error) {
    console.error("Error getting login data:", error);
    return null;
  }
};

// Function to get register token
export const getRegisterToken = async (): Promise<string | null> => {
  try {
    const tokenString = await AsyncStorage.getItem("registerToken");
    if (tokenString) {
      const { token } = JSON.parse(tokenString);
      return token;
    }
    return null;
  } catch (error) {
    console.error("Error getting register token:", error);
    return null;
  }
};
// Function to get token

export const getToken = async (): Promise<{
  status?: string;
  token: string;
}> => {
  const loginToken = await getLoginData();

  if (loginToken?.token !== null && loginToken?.token !== undefined) {
    return loginToken;
  } else {
    const registerToken = await getRegisterToken();
    return { token: registerToken as string };
  }
};

export const removeTokens = async () => {
  await AsyncStorage.removeItem("loginData");
  await AsyncStorage.removeItem("registerToken");
  return "Logged out ...";
};

// // Example usage
// const main = async () => {
//   // Add login data with status and token
//   addLoginData("loggedIn", "exampleLoginToken");

//   // Add register data with only the token
//   addRegisterToken("exampleRegisterToken");

//   // Get login data
//   const loginData = await getLoginData();
//   if (loginData) {
//     console.log("Login Status:", loginData.status);
//     console.log("Login Token:", loginData.token);
//   } else {
//     console.log("Login data not found.");
//   }

//   // Get register token
//   const registerToken = await getRegisterToken();
//   if (registerToken) {
//     console.log("Register Token:", registerToken);
//   } else {
//     console.log("Register token not found.");
//   }
// };
