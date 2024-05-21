import classes from "./Create.module.css";
import createVideo from "@/assets/createVideo.png";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
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
import { useNavigate } from "react-router-dom";
import { uploadAVideoQuery } from "@/lib/react-query/queriesAndMutation";
import { uploadVideoFormType } from "@/types";
import ReactPlayer from "react-player";

const FormSchema = z.object({
  title: z.string().min(1, {
    message: "title must be at least 1 characters.",
  }),
  description: z.string().min(2, {
    message: "username must be at least 2 characters.",
  }),
  videoFile: z.any(),
  thumbnail: z.any(),
});

function Create() {
  const [videoFile, setVideoFile] = useState<File | undefined>();
  const [thumbnail, setThumbnail] = useState<File | "">();
  const [videoData, setVideoData]: any = useState();

  const navigate = useNavigate();
  // const navigate = useNavigate();

  const {
    mutateAsync: uploadVideo,
    isError,
    isPending,
  } = uploadAVideoQuery();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const videoFileHandler = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    };
    setVideoFile(target.files[0]);
  };
  const thumbnailHandler = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    };
    setThumbnail(target.files[0]);
  };

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const video_data: uploadVideoFormType = {
      videoFile,
      thumbnail,
      title: data.title,
      description: data.description,
    };

    const response = await uploadVideo(video_data);
    if (!response) {
      throw new Error("Unable to register");
    }
    setVideoData(response);
    form.reset();
  }

  return (
    <>
      <div className={classes.main}>
        <img src={createVideo} alt="remoteImage"></img>
        <p className="text-black mt-3">Create content on any device</p>
        <p className="mt-1">Upload and record at home or on the go.</p>
        <p>Everything you make public will appear here.</p>

        <Dialog>
          <DialogTrigger asChild>
            <button className={classes.button}>Create</button>
          </DialogTrigger>

          <DialogContent className={classes.dialog}>
            <div>
              <div className={classes.dialogHeader}>
                <h1 className="font-bold">
                  {videoData ? "Preview" : "Upload Video"}
                </h1>
              </div>
              {!videoData && (
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
                              <Input
                                placeholder="Enter title for your video"
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
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="description"
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
                      <FormField
                        control={form.control}
                        name="videoFile"
                        render={() => (
                          <FormItem>
                            <FormLabel>Video</FormLabel>
                            <FormControl>
                              <Input
                                type="file"
                                accept="video/*"
                                onChange={videoFileHandler}
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
                        {isError && <p>Failed to upload video</p>}
                      </div>
                    </form>
                  </Form>
                </div>
              )}
              {videoData && (
                <div className={classes.dialogContent}>
                  <div className={classes.preview}>
                    <ReactPlayer
                      url={videoData.videoFile}
                      light={videoData.thumbnail}
                      playing
                      controls
                      width={"70%"}
                      className={classes.previewVideo}
                    />
                    <div className={classes.previewContent}>
                      <p className={classes.title}>{videoData.title}</p>
                      <p className={classes.desc}>{videoData.description}</p>
                    </div>
                    <Button
                      onClick={() => {
                        setVideoData("");
                        navigate("/userChannel");
                      }}
                    >
                      done
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}

export default Create;
