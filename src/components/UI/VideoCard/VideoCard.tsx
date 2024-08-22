import LazyVideo from "./LazyVideo";
import classes from "./VideoCard.module.css";

function VideoCard() {
  let arr = [
    {
      name: "GLASSES",
      src: "/videos/glasses.mp4",
    },
    {
      name: "MAN",
      src: "/videos/man.mp4",
    },
    {
      name: "PHONES",
      src: "/videos/phone.mp4",
    },
    {
      name: "WOMEN",
      src: "/videos/woman.mp4",
    },
    {
      name: "KIDS",
      src: "/videos/kids.mp4",
    },
    {
      name: "FASHION",
      src: "/videos/fashion.mp4",
    },
    {
      name: "DOGS",
      src: "/videos/dogs.mp4",
    },
    {
      name: "CATS",
      src: "/videos/cat.mp4",
    },

    {
      name: "SPORT",
      src: "/videos/sport.mp4",
    },
  ];

  return (
    <div className={classes.container}>
      {arr.map((item, index) => {
        return (
          <div className={classes.list} key={index}>
            <LazyVideo src={item.src} />

            <div className={classes.absolute_wrapper}>
              <h1>{item.name}</h1>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default VideoCard;
