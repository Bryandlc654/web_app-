import React, { useState, useEffect, useRef } from "react";
import "../css/productlist.css";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
const ProductList = ({ categoryId }) => {
  const [products, setProducts] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const sidebarRef = useRef(null);
  const [paymentMethod, setPaymentMethod] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://apis.nextboostperu.com/Florista/Productos/api.php");
        const data = await response.json();
        setProducts(data);
        setDataLoaded(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const filteredProducts = dataLoaded
    ? products.filter(
      (product) =>
        categoryId === 3 || !categoryId || product.IdCategoria == categoryId
    )
    : [];

  /*  const addToCart = (product) => {
     setCartItems((prevCartItems) => [...prevCartItems, product]);
     console.log(setCartItems, products)
   }; */

  const addToCart = (product) => {
    const existingItem = cartItems.find(
      (item) => item.Id_Producto === product.Id_Producto
    );
    if (existingItem) {
      setCartItems((prevCartItems) =>
        prevCartItems.map((item) =>
          item.Id_Producto === product.Id_Producto
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        )
      );
    } else {
      setCartItems((prevCartItems) => [
        ...prevCartItems,
        { ...product, cantidad: 1 },
      ]);
    }
  };
  const handleAddToCart = (product) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item.Id_Producto === product.Id_Producto
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      )
    );
  };

  const handleRemoveCartItem = (productId) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item.Id_Producto === productId && item.cantidad > 1
          ? { ...item, cantidad: item.cantidad - 1 }
          : item
      )
    );
  };
  const removeFromCart = (productId) => {
    setCartItems((prevCartItems) =>
      prevCartItems.filter((item) => item.Id_Producto !== productId)
    );
  };
  const toggleCart = () => {
    setShowCart(!showCart);
  };

  const totalItems = cartItems.length;/* length */

  const handleOutsideClick = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setShowCart(false);
    }
  };

  const generateInvoice = () => {
    const invoiceData = {
      items: cartItems.map((item) => ({
        name: item.Nombre,
        quantity: item.cantidad,
        price: item.Precio,
        total: item.Precio * item.cantidad,
      })),
      total: cartItems.reduce(
        (total, item) => total + item.Precio * item.cantidad,
        0
      ),
    };
    const invoiceContainer = document.createElement("div");
    invoiceContainer.innerHTML = `
    <div class="invoice-container">
      <h2 class="h2">Factura</h2>
      <table border="1">
      <thead>
          <tr>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Precio Unitario</th>
              <th>Precio Total</th>
          </tr>
      </thead>
      <tbody>
          ${invoiceData.items
        .map(
          (item) =>
            `<tr><td>${item.name}</td><td>${item.quantity}</td><td> S/${item.price}</td><td> S/${item.total}</td></tr>`
        )
        .join("")}
      </tbody>
  </table>
  
      <p className="total">Total: S/ ${invoiceData.total}</p>
      </div>
    `;

    document.body.appendChild(invoiceContainer);
    html2canvas(invoiceContainer).then((canvas) => {
      const pdf = new jsPDF();
      pdf.addImage(canvas.toDataURL("image/png"), "PNG", 10, 10, 190, 100);
      pdf.save("factura.pdf");
      document.body.removeChild(invoiceContainer);
    });
  };


  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };


  const calculateTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.precio * item.cantidad,
      0
    );
  };

  const handleConfirmOrder = () => {
    const orderDetails = {
      productos: cartItems
        .map((item) => `\n${item.Nombre} (Cantidad: ${item.cantidad})`),
      metodoPago: paymentMethod,
      total: cartItems.reduce(
        (total, item) => total + item.Precio * item.cantidad,
        0
      )
    };
    const message = `Hola, mi pedido es:\n\nProductos: ${orderDetails.productos}\nMétodo de Pago: ${orderDetails.metodoPago}\nTotal: S/${orderDetails.total}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappLink = `https://wa.me/+51968617217?text=${encodedMessage}`;
    window.open(whatsappLink, "_blank");
  };

  return (
    <div className="container__grid">
      <div className="product-list">
        {dataLoaded ? (
          filteredProducts.map((product) => (
            <div key={product.Id_Producto} className="product">
              <img src={product.Foto} alt={product.Nombre}></img>
              <span className="product__price">S/ {product.Precio}</span>
              {product.Nombre}
              <hr />
              <div className="container__buttons">
                <a
                  className="product__button"
                  onClick={() => addToCart(product)}
                >
                  <i className="bi bi-cart-plus"></i>Añadir al carrito
                </a>
              </div>
            </div>
          ))
        ) : (
          <p>Cargando productos...</p>
        )}
      </div>

      {/* Floating Cart Button */}
      {totalItems > 0 && (
        <div className="floating-cart-button" onClick={toggleCart}>
          <i className="bi bi-cart"></i>
          <span className="cart-item-count">{totalItems}</span>
        </div>
      )}

      {/* Sidebar Cart */}
      {showCart && (

        <div className="sidebar-cart">
          <svg className="svg-close" onClick={toggleCart} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" /></svg>
          <h2>Carrito de compras</h2>
          <ul>
            {cartItems.map((item) => (
              <li key={item.Id_Producto}>
                <img src={item.Foto} alt={item.Nombre} />
                <span>{item.Nombre}</span>
                <div>
                  <button
                    className="cart__item-button"
                    onClick={() => handleRemoveCartItem(item.Id_Producto)}
                  >
                    -
                  </button>
                  <p>{item.cantidad}</p>
                  <button
                    className="cart__item-button"
                    onClick={() => handleAddToCart(item)}
                  >
                    +
                  </button>
                </div>
                <span>S/ {item.Precio * item.cantidad}</span>
                <button onClick={() => removeFromCart(item.Id_Producto)}>
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
          <p>
            Total: S/{" "}
            {cartItems.reduce(
              (total, item) => total + item.Precio * item.cantidad,
              0
            )}
          </p>
          <div className="payment-methods">
            <h4>Métodos de Pago</h4>
            <ul>
              <li>
                <label className="name__input">
                  <input
                    className="efectivo_input"
                    type="radio"
                    name="paymentMethod"
                    value="efectivo"
                    checked={paymentMethod === "efectivo"}
                    onChange={() => handlePaymentMethodChange("efectivo")}
                  />
                  <img
                    className="efectivo_img"
                    /* src={efectivo} */
                    alt="Efectivo"
                  />
                </label>
              </li>
              <li>
                <label>
                  <input
                    className="yape_input"
                    type="radio"
                    name="paymentMethod"
                    value="yape"
                    checked={paymentMethod === "yape"}
                    onChange={() => handlePaymentMethodChange("yape")}
                  />
                  <img className="yape_img" /* src={yape}  */ alt="Yape" />
                </label>
              </li>
            </ul>
          </div>

          <button
            className="confirm-order-button"
            onClick={handleConfirmOrder}
          >
            Confirmar Compra
          </button>
          {showCart && (
            <div className="">
              {/* ... (contenido actual del carrito) */}
              <button onClick={generateInvoice}>Generar Factura PDF</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductList;
