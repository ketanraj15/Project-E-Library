import React, {useState} from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography,TextField,Box } from '@material-ui/core/';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { Alert } from 'react-alert'
import { useDispatch } from 'react-redux';

import { likePost, deletePost } from '../../../actions/posts';
import useStyles from './styles';

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));

  const [key, setKey] = useState(null);
  // function to generate id from google drive URL
  function getIdFrom(url) {
    var id = "";
    var parts = url.split(/^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/);
    if (url.indexOf('?id=') >= 0){
       id = (parts[6].split("=")[1]).replace("&usp","");
       return id;
     } else {
     id = parts[5].split("/");
     //Using sort to get the id as it is the longest element. 
     var sortArr = id.sort(function(a,b){return b.length - a.length});
     id = sortArr[0];
     return id;
     }
   }
   // function to implement download functionality
  const onDownload = () => {
    // Creating a link with the file id
    const text1=getIdFrom(post.url);
    const text2="https://drive.google.com/uc?export=download&id=";
    const result = text2.concat(text1);

    const link = document.createElement("a");
    link.download = result;
    link.href = result;
    link.click();
  };
  function handleverify()
  {
    if(key===post.key)
    {
      onDownload();
      setKey(key);
    }
    else
    {
      alert("Invalid Download Key");
    }
  }


  return (
    <Card className={classes.card}>
      <CardMedia className={classes.media} image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title} />
      <div className={classes.overlay}>
        <Typography variant="h6">{post.name}</Typography>
        <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
      </div>
      {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
      <div className={classes.overlay2}>
        <Button onClick={() => setCurrentId(post._id)} style={{ color: 'white' }} size="small">
          <MoreHorizIcon fontSize="default" />
        </Button>
      </div>
      )}
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
      </div>
      <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.title}</Typography>
      <Box textAlign='center' display='block'>
      <TextField
        style={{
        paddingBottom: '5px',}}
        label="Enter Download key"
        variant="outlined"
        size='small'
        fullwidth='true'
        multiline={true}
        rows={1}
        onChange={(e)=>setKey(e.target.value)}
      ></TextField>
      <Button
        style={{heigth:'auto',
          width:'auto',
        padding: '5px',}}
        variant="contained"
        color="primary"
        position="relative"
        size='small'
        onClick={handleverify}
      >
        Download
      </Button>
      
    </Box>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" onClick={() => dispatch(likePost(post._id))}><ThumbUpAltIcon fontSize="small" /> Like {post.likeCount} </Button>
        {(user?.result?.googleId === post?.creator) && (
        <Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))}>
          <DeleteIcon fontSize="small" /> Delete
        </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;