import React, { useContext } from 'react'
import { MovieDataType } from '../../assets/data';
import { MovieContext } from '../../context/movie-context';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import moviesIcon from '../../assets/icons/icon-category-movie.svg'
import TvSeriesIcon from '../../assets/icons/icon-nav-tv-series.svg';
import BookmarkIcon from '../icons/bookmark-icon';
import BookmarkEmptyIcon from '../icons/bookmark-empy-icon';

interface MovieCardProps{
	movie: MovieDataType
}

const MovieCard = ({ movie }: MovieCardProps) => {
	const { dispatch } = useContext(MovieContext);

	const handleToggleBookmark = (id: string) => {
		dispatch({type: "TOOGLE BOOKMARK", id});
	}
  return (
	<Card variant="outlined" sx={{bgcolor: "transparent", color: "#E0E0E0", my: 3, border: "none"}}>
		<CardContent sx={{ p:0, position: "relative" }}>
			<Grid container spacing={1}>
				<Grid item>
					<img src={movie.thumbnail.regular.large} alt="" style={{ width: "400px", height: "180px", borderRadius: "8px" }}/>
				</Grid>
				<Grid item xs={8}>
					<Grid container spacing={1} alignItems="center">
						<Grid item>
							<Typography fontSize={10} color="#E0E0E0" aria-label="year of movie">{movie.year}</Typography>
						</Grid>
						<Grid item>
							<Box sx={{ width: "4px", height: "4px", background: "#BDBDBD", borderRadius: "50%" }}/>
						</Grid>
						<Grid item>
							<img 
								src={movie.category === "Movies" ? moviesIcon : TvSeriesIcon} 
								alt="" 
								width={16}
								height={16}
							/>
						</Grid>
						<Grid item>
							<Typography fontSize={10} color="#E0E0E0" aria-label="movie category">{movie.category}</Typography>
						</Grid>
						<Grid item>
							<Box sx={{ width: "1rem", height: "1rem", bg: "#E0E0E0", borderRadius: "full" }}/>
						</Grid>
						<Grid item>
							<Typography fontSize={10} color="#E0E0E0" aria-label="movie rating">{movie.rating}</Typography>
						</Grid>
					</Grid>
					<Typography color="#E0E0E0" aria-label="movie title">{movie.title}</Typography>
					<Box style={{
					position: "absolute",
					top: 0,
					left: 0,
					right: 0,
					display: "flex",
					justifyContent: "flex-end",
					padding: "16px",
				}}>
					<Box
						sx={{
							p: "1rem",
							backgroundColor: "black",
							borderRadius: "100%",
							cursor: "pointer",
							"&: hover": {opacity: 0.8},
						}}
						onClick={() => handleToggleBookmark(movie.id)}
					>
						{movie.isBookmarked ? ( <BookmarkIcon fill={"#E0E0E0"} /> ) : ( <BookmarkEmptyIcon />)}
					</Box>
				</Box>
				</Grid>
			</Grid>
		</CardContent>
	</Card>
  )
}

export default MovieCard;