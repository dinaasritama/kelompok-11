import React, { useState } from 'react';
import './TransactionPage.css';

function TransactionPage({ onFinishTransaction, onBack }) {
  const [products, setProducts] = useState([{ name: '', quantity: 0, price: 0 }]);
  const [subtotal, setSubtotal] = useState(0);

  const handleProductChange = (index, field, value) => {
    const newProducts = [...products];
    newProducts[index][field] = value;

    if (field === 'quantity' || field === 'price') {
      const quantity = parseFloat(newProducts[index].quantity) || 0;
      const price = parseFloat(newProducts[index].price) || 0;
      newProducts[index].total = quantity * price;
    }

    setProducts(newProducts);
    calculateSubtotal(newProducts);
  };

  const calculateSubtotal = (products) => {
    const total = products.reduce((acc, product) => acc + (product.total || 0), 0);
    setSubtotal(total);
  };

  const addProduct = () => {
    setProducts([...products, { name: '', quantity: 0, price: 0 }]);
  };

  const handleFinish = () => {
    onFinishTransaction(products, subtotal);
  };

  return (
    <div className="transaction-page">
      <h1>Halaman Transaksi Penjualan</h1>
      
      {/* Container for the table */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Produk</th>
              <th>Jumlah</th>
              <th>Harga per Unit (Rp)</th>
              <th>Total (Rp)</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="text"
                    value={product.name}
                    onChange={(e) => handleProductChange(index, 'name', e.target.value)}
                    placeholder="Nama Produk"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={product.quantity}
                    onChange={(e) => handleProductChange(index, 'quantity', e.target.value)}
                    placeholder="Jumlah"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={product.price}
                    onChange={(e) => handleProductChange(index, 'price', e.target.value)}
                    placeholder="Harga"
                  />
                </td>
                <td>
                  {product.total ? `Rp ${product.total.toLocaleString()}` : 'Rp 0'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Subtotal section above Add Product button */}
      <div className="subtotal">
        <strong>Subtotal: </strong> Rp {subtotal.toLocaleString()}
      </div>
      
      {/* Button section moved outside of the table container */}
      <button onClick={addProduct} className="add-product-button">Tambah Produk</button>
      
      {/* Buttons placed outside the table container */}
      <div className="button-container">
        <button onClick={handleFinish} className="finish-button">Selesai & Bayar</button>
        <button onClick={onBack} className="back-button">Kembali</button>
      </div>
    </div>
  );
}

export default TransactionPage;
