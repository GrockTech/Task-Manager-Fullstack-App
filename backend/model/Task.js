import mongoose from 'mongoose'

const taskSchema = mongoose.Schema({
subject: {
    type: String,
    required: true
},
task: {
    type: String,
    required: true
},
createdAt: {
    type: Date,
    default: Date.now,
  },

updatedAt: {
    type: Date,
    default: Date.now,
  },

}, )

taskSchema.pre('save', function (next) {
    // Update the updatedAt field before saving
    this.updatedAt = new Date();
    next();
  });


export default mongoose.model('task', taskSchema)

