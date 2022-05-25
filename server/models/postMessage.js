import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    title: String,
    url: String,
    name:String,
    creator: String,
    tags: [String],
    key:String,
    selectedFile: String,
    likeCount: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

var PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;