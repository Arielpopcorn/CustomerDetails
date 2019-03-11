import React, { Component } from 'react'
import styled from 'styled-components'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import {ReactComponent as DefaultCloseSVG} from '../assets/Close.svg'

import NewCustomerForm from './NewCustomerForm'

const NEW_CUSTOMERDETAIL = gql`
    mutation addCustomerDetail($customerName: String!, $address: String!, $facebook: String!, $phoneNumber: Int!){
        createCustomerDetail(data:{
        status: PUBLISHED
        customerName: $customerName
        address: $address
        phoneNumber: $phoneNumber
        facebook: $facebook 
    }) {
        status
        customerName
        address
        phoneNumber
        facebook
        id
        }
    }
`

const Add = styled.h1`
    color: #fff;
`

const Close = styled.div`
    position: absolute;
    right: 0;
    width: 40px;
`

const Card = styled.div`
    margin: 0 auto;
	background: rgba(0,0,0,0.9);
	height: 400px;
	width: 600px;
	box-shadow: 2px 2px 10px rgba(0,0,0,0.3);
	z-index: 1;
    position: absolute;
    top: 50%;
    left: 50%;
    transform:translate(-50%,-50%);

    @media (max-width: 400px) {
        width: 300px;
    }
`

const P = styled.p`
    color: white;
`


export default class NewCustomerModel extends Component {

  render() {
      const { show, toggle, refetch } = this.props
    return (
        <>
            {show ? <Card>
                            <Close onClick={toggle}><P>x</P></Close>
                            <Add>Add New!!!</Add>                
                            <Mutation 
                            mutation={NEW_CUSTOMERDETAIL}
                            onCompleted={() => (refetch())}>
                                {createCustomerDetail => <NewCustomerForm toggle={toggle} onSubmit={createCustomerDetail} />}   
                            </Mutation>        
                    </Card> : null}
        </>
    )
  }
}
