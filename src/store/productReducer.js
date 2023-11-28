
const start_datas = [ 
    {id: 1, title: 'Велосипед', count: 5}, 
    {id: 2, title: 'Самокат', count: 4}, 
    {id: 3, title: 'Гантели', count: 7}, 
    {id: 4, title: 'Ракетки', count: 1} 
];

const defaultState = JSON.parse(localStorage.getItem('product')) ?? start_datas

const INCR_COUNT = 'INCR_COUNT';
const DECR_COUNT = 'DECR_COUNT';
const ADD_TO_CART = 'ADD_TO_CART';
const MAX_COUNT = 25

export const productReducer = (state = defaultState, action) => {
    switch (action.type) {
        case INCR_COUNT:
            return state.map((product) =>
                product.id === action.payload
                    ? { ...product, count: Math.min(product.count + 1, MAX_COUNT) }
                    : product
            );
        case DECR_COUNT:
            return state
                .map((product) =>
                    product.id === action.payload
                        ? { ...product, count: Math.max(product.count - 1, 0) }
                        : product
                )
                .filter((product) => product.count > 0);
        case ADD_TO_CART:
            const newProduct = {
                id: state.reduce((maxId, product) => Math.max(product.id, maxId), 0) + 1,
                title: prompt('Введите имя товара'),
                count: 1,
            };
            return [...state, newProduct];
        default:
            return state;
    }
};

export const incrCountAction = (payload) => ({type: INCR_COUNT, payload});
export const decrCountAction = (payload) => ({type: DECR_COUNT, payload});
export const addToCartAction = () => ({type: ADD_TO_CART});
