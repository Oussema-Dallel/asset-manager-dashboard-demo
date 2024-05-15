import { type FunctionComponent, type ReactElement } from 'react';
import { ImageList, ImageListItem } from '@mui/material';

interface ImageListingProps {
	readonly assetName: string;
	readonly colNumer: number;
	readonly images: string[];
}

const ImageListing: FunctionComponent<ImageListingProps> = ({ images, assetName, colNumer }): ReactElement => {
	return (
		<ImageList
			cols={ colNumer }
			rowHeight={ 164 }
			sx={{ maxWidth: 500, maxHeight: 450 }}
		>
			{ images.map((item) => (
				<ImageListItem key={ item }>
					<img
						alt={ `${assetName}-image` }
						loading="lazy"
						src={ `${item}?w=164&h=164&fit=crop&auto=format` }
						srcSet={ `${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x` }
					/>
				</ImageListItem>
			)) }
		</ImageList>
	);
};

export { ImageListing };