import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  Grid,
  Grow,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import FileBase from "react-file-base64";

import useStyles from "./styles";
import { createPost, updatePost } from "../../actions/posts";

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    title: "",
    url: "",
    tags: "",
    selectedFile: "",
    key: "",
  });
  const post = useSelector((state) =>
    currentId ? state.posts.find((message) => message._id === currentId) : null
  );
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("profile"));
  useEffect(() => {
    if (post) setPostData(post);
  }, [post]); // here writing post in square braces this means whenever there is a change in post, this function will be called)

  const clear = () => {
    setCurrentId(0);
    setPostData({ title: "", url: "", tags: "", selectedFile: "", key: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createPost({ ...postData, name: user?.result?.name }));
      clear();
    } else {
      dispatch(
        updatePost(currentId, { ...postData, name: user?.result?.name })
      );
      clear();
    }
  };
  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="body1" align="center">
          Please Sign In to Upload your class Material.
        </Typography>
      </Paper>
    );
  }

  return (
      <Grow in>
          <Paper
      style={{ marginTop: "30px", marginLeft: 20, marginRight: 20 }}
      className={classes.paper}
      textAlign="center"
    >
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentId ? `Editing Uploaded Material` : "Upload Material"}
        </Typography>
        <TextField
          size="small"
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          size="small"
          name="url"
          variant="outlined"
          label="Url (Attach Google drive link)"
          fullWidth
          multiline
          rows={1}
          value={postData.url}
          onChange={(e) => setPostData({ ...postData, url: e.target.value })}
        />
        <TextField
          size="small"
          name="tags"
          variant="outlined"
          label="Tags (coma separated)"
          fullWidth
          value={postData.tags}
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(",") })
          }
        />
        <TextField
          size="small"
          name="key"
          variant="outlined"
          label="Enter Key"
          fullWidth
          value={postData.key}
          onChange={(e) => setPostData({ ...postData, key: e.target.value })}
        />
        <Typography variant="body2">Upload Display Photo</Typography>
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Grid>
          <Button
            size="small"
            className={classes.buttonSubmit}
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
          >
            Submit
          </Button>
          </Grid>
          <Grid>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={clear}
            fullWidth
          >
            Clear
          </Button>
        </Grid>
      </form>
    </Paper>
      </Grow>
    
  );
};

export default Form;
