console.log = function() {};
const { expect } = require('chai');
const rewire = require('rewire');

describe('', function() {
  it('', function() {
    let appModule;
    try {
        appModule = rewire('../features/allRecipes/allRecipesSlice.js');
    } catch (e) {
        expect(true, 'Try checking your code again. You likely have a syntax error.').to.equal(false);
    }

    let varLearnerDeclares;
    let learnerVariableName = 'sliceOptions';
    try {
        varLearnerDeclares = appModule.__get__(learnerVariableName);
    } catch (e) {
        expect(true, `Did you declare \`${learnerVariableName}\``).to.equal(false);
    }
  	
    expect(varLearnerDeclares, 'Are you passing the `extraReducers` property to `createSlice`?').to.have.property('extraReducers')
    
    
    const extraReducers = varLearnerDeclares.extraReducers
    expect(extraReducers, 'Is `extraReducers` an object?').to.be.an('object')
   
    // Testing that extraReducers has the right properties     
    const actionTypeBase = 'allRecipes/getAllRecipes'
    expect(extraReducers, 'Did you add a reducer for the pending action type?').to.have.property(actionTypeBase + "/pending")
    expect(extraReducers, 'Did you add a reducer for the fulfilled action type?').to.have.property(actionTypeBase + "/fulfilled")
    expect(extraReducers, 'Did you add a reducer for the rejected action type?').to.have.property(actionTypeBase + "/rejected")
  
    // Pending reducer tests   
    const pending = extraReducers[actionTypeBase + "/pending"]
    expect(pending.length, 'Does your pending reducer accept two arguments?').to.equal(2)
    const pendingStateObj = {}
    pending(pendingStateObj, {})
    expect(pendingStateObj.isLoading, 'Does your pending reducer set `isLoading` to true?').to.equal(true)
    expect(pendingStateObj.hasError, 'Does your pending reducer set `hasError` to false?').to.equal(false)
    
    // Fulfilled reducer tests    
    const fulfilled = extraReducers[actionTypeBase + "/fulfilled"]
    expect(fulfilled.length, 'Does your fulfilled reducer accept two arguments?').to.equal(2)
    const fulfilledStateObj = {}
    fulfilled(fulfilledStateObj, {action: 'random', payload: ['one', 'two', 'three']})
    expect(fulfilledStateObj.isLoading, 'Does your fulfilled reducer set `isLoading` to false?').to.equal(false)
    expect(fulfilledStateObj.hasError, 'Does your fulfilled reducer set `hasError` to false?').to.equal(false)
    expect(fulfilledStateObj.recipes, 'Does your fulfilled reducer set `recipes` equal to `action.payload`?').to.be.an('array')
    expect(fulfilledStateObj.recipes.length, 'Does your fulfilled reducer set `recipes` equal to `action.payload`?').to.equal(3)

    // Rejected reducer tests     
    const rejected = extraReducers[actionTypeBase + "/rejected"]
    expect(rejected.length, 'Does your rejected reducer accept two arguments?').to.equal(2)
    const rejectedStateObj = {}
    rejected(rejectedStateObj, {})
    expect(rejectedStateObj.isLoading, 'Does your rejected reducer set `isLoading` to false?').to.equal(false)
    expect(rejectedStateObj.hasError, 'Does your rejected reducer set `hasError` to true?').to.equal(true)
  });
});