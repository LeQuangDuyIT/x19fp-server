import asyncHandler from 'express-async-handler';

const homeSearch = asyncHandler(async (req, res) => {
  console.log('a');
});

const home = {
  homeSearch
};

export default home;
