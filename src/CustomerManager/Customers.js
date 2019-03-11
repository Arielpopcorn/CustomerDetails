import React, { Component } from 'react'
import styled from 'styled-components'
import { Query } from "react-apollo";
import gql from 'graphql-tag'
import { Link } from 'react-router-dom'
import DeleteCustomer from './DeleteCustomer'
import {ReactComponent as DefaultPlusSVG} from '../assets/Plus.svg'
import NewCustomerModel from './NewCustomerModel'

const Add = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Open Sans', sans-serif;
`

const PlusContainer = styled.div`
  width: 40px;
  height: 40px;
`

const PlusSVG = styled(DefaultPlusSVG)`
  width: 40px;
`
const CustomerListContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const CustomerList = styled.p`
  font-size: 12px;
  display: flex;
  width: 150px;
`

const CUSTOMERS_QUERY = gql`
  query AllCustomers{
    customerDetails {
      customerName
      address
      phoneNumber
      facebook
      id
    }
  }
`

export default class Customers extends Component {

    state = {
        show: false
      }
    
      toggle = () => {
        this.setState({
          show: !this.state.show
        })
      }

  render() {
    return (
        <>
        <Query query={CUSTOMERS_QUERY}>
            {({loading,data, error, refetch})=>{
                if(error) console.log(error)
                if(loading){
                return 'Loading...'
                }else{
                  return (
                    <>
                      <Add onClick={this.toggle} show={this.state.show}><PlusContainer><PlusSVG /></PlusContainer>Add New Customer Detail</Add>
                      <NewCustomerModel show={this.state.show} toggle={this.toggle} refetch={refetch} />
                      {data.customerDetails.map(customerDetail => 
                        (<>
                          <CustomerListContainer>
                            <Link key={customerDetail.id} to={`/customermanager/${customerDetail.id}`}>
                              <CustomerList>{customerDetail.customerName}</CustomerList>
                            </Link>
                            <DeleteCustomer customerDetail={customerDetail} refetch={refetch}/>
                          </CustomerListContainer>
                        </>)
                      )}
                    </>
                  )
                }
            }}
        </Query>
        </>
    )
  }
}

