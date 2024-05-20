import React, { SetStateAction, useContext, useState } from "react";
import Layout from "../../Layout";
import { Box, Paper, InputBase, InputAdornment, Typography } from "@mui/material";
import SearchIcon from '../../assets/icons/icon-search.svg';
import MovieList from "../../components/movie-list";
import MovieTrendList from "../../components/movie-list/movieTrendList";
import { MovieDataType } from "../../assets/data";
import { MovieContext } from "../../context/movie-context";

const Home = () => {
  const [search, setSearch] = useState("");
  const [searchList, setSearchList] = useState<MovieDataType[]>([]);
  const { state } = useContext(MovieContext);
  const { movies } = state;
  const trendingList = movies.filter((movie) => movie.isTrending);
  const recommendList = movies.filter((movie) => !movie.isTrending);

  const handleSearch = (e: { target: {value: SetStateAction<string>} }) => {
	setSearch(e.target.value);
	const newList = movies.filter((movie) => movie.title.toLowerCase().includes(search.toLowerCase()));
	setSearchList(newList);
  };

  const inputBaseComponent = () => (
		<InputBase
            placeholder="Search for movies or Tv series"
            value={
              search
            }
            sx={{
              ml: 1,
              flex: 1,
              color: "white",
              border: "none",
            }}
            onChange={handleSearch}
			startAdornment={
				<InputAdornment position="start">
					<img
						src={SearchIcon}
						alt="search icon"
						width={20}
						height={20}
					/>
				</InputAdornment>
			}
          />
	);

	const defaultMoviesComponent = () => (
		<Box width="100%">
			<Box width="100%">
				<Typography variant="h5" component="h1" my={6} fontWeight={400}>
					Trending
				</Typography>
				<MovieTrendList trendingList={trendingList} />
			</Box>
			<Box width="100%">
				<Typography variant="h5" component="h1" my={6} fontWeight={400}>
					Recommended For You
				</Typography>
				<MovieList recommendList={recommendList} />
			</Box>
		</Box>
	);

  return (
    <Layout>
      <Box>
        <Paper
          component="form"
          sx={{
            display: "flex",
            alignItems: "center",
            borderRadius: "default",
            p: 1,
            backgroundColor: "#10141f",
            border: "none",
          }}
        >
          {inputBaseComponent()}
        </Paper>
      </Box>
	  <Box py={2} px={4}>
		{search === "" ? (
			defaultMoviesComponent()
		) : (
			<Box width="100%">
				<Typography>
					Found {searchList.length} results for "{search}"{""}
				</Typography>
				<MovieList recommendList={searchList} />
			</Box>
		)}
	  </Box>
    </Layout>
  );
};

export default Home;
