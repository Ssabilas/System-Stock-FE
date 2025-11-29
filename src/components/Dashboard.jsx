import React, { useState, useEffect } from 'react';
import { Home, Package, BarChart3, User, Plus, Trash2, Search, LogOut } from 'lucide-react';
import './Dashboard.css'; //Import dashboard style
import productsData from '../json/dataProducts.json'; //Import data dummy json
import AddProductModal from './newProducts'; //Import npage new products

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [activeNav, setActiveNav] = useState('home');
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard'); 

  useEffect(() => {
    setProducts(productsData);
  }, []);

  const totalProducts = products.length;
  const outOfStock = products.filter(p => p.stock === 0).length;
  const lowStock = products.filter(p => p.stock > 0 && p.stock <= 5).length;
  const inStock = products.filter(p => p.stock > 5).length;

  const handleAddProduct = (productId) => {
    console.log('Add product:', productId);
  };

  const handleDeleteProduct = (productId) => {
    setProducts(products.filter(p => p.id !== productId));
  };

  const handleLogout = () => {
    console.log(' Logout Click');
    console.log('Before clear:', localStorage.getItem('isLoggedIn'));
    
    localStorage.clear();
    
    console.log('After clear:', localStorage.getItem('isLoggedIn'));
    console.log('Redirecting to login...');
    
    window.location.href = '/';
  };

  const handleOpenAddProduct = () => {
    setShowAddProductModal(true);
  };

  const handleAddNewProduct = (newProduct) => {
    setProducts(prev => [...prev, newProduct]);
    setShowAddProductModal(false);
    console.log('New product added:', newProduct);
  };

  // Fungsi untuk navigasi
  const handleNavigation = (nav) => {
    setActiveNav(nav);
    if (nav === 'profile') {
      setCurrentView('profile');
    } else {
      setCurrentView('dashboard');
    }
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="logo-container">
            <div className="logo-icon">
              <Package className="icon" />
            </div>
            <span className="logo-text">Name Market</span>
          </div>
        </div>

        <div className="user-profile">
          <div className="profile-content">
            <img 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop" 
                alt="Profile" 
                className="avatar"
              />
            <div className="user-info">
              <div className="user-name">Admin</div>
              <div className="user-role">Pemilik Gudang</div>
            </div>
          </div>
        </div>

        <div className="action-buttons">
          <button className="btn-action">Export Stock</button>
          <button className="btn-action">Import Stock</button>
          <button className="btn-action btn-primary" onClick={handleOpenAddProduct}>
            Add New Product
          </button>
          <button className="btn-action" onClick={handleLogout}>
            <LogOut className="icon-sm" style={{marginRight: '6px'}} />
            Logout
          </button>
        </div>

        <div className="bottom-nav">
          <button 
            className={`nav-item ${activeNav === 'home' ? 'active' : ''}`}
            onClick={() => handleNavigation('home')}
          >
            <Home className="nav-icon" />
            <span className="nav-label">Home</span>
          </button>
          <button 
            className={`nav-item ${activeNav === 'stock' ? 'active' : ''}`}
            onClick={() => handleNavigation('stock')}
          >
            <Package className="nav-icon" />
            <span className="nav-label">Stock</span>
          </button>
          <button 
            className={`nav-item ${activeNav === 'analytics' ? 'active' : ''}`}
            onClick={() => handleNavigation('analytics')}
          >
            <BarChart3 className="nav-icon" />
            <span className="nav-label">Analytics</span>
          </button>
          <button 
            className={`nav-item ${activeNav === 'profile' ? 'active' : ''}`}
            onClick={() => handleNavigation('profile')}
          >
            <User className="nav-icon" />
            <span className="nav-label">Profile</span>
          </button>
        </div>
      </div>

      <div className="main-content">
        {currentView === 'dashboard' ? (
          // Tampilan Dashboard
          <>
            <div className="content-header">
              <h1 className="page-title">Stock Management</h1>
            </div>

            <div className="search-section">
              <h2 className="section-title">Search Products</h2>
              <div className="search-container">
                <Search className="search-icon" />
                <input
                  type="text"
                  placeholder="Search by products name..."
                  className="search-input"
                />
              </div>
            </div>

            <div className="overview-section">
              <div className="overview-card">
                <h3 className="card-title">Stock Overview</h3>
                <p className="card-subtitle">Current Stock Status</p>
                <div className="stats-grid">
                  <div className="stat-item">
                    <div className="stat-label">Total Products</div>
                    <div className="stat-value">{totalProducts}</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-label">Out of Stock</div>
                    <div className="stat-value">{outOfStock}</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-label">Low Stock</div>
                    <div className="stat-value">{lowStock}</div>
                  </div>
                </div>
              </div>

              <div className="overview-card">
                <h3 className="card-title">Current Stock Overview</h3>
                <p className="card-subtitle">Latest insights into stock levels</p>
                <div className="stats-grid">
                  <div className="stat-item">
                    <div className="stat-label">Total Products</div>
                    <div className="stat-value">{totalProducts}</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-label">Products Low in St.</div>
                    <div className="stat-value">{lowStock}</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-label">In Stock</div>
                    <div className="stat-value">{inStock}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="products-section">
              <h2 className="section-title">Available Products</h2>
              <div className="products-grid">
                {products.map((product) => (
                  <div key={product.id} className="product-card">
                    <div className="product-category">Category: {product.category}</div>
                    <div className="product-image">
                      <img src={product.image} alt={product.name} />
                    </div>
                    <div className="product-info">
                      <h4 className="product-name">{product.name}</h4>
                      <p className="product-price">${product.price}</p>
                      <p className={`product-stock ${product.stock === 0 ? 'out-of-stock' : product.stock <= 5 ? 'low-stock' : ''}`}>
                        In Stock: {product.stock}
                      </p>
                    </div>
                    <div className="product-actions">
                      <button 
                        className="btn-icon"
                        onClick={() => handleAddProduct(product.id)}
                      >
                        <Plus className="icon-sm" />
                      </button>
                      <button 
                        className="btn-icon btn-danger"
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        <Trash2 className="icon-sm" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          // Tampilan Profile
          <Profile />
        )}
      </div>

      <AddProductModal
        isOpen={showAddProductModal}
        onClose={() => setShowAddProductModal(false)}
        onAddProduct={handleAddNewProduct}
      />
    </div>
  );
}