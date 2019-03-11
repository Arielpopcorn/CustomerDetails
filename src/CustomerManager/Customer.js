import React, { Component } from 'react'
import { Query } from "react-apollo";
import gql from 'graphql-tag'
import UpdateCustomer from './UpdateCustomer';
import styled from 'styled-components'

const UpdateContainer = styled.div`
    background-color: gray;
    width: 400px;
    height: 380px;
    margin: auto;
    display: flex;
    flex-direction: column;
    @media (max-width: 400px) {
        width: 300px;
    }
`

const UpdateTitle = styled.p`
    /* padding-top: 10px; */
`


const CUSTOMER_QUERY = gql`
  query Customer($id: ID!){
    customerDetail(where:{id: $id}) {
        id
        customerName
        address
        phoneNumber
        facebook
      }
  }
`

export default class Customer extends Component {
  render() {
    const { match } = this.props
    return (
        <Query 
            query={CUSTOMER_QUERY}
            variables={{
                id: match.params.id
            }}>
            {({loading, data ,error}) => {
                if ( error ) return console.log(error);
                if( loading ) return 'Loading...';
                console.log(data)
                const { customerDetail } = data;
                return (
                <>
                <section>
                    <h1>{customerDetail.customerName}</h1>
                    <p>Phone Number: {customerDetail.phoneNumber}</p>
                    <p>Address: {customerDetail.address}</p>
                    <p>Facebook: {customerDetail.facebook}</p>
                </section>
                <UpdateContainer>
                    <UpdateTitle>Update Customer Detail</UpdateTitle>
                    <UpdateCustomer customerDetail={customerDetail} />
                </UpdateContainer>
                </>
                )
            }}

        </Query>
    )
  }
}
