import classes from "./SigninForm.module.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { Link } from "react-router-dom";
import { signInUserQuery } from "@/lib/react-query/queriesAndMutation";
import { Oval } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { userContext } from "@/context/Context";

const FormSchema = z.object({
  email: z.string().email().min(2, {
    message: "Enter a valid email.",
  }),
  password: z.string().min(3, {
    message: "password must be at least 5 characters.",
  }),
});

function SignInForm() {
  const { setUser, setIsAuthenticated } = useContext(userContext);

  const navigate = useNavigate();

  const {
    mutateAsync: signInUser,
    isPending,
    isError,
    error,
  } = signInUserQuery();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const response = await signInUser(data);
    if (!isError) {
      const user = response.user;
      setUser(user);
      setIsAuthenticated(true);
      const accessToken = response.accessToken;

      localStorage.setItem("accessToken", accessToken);
      form.reset();
      navigate("/");
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className={classes.form}>
          <h1 className="text-xl font-bold text-center">Sign in</h1>

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
          <div className="flex justify-center items-center flex-col">
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
            {isError && <p>{error.message}</p>}
            <p className={classes.switch}>
              {" "}
              Don't have an Account ? <Link to="/register">Register</Link>
            </p>
          </div>
        </form>
      </Form>
    </>
  );
}

export default SignInForm;
