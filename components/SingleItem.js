import React, { Component } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { DisplayError } from "../components/ErrorMessage";
import styled from "styled-components";
import Head from "next/head"; //pt a schimba titlul paginii din cel default din Meta.js

const SingleItemStyles = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  box-shadow: ${props => props.theme.bs};
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  min-height: 800px;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .details {
    margin: 3rem;
    font-size: 3rem;
  }
`;

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      description
      imageLarge
    }
  }
`;

class SingleItem extends Component {
  render() {
    return (
      <Query query={SINGLE_ITEM_QUERY} variables={{ id: this.props.id }}>
        {({ error, loading, data }) => {
          //   if (error) return <DisplayError error={error} />;
          if (loading) return <p>loading...</p>;
          if (!data.item) return <p>produsul nu exista</p>;
          const item = data.item;
          return (
            <SingleItemStyles>
              <Head>
                <title>XStore | {item.title}</title>
              </Head>
              <img src={item.imageLarge} alt={item.title} />
              <div className="details">
                <h2>{item.title}</h2>
                <p>{item.description}</p>
              </div>
            </SingleItemStyles>
          );
        }}
      </Query>
    );
  }
}

export default SingleItem;
