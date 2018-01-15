const increaseScore = (state, action) => {
	const score = state.score + action.val;
	return action.val !== 0 ? Object.assign({}, state, { score }) : state;
}

const resetScore = (state) =>
	Object.assign({}, state, { score: 0 });

export { increaseScore, resetScore }
