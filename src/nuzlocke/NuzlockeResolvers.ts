import Nuzlocke from './NuzlockeModel';
import User from '../user/UserModel';

const NuzlockeResolvers = {
  Query: {
    getNuzlockes: async (_: any, { userId }: any) =>
    {
      return await Nuzlocke
        .find({ user: userId })
        .populate('user')
        .populate({ path: 'game', populate: { path: 'region' } })
        .populate({ path: 'encounters', populate: { path: 'pokemon' } })
        .populate({ path: 'team.pokemon', model: 'pokemon' });
    },
    getNuzlocke: async (_: any, { id }: any) =>
    {
      return await Nuzlocke
        .findById(id)
        .populate('user')
        .populate({ path: 'game', populate: { path: 'region' } })
        .populate({ path: 'encounters.pokemon', model: 'pokemon' })
        .populate({ path: 'team.pokemon', model: 'pokemon' });
    }
  },
  Mutation: {
    createNuzlocke: async (_: any, { input }: any) =>
    {
      const nuzlocke = await Nuzlocke.create(input);
      await User.findByIdAndUpdate(input.user, { $push: { nuzlockes: nuzlocke._id } });
      return nuzlocke.populate({ path: 'game', populate: { path: 'region' } }).execPopulate();
    },
    updateEncounters: async (_: any, { id, input }: any) =>
    {
      const updatedNuzlocke = await Nuzlocke
        .findByIdAndUpdate(id, { $set: { encounters: input } }, { new: true })
        .populate({ path: 'game', populate: { path: 'region' } })
        .populate({ path: 'encounters.pokemon', model: 'pokemon' })
        .populate({ path: 'team.pokemon', model: 'pokemon' });;

      return updatedNuzlocke
    },
    updateTeam: async (_: any, { id, input }: any) =>
    {
      return await Nuzlocke
        .findByIdAndUpdate(id, { $set: { team: input } }, { new: true })
        .populate({ path: 'game', populate: { path: 'region' } })
        .populate({ path: 'encounters.pokemon', model: 'pokemon' })
        .populate({ path: 'team.pokemon', model: 'pokemon' });;
    },
  }
}

export default NuzlockeResolvers;