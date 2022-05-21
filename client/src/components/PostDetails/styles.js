import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  media: {
    borderRadius: "20px",
    objectFit: "cover",
    width: "100%",
    float: "right",
    maxHeight: "350px",
    minHeight: "300px",
    [theme.breakpoints.down("lg")]: {
      height: "auto",
      marginBottom: "6em",
    },
    [theme.breakpoints.down("sm")]: {
      marginLeft: 0,
      minHeight: "200px",
    },
  },
  card: {
    display: "flex",
    width: "100%",
    marginBottom: "1em",
    [theme.breakpoints.down("md")]: {
      flexWrap: "wrap",
      flexDirection: "column",
      height: "auto",
      marginBottom: "5em",
    },
  },

  section: {
    borderRadius: "20px",
    margin: "10px",
    flex: 1,
  },
  imageSection: {
    marginLeft: "20px",
    [theme.breakpoints.down("sm")]: {
      marginLeft: 0,
    },
  },
  recommendedPosts: {
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  loadingPaper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    borderRadius: "15px",
    height: "39vh",
  },
  commentsOuterContainer: {
    display: "flex",
    justifyContent: "space-between",
    [theme.breakpoints.down("lg")]: {
      flexDirection: "column",
    },
  },
  title: {
    fontFamily: `"Rajdhani", sans-serif`,
    letterSpacing: "0.125rem",
  },
  message: {
    fontFamily: `"Rajdhani", sans-serif`,
    color: "rgba(15, 15, 15, 0.9)",
    letterSpacing: "0.05rem",
  },
  commentsInnerContainer: {
    height: "200px",
    overflow: "auto",
    marginRight: "30px",
  },
}));
