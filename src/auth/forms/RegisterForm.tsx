//task => validation for coverImage and avatar . right now set to  any
import { useState } from "react";
import classes from "./SigninForm.module.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Oval } from "react-loader-spinner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { registerUserQuery } from "@/lib/react-query/queriesAndMutation";

const FormSchema = z.object({
  fullName: z.string().min(2, {
    message: "fullName must be at least 2 characters.",
  }),
  username: z.string().min(5, {
    message: "username must be at least 5 characters.",
  }),
  email: z.string().email().min(2, {
    message: "Enter a valid email.",
  }),
  password: z.string().min(5, {
    message: "password must be at least 5 characters.",
  }),
  avatar: z.any(),
  coverImage: z.any(),
});

function RegisterForm() {
  const [avatarImage, setAvatarImage] = useState<File | undefined>();
  const [coverImage, setCoverImage] = useState<File | "">();

  const navigate = useNavigate();

  const {
    mutateAsync: registerUser,
    isError,
    isPending,
  } = registerUserQuery();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      fullName: "",
      username: "",
      email: "",
      password: "",
      coverImage: "",
    },
  });

  const avatarImageHandler = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    };
    setAvatarImage(target.files[0]);
  };
  const coverImageHandler = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    };
    setCoverImage(target.files[0]);
  };

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const user_data = {
      avatar: avatarImage,
      username: data.fullName,
      fullName: data.fullName,
      coverImage: coverImage,
      password: data.password,
      email: data.email,
    };
    const response = await registerUser(user_data);
    if (!response) {
      throw new Error("Unable to register");
    }

    console.log(response);

    form.reset();
    navigate("/signin");
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={classes.form}
          encType="multipart/form-data"
        >
          <h1 className="text-xl font-bold text-center">Register</h1>
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your full name"
                    {...field}
                    className={classes.input}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter a username"
                    {...field}
                    className={classes.input}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your email"
                    {...field}
                    className={classes.input}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your password"
                    {...field}
                    className={classes.input}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="avatar"
            render={() => (
              <FormItem>
                <FormLabel>Avatar</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={avatarImageHandler}
                    className={classes.input}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="coverImage"
            render={() => (
              <FormItem>
                <FormLabel>CoverImage</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={coverImageHandler}
                    className={classes.input}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col justify-center items-center">
            {isPending ? (
              <Button disabled>
                <Oval
                  visible={true}
                  height="10"
                  width="10"
                  color="blue"
                  secondaryColor="blue"
                  ariaLabel="oval-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              </Button>
            ) : (
              <Button type="submit">Submit</Button>
            )}
            {isError && <p>Failed to register</p>}

            <p className={classes.switch}>
              {" "}
              Already have an Account ? <Link to="/signin">Sign in</Link>
            </p>
          </div>
        </form>
      </Form>
    </>
  );
}

export default RegisterForm;
