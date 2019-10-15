import mongoose from 'mongoose';

import Region from '../RegionModel';
import { regions } from './regions';

require('dotenv').config();

const uri = process.env.DATABASE_URI;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to database'))
  .catch(err => console.log(err));

mongoose.set('useFindAndModify', false);

regions.map(region => {
  return new Region({
    _id: region._id,
    name: region.name,
    locations: region.locations.map(location => location.name)
  }).save()
})