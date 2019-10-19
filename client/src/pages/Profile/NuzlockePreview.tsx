import React from 'react';

import styles from './Profile.module.css';
import { Tooltip, Position } from '@blueprintjs/core';

interface NuzlockePreviewProps
{
	nuzlocke: {
		_id: string;
		name: string;
		game: {
			name: string;
		};
		team: {
			pokemon: {
				_id: number;
				name: string;
				sprite: string;
			};
		}[];
	};
}

const NuzlockePreview = ({ nuzlocke }: NuzlockePreviewProps) =>
{
	return (
		<div className={ styles.NuzlockePreview }>
			{ nuzlocke.name && <h4>{ nuzlocke.name }</h4> }
			<span>Pokemon { nuzlocke.game.name }</span>
			<div className={ styles.TeamSprites }>
				{ nuzlocke.team.map(pokemon => (
					<Tooltip
						key={ pokemon.pokemon._id }
						content={ pokemon.pokemon.name }
						position={ Position.TOP }
					>
						<img src={ pokemon.pokemon.sprite } alt={ `${pokemon.pokemon.name}` } />
					</Tooltip>
				)) }
			</div>
		</div>
	);
};

export default NuzlockePreview;
