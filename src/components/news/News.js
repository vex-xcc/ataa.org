import React, { Component } from 'react'
 import styled from 'styled-components'
import Card from './NewsStyled'
import { getAllNews } from '../api_config/api'
import apiURL from '../api_config/ApiConfig';
import Footer from '../footer/Footer';
export default class News extends Component {
    constructor(props) {
        super(props)
        this.state = {
            News: [],
        };
    }
    componentDidMount() {
        // Mack API call 
        getAllNews(this.props.News)
            .then((response) => {
                const News = response.data.filter((News) => {
                    return News.InHomePage === true
                })
                this.setState({ News });
            })
            .catch((error) => {
            })
    }

    render() {
          const StyledRoot = styled.div`
  padding: 50px 12px;
`

  const StyledContainer = styled.div`
  max-width: 550px;
  width: 100%;
  margin: auto;
 
`

  const Action = styled.button`
  margin: 0 5px;
  padding: 8px 14px;
  background: rgba(155, 155, 155, 0.2);
  color: #fff;
  cursor: pointer;
  border: 1px solid #fff;
  outline: 0;
  font-weight: 300;
  :hover {
    opacity: 0.8;
  }
  :active {
    background: ${(props) => props.theme.primary};
  }
`

        const date = new Date().toLocaleDateString()
        const news = this.state.News
        let allNews=(
            <StyledRoot>
            <StyledContainer>

              <Card
                title={'soon...'}
                date={date}
                description={'soon...'}
              />
            </StyledContainer>
          </StyledRoot>
        )
        if (news.length > 0) {
            allNews = (
                <StyledRoot>
                <StyledContainer >
                {news.map((item, index) => (
                  <Card
                    key={index}
                    styledPhoto={`${apiURL}${item.img[0]}`}
                    title={item.Title}
                    date={item.PostAt}
                    description={item.Content}
                  />              

                ))}
                </StyledContainer>
              </StyledRoot>
            )}
        return (
            <div>
                {allNews}
                <Footer />
            </div>
        )
    }
}




