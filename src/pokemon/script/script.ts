
import mongoose from 'mongoose';

import Pokemon from '../PokemonModel';
import { pokemons } from './pokemons';

const uri = process.env.DATABASE_URI;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to database'))
  .catch(err => console.log(err));

pokemons.map((pokemon: { id: any; name: { english: any; }; type: any; base: any; }) =>
{
  return new Pokemon({
    id: pokemon.id,
    name: pokemon.name.english,
    type: pokemon.type,
    baseStats: {
      hp: pokemon.base.HP,
      attack: pokemon.base.Attack,
      defense: pokemon.base.Defense,
      specialAttack: pokemon.base['Sp. Attack'],
      specialDefense: pokemon.base['Sp. Defense'],
      speed: pokemon.base.Speed
    },
    image: `https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/${(('000' + pokemon.id).substr(-3))}.png`,
    sprite: `https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/sprites/${(('000' + pokemon.id).substr(-3))}MS.png`
  }).save();
})