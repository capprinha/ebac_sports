import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from '../store'
import { addItem, removeItem, clearCart } from '../store/cartSlice'
import { useGetProductsQuery } from '../store/api'

const ProductList = () => {
  const { data: products, isLoading, error } = useGetProductsQuery()
  const dispatch = useDispatch<AppDispatch>()
  const cartItems = useSelector((state: RootState) => state.cart.items)

  if (isLoading) return <div>Carregando produtos...</div>
  if (error) return <div>Erro ao carregar produtos.</div>

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)

  return (
    <div>
      <h2>Produtos</h2>
      <ul>
        {products?.map(product => (
          <li key={product.id} style={{ marginBottom: 10 }}>
            <b>{product.title}</b> - R$ {product.price.toFixed(2)}{' '}
            <button
              onClick={() =>
                dispatch(
                  addItem({ id: product.id, name: product.title, price: product.price, quantity: 1 })
                )
              }
            >
              Adicionar ao carrinho
            </button>
          </li>
        ))}
      </ul>

      <h2>Carrinho</h2>
      {cartItems.length === 0 && <div>Carrinho vazio.</div>}
      <ul>
        {cartItems.map(item => (
          <li key={item.id}>
            {item.name} x {item.quantity} = R$ {(item.price * item.quantity).toFixed(2)}{' '}
            <button onClick={() => dispatch(removeItem(item.id))}>Remover</button>
          </li>
        ))}
      </ul>

      {cartItems.length > 0 && (
        <>
          <h3>Total: R$ {total.toFixed(2)}</h3>
          <button onClick={() => dispatch(clearCart())}>Limpar Carrinho</button>
        </>
      )}
    </div>
  )
}

export default ProductList