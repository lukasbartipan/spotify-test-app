import React from 'react';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import Content from '../content/Content';

export default class Body extends React.Component {

    render() {
        return(
            <div className='app-body'>
                <Header />
                <Content />
                <Footer />
            </div>
        )
    }
}