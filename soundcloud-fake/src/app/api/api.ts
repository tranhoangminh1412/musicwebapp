import { ILoginForm } from "@/types/ILoginForm";
import { IRegisterForm } from "@/types/IRegisterForm";


export const BASE_URL = process.env.REACT_APP_API_PATH;

interface RequestOptions {
  method?: string;
  requiresAuth?: boolean;
  body?: Record<string, any>;
  headers?: Record<string, string>;
  cache?: CACHE;
  credentials?: Credentials;
}

enum CACHE {
  NO_STORE = "no-store",
  DEFAULT = "default",
}

enum Credentials {
  INCLUDE = "include",
  OMIT = "omit",
  SAME_ORIGIN = "same-origin",
}

class ServerError extends Error {
  public message: any;
  public statusCode: number;
  public error: string;

  constructor(errorResponse: any) {
    super("CustomApiError");
    this.message = errorResponse.message;
    this.statusCode = errorResponse.statusCode;
    this.error = errorResponse.error;
  }
}

// Function to make API requests with customizable options
export async function makeApiRequest<T>(
  endpoint: string,
  options: RequestOptions = {},
  baseUrl: any = BASE_URL
): Promise<T> {
  try {
    const {
      method = "GET",
      requiresAuth = false,
      cache = "no-store",
      credentials = Credentials.OMIT,
    } = options;
    const requestOptions: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(requiresAuth ? { Authorization: `Bearer ${getToken()}` } : {}),
        ...options.headers,
      },
      ...(method !== "GET" && options.body
        ? { body: JSON.stringify(options.body) }
        : {}),
      cache,
      // credentials,
    };
    const response = await fetch(`${baseUrl}/${endpoint}`, requestOptions);

    if (!response.ok) {
      const errorData = await response.json();
      throw new ServerError(errorData);
    }
    return (await response.json()) as T;
  } catch (error) {
    if (error instanceof ServerError) {
      //console.log(error.statusCode);
      throw new Error(
        JSON.stringify({
          error: error.error,
          message: error.message,
          statusCode: error.statusCode,
        })
      );
    } else {
      throw new Error("Something went wrong");
    }
  }
}

// Function to retrieve the authentication token (customize as needed)
function getToken(): string {
  const token = localStorage.getItem("js4ever_token")?.replaceAll(`"`, ""); // Replace with your token retrieval logic

  if (!token) {
    throw new Error("Authentication token is missing.");
  }
  return token;
}

export async function login(data: ILoginForm) {
  const res = await makeApiRequest("auth/login", {
    method: "POST",
    body: data,
    credentials: Credentials.INCLUDE,
  });
  return res;
}

export async function signup(data: IRegisterForm) {
  const res = await makeApiRequest("auth/signup", {
    method: "POST",
    body: data,
    credentials: Credentials.INCLUDE,
  });
  return res;
}

// export async function getUserProfile() {
//   const res = await makeApiRequest("user/profile", {
//     method: "GET",
//     requiresAuth: true,
//   });
//   return res;
// }
// export async function getListChallenges() {
//   const res = await makeApiRequest("challenge", {
//     method: "GET",
//     credentials: Credentials.INCLUDE,
//     requiresAuth: true,
//   });
//   return res;
// }

// export async function getDetailChallenge(id: number) {
//   const res = await makeApiRequest(`challenge/${id}`, {
//     method: "GET",
//     credentials: Credentials.INCLUDE,
//     requiresAuth: true,
//   });
//   return res;
// }

// export async function getChallengeSubmission(id: number) {
//   const res = await makeApiRequest(`challenge/${id}/submission`, {
//     method: "GET",
//     credentials: Credentials.INCLUDE,
//     requiresAuth: true,
//   });
//   return res;
// }

// export async function startNewChallenge(id: number) {
//   const res = await makeApiRequest(`challenge/${id}/start`, {
//     method: "POST",
//     credentials: Credentials.INCLUDE,
//     requiresAuth: true,
//   });
//   return res;
// }

// export async function updateCodeTemplate(id: number, files: SandpackFiles) {
//   const res = await makeApiRequest(`challenge/${id}/submission`, {
//     method: "PUT",
//     body: {
//       code: files,
//       status: 1,
//     },
//     credentials: Credentials.INCLUDE,
//     requiresAuth: true,
//   });
//   return res;
// }

// export async function getListSeries(params: any) {
//   const res = await makeApiRequest(`series/list?${getParamsHelp(params)}`, {
//     method: "GET",
//     credentials: Credentials.INCLUDE,
//     requiresAuth: true,
//   });
//   return res;
// }
