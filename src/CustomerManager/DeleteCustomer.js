import React, { Component } from 'react'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'

const DELETE_CUSTOMERDETAIL = gql`
    mutation deleteCustomerDetail ($id:ID!){
        deleteCustomerDetail(
        where:{id: $id}
        ) { 
            id
        }
    }
`

export default class DeleteCustomer extends Component {
  render() {
      const {customerDetail, refetch} = this.props
    return (
        <Mutation 
        onCompleted={() => refetch()}
        mutation={DELETE_CUSTOMERDETAIL}
        variables={{
            id: customerDetail.id

        }}>
            {(DeleteCustomer) => {
                return(
                    <button onClick={DeleteCustomer}>
                        Delete
                    </button>
                )
            }}
        </Mutation>
    )
  }
}
