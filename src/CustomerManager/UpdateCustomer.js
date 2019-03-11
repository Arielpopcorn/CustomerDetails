import React, { Component } from 'react'
import NewCustomerForm from './NewCustomerForm'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'

const UPDATE_CUSTOMERDETAIL = gql`
    mutation updateCustomerDetail($id:ID!, $customerName:String!, $address:String!, $phoneNumber:Int!, $facebook:String!) {
        updateCustomerDetail(
        where:{id: $id}
        data:{
            status:PUBLISHED
            customerName:$customerName
            address:$address
            phoneNumber:$phoneNumber
            facebook:$facebook
        }){
        customerName
        address
        phoneNumber
        facebook
        id
        }
    }
`

export default class UpdateCustomer extends Component {
  render() {
      const {customerDetail} = this.props
    return (
        <Mutation 
            mutation={UPDATE_CUSTOMERDETAIL}>
            {updateCustomerDetail => <NewCustomerForm customerDetail={customerDetail} onSubmit={updateCustomerDetail}/>}
        </Mutation>
    )
  }
}
