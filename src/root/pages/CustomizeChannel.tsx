import { useContext, useEffect, useRef, useState } from "react";
import classes from "./CutomizeChannel.module.css";
import { userContext } from "@/context/Context";
import { Link } from "react-router-dom";
import { updateAccountDetailsQuery, updateUserAvatarQuery, updateUserCoverImageQuery } from "@/lib/react-query/queriesAndMutation";
import { useToast } from "@/components/ui/use-toast";

function CustomizeChannel() {
  const [nav, setNav] = useState("basicInfo");

  //replace ref with state to listen to every change
  const { user, setUser } = useContext(userContext);
  const username = useRef<HTMLInputElement>(null);
  const handle = useRef<HTMLInputElement>(null);
  const description = useRef<HTMLTextAreaElement>(null);
  const email = useRef<HTMLInputElement>(null);

  //banner
  const [avatar,setAvatar] =useState<File|''>('');
  const [coverImage , setCoverImage]=useState<File|''>('');

  //query

  const {
    mutateAsync: updateAccountDetails,
    data: updatedUserInfo,
  } = updateAccountDetailsQuery();

  const {
    mutateAsync: updateAvatar,
    data: updatedUserAvatar,
  } = updateUserAvatarQuery();

  const {
    mutateAsync: updateCoverImage,
    data: updatedUserCoverImage,
  } = updateUserCoverImageQuery();

  //notification
  const { toast } = useToast();

  useEffect(() => {
    if (updatedUserInfo) {
      toast({
        description: "Your profile information has been updated.",
      });
      setUser(updatedUserInfo);
    }

    else if(updatedUserAvatar && updatedUserCoverImage){
      toast({
        description: "Your banner has been updated.",
      });
      setUser(updatedUserCoverImage);
    }

    else if(updatedUserAvatar){
      toast({
        description: "Your Avatar has been updated.",
      });
      setUser(updatedUserAvatar);
    }
   else if(updatedUserCoverImage){
      toast({
        description: "Your CoverImage has been updated.",
      });
      setUser(updatedUserCoverImage);
    }

  }, [updatedUserInfo,updatedUserAvatar , updatedUserCoverImage]);


  const clearHandler = () => {
    if (nav === "basicInfo") {
      if (username.current) {
        username.current.value = user.username;
      }
      if (handle.current) {
        handle.current.value = user.fullName;
      }
      if (description.current) {
        description.current.value = user.description;
      }
      if (email.current) {
        email.current.value = user.email;
      }
    }
    if(nav==='branding'){
      setAvatar('');
      setCoverImage('');
    }
  };

  const publishHandler = () => {
    if (nav === "basicInfo") {
      if (
        username.current?.value ||
        handle.current?.value ||
        description.current?.value ||
        email.current?.value
      ) {
        const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
        if (email.current?.value) {
          if (!email.current.value.match(isValidEmail)) {
            email.current.value = "wrong email";
            return;
          }
        }

        const userInfo = {
          username: username.current?.value
            ? username.current.value
            : user.username,
          fullName: handle.current?.value
            ? handle.current.value
            : user.fullName,
          description: description.current?.value
            ? description.current.value
            : user.description,
          email: email.current?.value ? email.current.value : user.email,
        };

        //send this basic info to backend
        updateAccountDetails(userInfo);
      }
    }
    if(nav==="branding"){
              if(avatar!='' && coverImage!=''){
                updateAvatar(avatar)
                updateCoverImage(coverImage)
              }
              else if(avatar!=''){
                    updateAvatar(avatar)
              }
              else if(coverImage!=''){
                console.log("here")
                        updateCoverImage(coverImage)
              }
    }


  };

  // handling branding information
  const avatarChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    };

    setAvatar(target.files[0]);
  };

  const coverImageChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    };

    setCoverImage(target.files[0]);
  };

  return (
    <div className={classes.main}>
      <h1 className=" text-base lg:text-2xl ml-4 font-[500]">Channel Customization</h1>
      <nav className="lg:mt-3 w-[100%]">
        <ul className="flex flex-col lg:flex-row mt-2 lg:mt-3 justify-between w-[100%] lg:pl-3 lg:pr-3 border-b-2 border-gray-200">
          <div className=" flex gap-2 lg:gap-8 ">
            <li
              onClick={() => setNav("basicInfo")}
              className={`${
                nav === "basicInfo" &&
                "border-b-4 border-blue-600 text-blue-600"
              } lg:p-2 cursor-pointer text-xs lg:text-sm`}
            >
              Basic info
            </li>
            <li
              onClick={() => setNav("branding")}
              className={`${
                nav === "branding" && "border-b-4 border-blue-600 text-blue-600"
              } lg:p-2 cursor-pointer text-xs lg:text-sm`}
            >
              Branding
            </li>
          </div>
          <div className="flex gap-2 lg:gap-5 p-1 lg:p-2">
            <li className="">
              <Link to="/userChannel" className="text-blue-600 text-xs lg:text-sm ">
                VIEW CHANNEL
              </Link>
            </li>
            <li className="">
              <button onClick={clearHandler} className="text-gray-500  text-xs lg:text-sm ">
                CANCEL
              </button>
            </li>
            <li className="bg-blue-600 rounded">
              <button
                onClick={publishHandler}
                className=" pl-2 pr-2 pt-1 pb-1 text-white  text-xs lg:text-sm "
              >
                PUBLISH
              </button>
            </li>
          </div>
        </ul>
      </nav>

      <div className={classes.content}>
        {nav === "basicInfo" && (
          <div className={classes.basicInfo}>
            <div className={classes.field}>
              <label htmlFor="name" className="text-xs lg:text-base">Name</label>
              <p  className="text-xs lg:text-base">Choose a channel name that represents you and your content.</p>
              <input
                type="text"
                name="name"
                defaultValue={user.username}
                ref={username}
                className="text-xs lg:text-base"
              />
            </div>
            <div className={classes.field}>
              <label htmlFor="handle"  className="text-xs lg:text-base">Handle</label>
              <p  className="text-xs lg:text-base">Choose your unique handle by adding letters and numbers</p>
              <input
                type="text"
                name="handle"
                defaultValue={user.fullName}
                ref={handle}
                className="text-xs lg:text-base"
              />
            </div>
            <div className={classes.field}>
              <label htmlFor="description"  className="text-xs lg:text-base">Description</label>
              <textarea
                name="description"
                placeholder="Tell viewers about your channel.Your description will appear in the About section of your channel and search results , among other places."
                ref={description}
                defaultValue={user.description}
                className="text-xs lg:text-base"
              />
            </div>
            <div className={classes.field}>
              <label htmlFor="contact"  className="text-xs lg:text-base">Contact info</label>
              <p  className="text-xs lg:text-base">
                Let people know how to contact you with business inquiries. The
                email address you enter may appear in the About section of your
                channel and be visible to viewers.
              </p>
              <input
                type="email"
                name="contact"
                defaultValue={user.email}
                ref={email}
                className="text-xs lg:text-base"
              />
            </div>
          </div>
        )}
        {nav === "branding" && (
          <div className={classes.branding}>
            <div className={classes.avatar}>
              <h1 className="text-base lg:text-xl ">Picture</h1>
              <p className="text-xs lg:text-sm text-gray-400">
                Your profile picture will appear where your channel is presented
                on YouTube, like next to your videos and comments
              </p>
              <div className="flex flex-col lg:flex-row gap-10 mt-2">
                <div className="flex-[35%] bg-gray-100 flex justify-center items-center min-h-40">
                  <img
                    className={classes.avatarImg}
                    src={updatedUserAvatar?updatedUserAvatar.avatar:user.avatar}
                    alt="remoteImage"
                  />
                </div>
                <div className="flex-[65%]">
                  <p className="text-xs lg:text-sm text-gray-400">
                    It's recommended to use a picture that's at least 98 x 98
                    pixels and 4MB or less. Use a PNG or GIF (no animations)
                    file. Make sure your picture follows the YouTube Community
                    Guidelines.
                  </p>

                  {/*  only upload text shown
                  <label className="cursor-pointer relative" htmlFor="image">
                  Upload
                    <input type="file" className="absolute opacity-0 top-0 left-0 opacity-1 w-12 h-1"  accept="image/png, image/jpg" name ="image"/>
                    </label>  */}

                  <input
                    type="file"
                    accept="image/png, image/jpg"
                    name="avatarImage"
                    onChange={avatarChangeHandler}
                    className="text-xs lg:text-sm w-[90%] lg:w-[100%]"
                  />
                </div>
              </div>
            </div>

            <div className={classes.coverImage}>
              <h1 className="text-base lg:text-xl">Banner image</h1>
              <p className="text-xs lg:text-sm text-gray-400">
                This image will appear across the top of your channel
              </p>
              <div className="flex flex-col lg:flex-row gap-10 mt-2">
                <div className="flex-[35%] bg-gray-200 flex justify-center items-center min-h-40">
                  <img
                    className="w-[100%] h-[100%]"
                    src={user?.coverImage}
                    alt="No cover Image"
                  />
                </div>
                <div className="flex-[65%]">
                  <p className="text-xs lg:text-sm text-gray-400">
                    For the best results on all devices, use an image that's at
                    least 2048 x 1152 pixels and 6MB or less.
                  </p>
                  <input
                    type="file"
                    accept="image/png, image/jpg"
                    name="coverImage"
                    onChange={coverImageChangeHandler}
                    className="text-xs lg:text-sm  w-[90%] lg:w-[100%]"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CustomizeChannel;
