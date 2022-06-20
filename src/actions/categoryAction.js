export const Filter_Category ='Filter_Category'
export const Sort_Category = 'Sort_Category'
export const Search_Category = 'Search_Category'

export function FilterCategory(FilterCategory,name){
    return {
        type: Filter_Category,
        payload: FilterCategory,
        cate:name
    }
}

export function SortCategory(SortCategory){
    return {
        type: Sort_Category,
        payload: SortCategory
    }
}

export function SearchCategory(SearchCategory){
    return {
        type: Search_Category,
        payload: SearchCategory
    }
}