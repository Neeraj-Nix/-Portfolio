import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title for the project.'],
      trim: true,
      maxlength: [100, 'Title cannot be more than 100 characters.'],
    },
    description: {
      type: String,
      required: [true, 'Please provide a description.'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Please provide a category.'],
      enum: ['Graphics', 'Videos'],
      default: 'Graphics',
    },
    mediaUrl: {
      type: String,
      required: [true, 'Please provide an image or video URL.'],
    },
    videoUrl: {
      type: String, // Optional, explicitly for video iframe/player link
    },
  },
  { timestamps: true }
);

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema);
