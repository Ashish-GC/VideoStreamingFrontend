import classes from "./EditVideo.module.css";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useEffect, useState } from "react";
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
import { editVideoQuery } from "@/lib/react-query/queriesAndMutation";
import { videoType } from "@/types";
import { useToast } from "@/components/ui/use-toast";

const FormSchema = z.object({
  title: z.string().min(1, {
    message: "title must be at least 1 characters.",
  }),
  description: z.string().min(2, {
    message: "username must be at least 2 characters.",
  }),
  thumbnail: z.any(),
});

function EditVideo({ video }: { video: videoType }) {
  const [thumbnail, setThumbnail] = useState<File | "">();

  const {
    mutateAsync: editVideo,
    isError,
    data,
    isPending,
    error,
  } = editVideoQuery();

  //notification
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: video.title,
      description: video.description,
    },
  });

  const thumbnailHandler = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    };
    setThumbnail(target.files[0]);
  };

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const video_data: any = {
      videoId: video._id,
      thumbnail,
      title: data.title,
      description: data.description,
    };

    editVideo(video_data);
  }

  useEffect(() => {
    if (data) {
      toast({
        description: "video content edited ",
      });
    }
  }, [data]);

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <button className="bg-gray-500 p-1 pl-2 pr-2 text-xs lg:text-base  hover:bg-gray-400 text-white lg:p-2 lg:pl-4 lg:pr-4 rounded-md">
            Edit
          </button>
        </DialogTrigger>

        <DialogContent className={classes.dialog}>
          <div>
            <div className={classes.dialogHeader}>
              <h1>Edit Video</h1>
            </div>
            <div className={classes.dialogContent}>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className={classes.form}
                  encType="multipart/form-data"
                >
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input {...field} className={classes.input} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Input {...field} className={classes.input} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="thumbnail"
                    render={() => (
                      <FormItem>
                        <FormLabel>Thumbnail</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={thumbnailHandler}
                            className={classes.input}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex flex-col justify-center items-center mt-2">
                    {isPending ? (
                      <Button disabled>
                        <Oval
                          visible={true}
                          height="35"
                          width="35"
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
                    {isError && <p>Failed to upload video</p>}
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default EditVideo;
