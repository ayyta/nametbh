import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useState } from "react";

// Schemas for validation
const usernameSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Username must be at least 2 characters." }),
});

const emailSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
});

const passwordSchema = z.object({
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
});

export function PopupForm({ userID, user, initialValues}) {
  const [errors, setErrors] = useState({});
  const { control, handleSubmit } = useForm({
    defaultValues: {
      username: initialValues?.username || user?.username || "",
      email: initialValues?.email || user?.email || "",
      password: "", // password should likely start empty
    },
  });
  

  const handleFormSubmit = (data, schema, field) => {
    const result = schema.safeParse({ [field]: data[field] });
    if (!result.success) {
      setErrors({ [field]: result.error.errors[0].message });
    } else {
      setErrors({});
      console.log(`${field} Data:`, { [field]: data[field] });
      updateUserInfo(field, data[field], userID);
    }
  };

  async function updateUserInfo(field, value, userID) {
    try{
        const response = await fetch(`/api/profile?userId=${userID}&field=${field}&value=${value}`, {
            method: "PUT",
        });
        if (!response.ok) throw new Error("Failed to update user info");
        const data = await response.json();
        console.log("Updated data:", data);
    } catch (error) {
        console.error(error.message);
    }
  }


  return (
    <div className="text-2xl w-full p-8 flex flex-col gap-4 h-full">
      {/* USERNAME FORM */}
      <form
        onSubmit={handleSubmit((data) =>
          handleFormSubmit(data, usernameSchema, "username")
        )}
        className="text-2xl w-full flex flex-col gap-4"
      >
        <div className="flex flex-col flex-grow">
          <span className="text-white text-sm font-bold">USERNAME*</span>
          {errors.username && <p className="text-red-500">{errors.username}</p>}
          <div className="flex w-full items-center">
            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder={user && user.username ? user.username : "Loading..."}
                  className="flex-grow text-white text-3xl h-16"
                />
              )}
            />
            <Button
              type="submit"
              className="ml-2 bg-[#313131] text-xl py-8 px-12"
            >
              Edit
            </Button>
          </div>
        </div>
      </form>

      {/* EMAIL FORM */}
      <form
        onSubmit={handleSubmit((data) =>
          handleFormSubmit(data, emailSchema, "email")
        )}
        className="text-2xl w-full flex flex-col gap-4"
      >
        <div className="flex flex-col flex-grow">
          <span className="text-white text-sm font-bold">EMAIL*</span>
          {errors.email && <p className="text-red-500">{errors.email}</p>}
          <div className="flex w-full items-center">
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder={user && user.email ? user.email : "Loading..."}
                  className="flex-grow text-white text-3xl h-16"
                />
              )}
            />
            <Button
              type="submit"
              className="ml-2 bg-[#313131] text-xl py-8 px-12"
            >
              Edit
            </Button>
          </div>
        </div>
      </form>

      {/* PASSWORD FORM */}
      <form
        onSubmit={handleSubmit((data) =>
          handleFormSubmit(data, passwordSchema, "password")
        )}
        className="text-2xl w-full flex flex-col gap-4"
      >
        <div className="flex flex-col flex-grow">
          <span className="text-white text-sm font-bold">PASSWORD*</span>
          {errors.password && <p className="text-red-500">{errors.password}</p>}
          <div className="flex w-full items-center">
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Enter password"
                  className="flex-grow text-white text-3xl h-16"
                />
              )}
            />
            <Button
              type="submit"
              className="ml-2 bg-[#313131] text-xl py-8 px-12"
            >
              Edit
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
