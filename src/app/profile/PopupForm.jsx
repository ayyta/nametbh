import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { z } from "zod";

const formSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Username must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
});

const formFields = [
  {
    label: "USERNAME",
    table_name: "username",
    input_name: "Username",
    placeholder: "Loading...",
    buttonText: "Edit",
  },
  {
    label: "EMAIL",
    table_name: "email",
    input_name: "Email",
    placeholder: "Loading...",
    buttonText: "Edit",
  },
  {
    label: "PASSWORD",
    table_name: "password",
    input_name: "Password",
    placeholder: "Enter password",
    buttonText: "Edit",
  },
];

export function PopupForm({ userID, user, initialValues }) {
  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: initialValues?.username || user?.username || "",
      email: initialValues?.email || user?.email || "",
      password: "", // password should likely start empty
    },
  });

  const handleFormSubmit = async (data, fieldName, inputName) => {
    // Clear any previous errors
    clearErrors(fieldName);

    const fieldSchema = formSchema.pick({ [fieldName]: true });
    const result = fieldSchema.safeParse({ [fieldName]: data[fieldName] });

    if (!result.success) {
      setError(fieldName, { message: result.error.errors[0].message });
    } else {
      try {
        await updateUserInfo(fieldName, data[fieldName], userID);
      } catch (error) {
        setError(fieldName, { message: `${error.message}.` });
      }
    }
  };

  async function updateUserInfo(field, value, userID) {
    try {
      const response = await fetch(
        `/api/profile/user?userId=${userID}&field=${field}&value=${value}`,
        {
          method: "PUT",
        }
      );
      if (!response) {
        throw new Error("No response from server");
      }

      const data = await response.json(); // Parse the JSON response
      if (response.status === 409) {
        throw new Error(data.error); // Handle "already taken" errors
      }
      if (!response.ok) {
        throw new Error("Failed to update user info");
      }
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  const FormField = ({
    label,
    table_name,
    input_name,
    placeholder,
    buttonText,
  }) => (
    <form
      onSubmit={handleSubmit((data) =>
        handleFormSubmit(data, table_name, input_name)
      )}
      className="w-full flex flex-col gap-4"
    >
      <div className="flex flex-col flex-grow">
        <div className="flex gap-6">
          <span className="text-white font-bold">{label} *</span>
          {errors[table_name] && (
            <p className="text-red-500">{errors[table_name]?.message}</p>
          )}
        </div>
        <div className="flex w-full items-center">
          <Controller
            name={table_name}
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder={
                  user && user[table_name] ? user[table_name] : placeholder
                }
                className="flex-grow text-lg text-white h-12 border-none"
              />
            )}
          />
          <Button
            type="submit"
            className="ml-2 bg-[#313131] text-base py-6 px-8"
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </form>
  );

  return (
    <div className="text-base w-full h-full p-8 flex flex-col gap-4">
      {formFields.map((field) => (
        <FormField
          key={field.table_name}
          label={field.label}
          table_name={field.table_name}
          input_name={field.input_name}
          placeholder={field.placeholder}
          buttonText={field.buttonText}
        />
      ))}
    </div>
  );
}
