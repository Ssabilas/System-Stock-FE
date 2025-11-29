import React, { useState } from 'react';
import { X, Upload } from 'lucide-react'; 
import './newProducts.css'; //Import new product style

const AddProductModal = ({ isOpen, onClose, onAddProduct }) => {
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    stock: '',
    price: '',
    description: '',
    image: ''
  });

  const [imagePreview, setImagePreview] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validasi ukuran file (5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }
      
      // Validasi tipe file
      if (!file.type.match('image/(png|jpeg|jpg)')) {
        alert('Only PNG and JPG images are allowed');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setNewProduct(prev => ({
          ...prev,
          image: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const productWithId = {
      ...newProduct,
      id: Date.now(),
      price: parseFloat(newProduct.price),
      stock: parseInt(newProduct.stock)
    };

    onAddProduct(productWithId);
    handleClose();
  };

  const handleClose = () => {
    setNewProduct({
      name: '',
      category: '',
      stock: '',
      price: '',
      description: '',
      image: ''
    });
    setImagePreview('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">Add New Product</h2>
          <button className="close-button" onClick={handleClose}>
            <X className="icon-sm" /> 
          </button>
        </div>

        <form onSubmit={handleSubmit} className="product-form">
          {/* Product Name Section */}
          <div className="form-section">
            <h3 className="section-title">Product Name</h3>
            <input
              type="text"
              name="name"
              value={newProduct.name}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Enter product name"
              required
            />
          </div>

          {/* Category and Details Section */}
          <div className="form-section">
            <h3 className="section-title">Category</h3>
            <select
              name="category"
              value={newProduct.category}
              onChange={handleInputChange}
              className="form-input"
              required
            >
              <option value="">Select category</option>
              <option value="Electronics">Electronics</option>
              <option value="Furniture">Furniture</option>
              <option value="Kitchenware">Kitchenware</option>
              <option value="Clothing">Clothing</option>
              <option value="Books">Books</option>
              <option value="Sports">Sports</option>
            </select>
            
            <div className="details-grid">
              <div className="detail-group">
                <label className="detail-label">Stock Quantity</label>
                <input
                  type="number"
                  name="stock"
                  value={newProduct.stock}
                  onChange={handleInputChange}
                  className="detail-input"
                  placeholder="0"
                  min="0"
                  required
                />
              </div>
              <div className="detail-group">
                <label className="detail-label">Price</label>
                <input
                  type="number"
                  name="price"
                  value={newProduct.price}
                  onChange={handleInputChange}
                  className="detail-input"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="form-section">
            <h3 className="section-title">Description</h3>
            <textarea
              name="description"
              value={newProduct.description}
              onChange={handleInputChange}
              className="form-textarea"
              placeholder="Enter product description"
              rows="4"
            />
          </div>

          {/* Product Image Section */}
          <div className="form-section">
            <h3 className="section-title">Product Image</h3>
            <div className="image-upload-container">
              <input
                type="file"
                id="image-upload"
                accept="image/png, image/jpeg, image/jpg"
                onChange={handleImageChange}
                className="image-upload-input"
              />
              <label htmlFor="image-upload" className="image-upload-label">
                <Upload className="upload-icon" />
                <span className="upload-text">Upload Image</span>
                <span className="upload-subtext">PNG, JPG up to 5MB</span>
              </label>
              
              {imagePreview && (
                <div className="image-preview">
                  <img src={imagePreview} alt="Preview" className="preview-image" />
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={handleClose}>
              Cancel
            </button>
            <button type="submit" className="btn-save">
              Save Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;