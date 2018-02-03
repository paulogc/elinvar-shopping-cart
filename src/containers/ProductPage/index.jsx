import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ProductDescriptionGrid from '../../components/ProductDescriptionGrid';
import InputText from '../../components/InputText';

import { fetchProducts, addToCart } from './actions';

import { TYPE_PRODUCT } from '../../constants/communicationType';
import { UPDATED } from '../../constants/communicationStatus';

import './style.css';

class ProductPage extends Component {

  static propTypes = {
    loading: PropTypes.bool,
    error: PropTypes.object,
    products: PropTypes.object,
    onAddToCart: PropTypes.func.isRequired,
    onFetchProducts: PropTypes.func.isRequired,
  };

  static defaultProps = {
    products: { ids: [], content: {} },
  };

  state = { searchText: '' };

  componentDidMount() {
    if (!this.props.products.ids.length) {
      this.props.onFetchProducts();
    }
  }

  handleChange = (e) => {
    this.setState({ searchText: e.target.value });
  }

  handleFilter() {
    const { ids, content } = this.props.products;
    if (!this.state.searchText) {
      return ids;
    }

    const firteredIds = [];
    ids.forEach((productID) => {
      const productName = content[productID].name.toLowerCase();
      if (productName.match(this.state.searchText.toLocaleLowerCase())) {
        firteredIds.push(productID);
      }
    });

    return firteredIds;
  }

  handleAddToCart = (productID) => {
    this.props.onAddToCart(productID)
  }

  renderProductDescrition() {
    const { content } = this.props.products;
    const ids = this.handleFilter();
    return ids.map((productID) => {
      const {
        description,
        image,
        name,
        unitsInStock,
      } = content[productID];

      return (
        <ProductDescriptionGrid
          onAddToCart={this.handleAddToCart}
          key={productID}
          image={image}
          description={description}
          name={name}
          productID={productID}
          unitsInStock={unitsInStock}
        />
      );
    });
  }

  render() {
    return (
      <div className="porduct-page">
        <div className="product-page-header">
          <InputText
            placeholder="Search..."
            className="search-input"
            value={this.state.searchText}
            onChange={e => this.handleChange(e)}
          />
          <div className="grid-view">
            Grid
          </div>
        </div>
        <div className="product-page-grid">
          {!this.props.isLoading && this.renderProductDescrition()}
        </div>
      </div>
    );
  }
}

export default connect(
  ({ entities, communication }) => {
    const {
      loading,
      error,
    } = communication.of('products');

    const ids = entities.idsOf('products');
    const content = entities.contentOf('products');
    return {
      loading,
      error,
      products: {
        ids,
        content,
      },
    }
  },
  {
    onFetchProducts: fetchProducts,
    onAddToCart: addToCart,
  },
)(ProductPage);
