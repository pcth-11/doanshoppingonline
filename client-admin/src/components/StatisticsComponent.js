import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';

class Statistics extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      noCategories: 0,
      noProducts: 0,
      noOrders: 0,
      noOrdersPending: 0,
      noOrdersApproved: 0,
      noOrdersCanceled: 0,
      noOrdersRevenue: 0,
      noCustomers: 0
    };
  }

  render() {
    return (
      <div className='flex justify-center items-center h-screen  ' style={{marginTop: '-150px'}}>
          <div className="bg-white p-8 shadow-md rounded-md w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
            <h2 className="text-center text-2xl font-bold mb-4">STATISTICS</h2>
              <form>
                <div className='mb-4 flex justify-between items-center text-sm'>
                    <span className="font-medium text-gray-600">No. Categories:</span>
                    <span className="ml-4">{this.state.noCategories}</span>
                </div>
                <div className='mb-4 flex justify-between items-center text-sm'>
                    <span className="font-medium text-gray-600">No. Products:</span>
                    <span className="ml-4">{this.state.noProducts}</span>
                </div>
                <div className='mb-4 flex justify-between items-center text-sm'>
                    <span className="font-medium text-gray-600">No. Orders:</span>
                    <span className="ml-4">{this.state.noOrders}</span>
                </div>
                <div className='mb-4 flex justify-between items-center text-sm'>
                    <span className="font-medium text-gray-600" style={{marginLeft:" 150px"}}>Pending &nbsp;</span>
                    <span className="ml-4">{this.state.noOrdersPending}</span>
                </div>
                <div className='mb-4 flex justify-between items-center text-sm'>
                    <span className="font-medium text-gray-600" style={{marginLeft:" 150px"}}>Approved &nbsp;</span>
                    <span className="ml-4">{this.state.noOrdersApproved}</span>
                </div>
                <div className='mb-4 flex justify-between items-center text-sm'>
                    <span className="font-medium text-gray-600" style={{marginLeft:" 150px"}}>Canceled &nbsp;</span>
                    <span className="ml-4">{this.state.noOrdersCanceled}</span>
                </div>
                <div className='mb-4 flex justify-between items-center text-sm'>
                    <span className="font-medium text-gray-600" style={{marginLeft:" 150px"}}>Revenue &nbsp;</span>
                    <span className="ml-4">{this.state.noOrdersRevenue}</span>
                </div>
                <div className='mb-4 flex justify-between items-center text-sm'>
                    <span className="font-medium text-gray-600">No. Customer:</span>
                    <span className="ml-4">{this.state.noCustomers}</span>
                </div>

              </form>
            </div>
      </div>
    );
  }

  componentDidMount() {
    this.apiGetStatistics();
  }

  // apis
  apiGetStatistics() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/statistics', config).then((res) => {
      const result = res.data;
      this.setState({
        noCategories: result.noCategories,
        noProducts: result.noProducts,
        noOrders: result.noOrders,
        noOrdersPending: result.noOrdersPending,
        noOrdersApproved: result.noOrdersApproved,
        noOrdersCanceled: result.noOrdersCanceled,
        noOrdersRevenue: result.noOrdersRevenue,
        noCustomers: result.noCustomers
      });
    });
  }
}

export default Statistics;