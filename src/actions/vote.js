import { nextCat } from './gif';

const voteApi = `http://thecatapi.com/api/images/vote?api_key=Mjc3MTAz`;

function genVoteUrl(imageId, score) {
  return `${voteApi}&image_id=${imageId}&score=${score}`;
}

function vote(imageId, score) {
  return fetch(genVoteUrl(imageId, score), { mode: 'no-cors' });
}
export function changeCat(catUrl, imageId) {
  return ({ type: 'CHANGE_CAT', catUrl, imageId });
}

export function love(dispatch) {
  return (imageId) => {
    dispatch(changeCat('', ''))
    vote(imageId, 10);
    nextCat(dispatch);
  }
}

export function hate(dispatch) {
  return (imageId) => {
    dispatch(changeCat('', ''));    
    vote(imageId, 1);
    nextCat(dispatch);
  }
}