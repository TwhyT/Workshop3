import { Filter_Category, Search_Category, Sort_Category } from "../actions/categoryAction";

const initiastate = {
    search: [],
    category: [],
    sort_price: 'asc',
    categoryname: []
}

export function categoryReducer (state = initiastate, action){
    switch (action.type) {
        case Filter_Category:
            console.log("CheckRedux",state);
            return{
                ...state,
                category: action.payload,
                categoryname: action.cate,
                search: null
            }
        case Sort_Category:
            console.log("CheckRedux",state);
            return{
                ...state,
                sort_price: action.payload
            }
        case Search_Category:
            console.log("CheckRedux",state);
            return{
                ...state,
                category: null,
                categoryname:[],
                search: action.payload
            }
    
        default:
            return state
    }
}