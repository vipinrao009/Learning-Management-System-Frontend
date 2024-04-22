import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import axiosInstance from "../../helpers/axiosInstance";

const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") || false,
  role: localStorage.getItem("role") || "",
  data:
    localStorage.getItem("data") != undefined
      ? JSON.parse(localStorage.getItem("data"))
      : {},
};

export const createAccount = createAsyncThunk("/auth/signup", async (data) => {
  try {
    const res = axiosInstance.post("user/register", data);
    toast.promise(res, {
      loading: "Wait! creating your account",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to create account",
    });
    return (await res).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

export const login = createAsyncThunk("/auth/login", async (data) => {
  try {
    const res = axiosInstance.post("user/login", data);
    toast.promise(res, {
      loading: "Wait! authentication in progress...",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to login",
    });
    return (await res).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

export const logout = createAsyncThunk("/auth/logout", async () => {
  try {
    const res = axiosInstance.get("user/logout");
    toast.promise(res, {
      loading: "Wait! logout is in progress....",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to logout...",
    });
    return (await res).data;
  } catch (error) {
    toast.error(error?.response?.message);
  }
});

export const updateProfile = createAsyncThunk(
  "user/update/profile",
  async (data) => {
    //Asynce me hamesh single paramete send karana chahiye
    try {
      const response = axiosInstance.put(`user/update/${data[0]}`, data[1]);
      toast.promise(response, {
        loading: "Wait! profile update is in progress...",
        success: (data) => {
          return data?.data?.message;
        },
        error: "Failed to update profile",
      });
      return (await response).data;
    } catch (error) {
      toast.error(error?.response?.message);
    }
  }
);

export const getUserData = createAsyncThunk("/user/details", async () => {
  try {
    const res = await axiosInstance.get("user/getuser");
    return (await res).data;
  } catch (error) {
    toast.error(error.message);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        localStorage.setItem("data", JSON.stringify(action?.payload?.user));
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("role", action?.payload?.user?.role);
        state.isLoggedIn = true;
        state.data = action?.payload?.user;
        state.role = action?.payload?.user?.role;
      })
      .addCase(logout.fulfilled, (state) => {
        localStorage.clear();
        state.isLoggedIn = false;
        state.role = "";
        state.data = {};
      })

      .addCase(getUserData.fulfilled, (state, action) => {
        if (!action?.payload?.user) return;
        localStorage.setItem("data", JSON.stringify(action?.payload?.user));
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("role", action?.payload?.user?.role);
        state.isLoggedIn = true;
        state.data = action?.payload?.user;
        state.role = action?.payload?.user?.role;
      });
  },
});

export default authSlice.reducer;

// // import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// // import { toast } from "react-hot-toast";

// // import axiosInstance from "../../helpers/axiosInstance";

// // const initialState = {
// //   isLoggedIn: localStorage.getItem("isLoggedIn") || false,
// //   role: localStorage.getItem("role") || "",
// //   data:
// //     localStorage.getItem("data") != undefined
// //       ? JSON.parse(localStorage.getItem("data"))
// //       : {},
// // };

// // export const createAccount = createAsyncThunk("/auth/signup", async (data) => {
// //   try {
// //     const res = axiosInstance.post("user/register", data);
// //     toast.promise(res, {
// //       loading: "Wait! creating your account",
// //       success: (data) => {
// //         return data?.data?.message;
// //       },
// //       error: "Failed to create account",
// //     });
// //     return (await res).data;
// //   } catch (error) {
// //     toast.error(error?.response?.data?.message);
// //   }
// // });

// // export const login = createAsyncThunk("/auth/login", async (data) => {
// //   try {
// //     const res = axiosInstance.post("user/login", data);
// //     toast.promise(res, {
// //       loading: "Wait! authentication in progress...",
// //       success: (data) => {
// //         return data?.data?.message;
// //       },
// //       error: "Failed to login",
// //     });
// //     return (await res).data;
// //   } catch (error) {
// //     toast.error(error?.response?.data?.message);
// //   }
// // });

// // export const logout = createAsyncThunk("/auth/logout", async () => {
// //   try {
// //     const res = axiosInstance.get("user/logout");
// //     toast.promise(res, {
// //       loading: "Wait! logout is in progress....",
// //       success: (data) => {
// //         return data?.data?.message;
// //       },
// //       error: "Failed to logout...",
// //     });
// //     return (await res).data;
// //   } catch (error) {
// //     toast.error(error?.response?.message);
// //   }
// // });

// export const updateProfile = createAsyncThunk(
//   "/user/update/profile", // url correction // (not creating problem but still for saftey)
//   async (data) => {
//     //Asynce me hamesh single paramete send karana chahiye

//     try {
//       // removed await from here
//       const response = axiosInstance.put(`/user/update/${data[0]}`, data[1]);
//       toast.promise(response, {
//         loading: "Wait! profile update is in progress...",
//         success: (data) => {
//           return data?.data?.message;
//         },
//         error: "Failed to update profile",
//       });
//       return (await response).data;
//     } catch (error) {
//       toast.error(error?.response?.message);
//     }
//   }
// );

// export const getUserData = createAsyncThunk("/user/details", async () => {
//   try {
//     const res = await axiosInstance.get("/user/getuser");
//     // const res = await axiosInstance.get("/user/me");
//     // return (await res).data; //update kiya hai
//     return res?.data;
//   } catch (error) {
//     toast.error(error.message);
//   }
// });
// // const authSlice = createSlice({
// //   name: "auth",
// //   initialState,
// //   reducers: {},
// //   extraReducers: (builder) => {
// //     builder
// //       .addCase(login.fulfilled, (state, action) => {
// //         localStorage.setItem("data", JSON.stringify(action?.payload?.user));
// //         localStorage.setItem("isLoggedIn", true);
// //         localStorage.setItem("role", action?.payload?.user?.role);
// //         state.isLoggedIn = true;
// //         state.data = action?.payload?.user;
// //         state.role = action?.payload?.user?.role;
// //       })
// //       .addCase(logout.fulfilled, (state) => {
// //         localStorage.clear();
// //         state.isLoggedIn = false;
// //         state.role = "";
// //         state.data = {};
// //       })

// //       .addCase(getUserData.fulfilled, (state, action) => {
// //         if (!action?.payload?.user) return;
// //         localStorage.setItem("data", JSON.stringify(action?.payload?.user));
// //         localStorage.setItem("isLoggedIn", true);
// //         localStorage.setItem("role", action?.payload?.user?.role);
// //         state.isLoggedIn = true;
// //         state.data = action?.payload?.user;
// //         state.role = action?.payload?.user?.role;
// //       });
// //   },
// // });

// // export default authSlice.reducer;

// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { toast } from "react-hot-toast";

// import axiosInstance from "../../helpers/axiosInstance";

// const initialState = {
//   isLoggedIn: localStorage.getItem("isLoggedIn") || false,
//   role: localStorage.getItem("role") || "",
//   data:
//     localStorage.getItem("data") != undefined
//       ? JSON.parse(localStorage.getItem("data"))
//       : {},
// };

// export const createAccount = createAsyncThunk("/auth/signup", async (data) => {
//   try {
//     const res = axiosInstance.post("user/register", data);
//     toast.promise(res, {
//       loading: "Wait! creating your account",
//       success: (data) => {
//         return data?.data?.message;
//       },
//       error: "Failed to create account",
//     });
//     return (await res).data;
//   } catch (error) {
//     toast.error(error?.response?.data?.message);
//   }
// });

// export const login = createAsyncThunk("/auth/login", async (data) => {
//   try {
//     const res = axiosInstance.post("user/login", data);
//     toast.promise(res, {
//       loading: "Wait! authentication in progress...",
//       success: (data) => {
//         return data?.data?.message;
//       },
//       error: "Failed to login",
//     });
//     return (await res).data;
//   } catch (error) {
//     toast.error(error?.response?.data?.message);
//   }
// });

// export const logout = createAsyncThunk("/auth/logout", async () => {
//   try {
//     const res = axiosInstance.get("user/logout");
//     toast.promise(res, {
//       loading: "Wait! logout is in progress....",
//       success: (data) => {
//         return data?.data?.message;
//       },
//       error: "Failed to logout...",
//     });
//     return (await res).data;
//   } catch (error) {
//     toast.error(error?.response?.message);
//   }
// });

// export const updateProfile = createAsyncThunk(
//   "/user/update/profile", // url correction // (not creating problem but still for saftey)
//   async (data) => {
//     //Asynce me hamesh single paramete send karana chahiye

//     try {
//       // removed await from here
//       const response = axiosInstance.put(`/user/update/${data[0]}`, data[1]);
//       toast.promise(response, {
//         loading: "Wait! profile update is in progress...",
//         success: (data) => {
//           return data?.data?.message;
//         },
//         error: "Failed to update profile",
//       });
//       return (await response).data;
//     } catch (error) {
//       toast.error(error?.response?.message);
//     }
//   }
// );

// export const getUserData = createAsyncThunk("/user/details", async () => {
//   try {
//     const res =  axiosInstance.get("/user/getuser");
//     // const res = await axiosInstance.get("/user/me");
//     // return (await res).data; //update kiya hai
//     return res?.data;
//   } catch (error) {
//     toast.error(error.message);
//   }
// });
// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(login.fulfilled, (state, action) => {
//         localStorage.setItem("data", JSON.stringify(action?.payload?.user));
//         localStorage.setItem("isLoggedIn", true);
//         localStorage.setItem("role", action?.payload?.user?.role);
//         state.isLoggedIn = true;
//         state.data = action?.payload?.user;
//         state.role = action?.payload?.user?.role;
//       })
//       .addCase(logout.fulfilled, (state) => {
//         localStorage.clear();
//         state.isLoggedIn = false;
//         state.role = "";
//         state.data = {};
//       })

//       .addCase(getUserData.fulfilled, (state, action) => {
//         if (!action?.payload?.user) return;
//         localStorage.setItem("data", JSON.stringify(action?.payload?.user));
//         localStorage.setItem("isLoggedIn", true);
//         localStorage.setItem("role", action?.payload?.user?.role);
//         state.isLoggedIn = true;
//         state.data = action?.payload?.user;
//         state.role = action?.payload?.user?.role;
//       });
//   },
// });

// export default authSlice.reducer;
