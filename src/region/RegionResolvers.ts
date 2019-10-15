import Region from './RegionModel';

const RegionResolvers = {
  Query: {
    getRegions: async() => {
      return await Region.find();
    },
    getRegion: async (_ : any, { id } : { id: Number}) => {
      return await Region.findById(id);
    }
  }
}

export default RegionResolvers;