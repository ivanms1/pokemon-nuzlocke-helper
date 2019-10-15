import Nuzlocke from './NuzlockeModel';

const NuzlockeResolvers = {
  Query: {
    getNuzlockes: async (_: any, { userId }: any) =>
    {
      return await Nuzlocke
        .find({ user: userId })
        .populate({ path: 'game', populate: { path: 'region' } })
        .populate({ path: 'encounters', populate: { path: 'pokemon' } });
    },
    getNuzlocke: async (_: any, { id }: any) =>
    {
      return await Nuzlocke
        .findById(id)
        .populate({ path: 'game', populate: { path: 'region' } })
        .populate({ path: 'encounters.pokemon', model: 'pokemon' });
    }
  },
  Mutation: {
    createNuzlocke: async (_: any, { input }: any) =>
    {
      const nuzlocke = await Nuzlocke.create(input);
      return nuzlocke.populate({ path: 'game', populate: { path: 'region' } });
    },
    updateEncounters: async (_: any, { id, input }: any) =>
    {
      const updatedNuzlocke = await Nuzlocke
        .findByIdAndUpdate(id, { $set: { encounters: input } }, { new: true })
        .populate({ path: 'game', populate: { path: 'region' } });

      return updatedNuzlocke
    },
    updateTeam: async (_: any, { id, input }: any) =>
    {
      return await Nuzlocke
        .findByIdAndUpdate(id, { $set: { team: input } }, { new: true })
        .populate({ path: 'game', populate: { path: 'region' } });
    },
  }
}

export default NuzlockeResolvers;