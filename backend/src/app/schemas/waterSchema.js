import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/agua', { useNewUrlParser: true, useUnifiedTopology: true });

const waterData = new mongoose.Schema(
  {
    title: String,
    totalSpendMoney: Number,
    date: Date,
    tribute: Number,
    spent: {
      1: Number,
      2: Number,
      3: Number,
      4: Number,
      5: Number,
      6: Number,
      7: Number,
      8: Number,
      9: Number,
      10: Number,
      11: Number,
      12: Number,
      13: Number,
      14: Number,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('waterData', waterData);
