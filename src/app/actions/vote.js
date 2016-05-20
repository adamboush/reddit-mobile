//import { endpoints } from '@r/api-client';

//import { apiOptionsFromState } from 'lib/apiOptionsFromState';
import { receivedResponse } from './apiResponse';

// const { VoteEndpoint } = endpoints;
export const makeFakeResponse = async (id, direction, state) => {
  const type = id.indexOf('t1') === 0 ? 'comments' : 'posts';
  const oldThing = state[type][id];

  return {
    [type]: {
      [id]: {
        ...oldThing,
        likes: direction,
        score: oldThing.score + (direction - oldThing.likes),
      },
    },
  };
};

export const VOTING = 'VOTING';
export const VOTED = 'VOTED';
export const VOTE = 'VOTE';

export const voting = (id, direction) => ({ type: VOTING, id, direction });
export const voted = (id, direction) => ({ type: VOTED, id, direction });
export const vote = (id, direction) => async (dispatch, getState) => {
  const state = getState();

  dispatch(voting(id, direction));

  //const apiResponse = await VoteEndpoint.post(apiOptionsFromState(state), { id, direction });
  const apiResponse = await makeFakeResponse(id, direction, state);

  dispatch(receivedResponse(apiResponse));
  dispatch(voted(id, direction));
};
